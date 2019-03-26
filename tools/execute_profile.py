#!/usr/bin/env python

from datetime import datetime
import os
import subprocess
import sys
import tempfile
import time
import xml.dom.minidom
import re
import shutil
import json

results_header = '''<html><head><title>"%s" Profile Results</title><style type="text/css">body,h1,h2{font-family:sans-serif}body{font-size:12px}h1{font-size:18px}h2{font-size:14px}table,td,th{font-size:12px}table{background-color:#EAEAEA;border-collase:collapse;border-color:#FFF;border-style:solid}td,th{text-align:center;vertical-align:middle;padding:3px 5px}th{background-color:#CCC;font-weight:700}td.left{text-align:left}td.passed{background-color:#4BB543}td.timedout{background-color:#000;color:#FFF}td.failed{background-color:#F3607C}</style></head><body>'''
results_footer = '''</body></html>'''

def getTimedeltaSeconds(time_delta):
    return ((time_delta.microseconds + (time_delta.seconds + time_delta.days * 24 * 3600) * 1000000.0) / 1000000.0)

def parseOrZero(value):
    try:
        return int(float(str(value)))
    except ValueError:
        return 0

class TestScript:
    __log_regex_1 = re.compile(ur".*\n(failed = (?P<failed>\d+).*\n)?(skipped = (?P<skipped>\d+)\n)?(skipped by execution options = (?P<skipped_execution>\d+)\n)?(ok = (?P<passed>\d+)\n)?", re.MULTILINE | re.IGNORECASE)
    __log_regex_2 = re.compile(ur".*\n(\*\*\* ok      tests: (?P<passed>\d+).*\n)?(\*\*\* overall tests: (?P<total>\d+).*\n)?", re.MULTILINE | re.IGNORECASE)

    def __init__(self, script_id):
        self.__scriptId = script_id
        self.__scriptName = None
        self.__timeout = None
        self.__options = dict()
        self.__crashDumps = []
        self.__executionResult = None
        self.__executionTime = None
        self.__outputFile = None
        self.__hasRun = False
        self.__hasDetailedCounts = False
        self.__passedCount = "?"
        self.__skippedCount = "?"
        self.__skippedByExecutionOptionsCount = "?"
        self.__failedCount = "?"
        self.__totalCount = "?"

    def setTimeout(self, timeout):
        self.__timeout = timeout

    def setScriptName(self, script_name):
        self.__scriptName = script_name

    def setOutputFile(self, html_file):
        self.__outputFile = html_file

    def addOption(self, option):
        self.addOptionWithValue(option, None)

    def addOptionWithValue(self, option, value):
        self.__options[option] = value

    def addCrashdump(self, crash_dump):
        self.__crashDumps += [ crash_dump ]

    def getScriptId(self):
        return self.__scriptId

    def getScriptName(self):
        return self.__scriptName

    def getCrashdumps(self):
        return self.__crashDumps

    def getTimeout(self):
        return self.__timeout

    def getExecutionTime(self):
        return self.__executionTime

    def getExecutionResult(self):
        return self.__executionResult

    def getPassedCount(self):
        return self.__passedCount

    def getSkippedCount(self):
        return self.__skippedCount

    def getSkippedByExecutionOptionsCount(self):
        return self.__skippedByExecutionOptionsCount

    def getFailedCount(self):
        return self.__failedCount

    def getTotalCount(self):
        return self.__totalCount

    def hasRun(self):
        return self.__hasRun

    def hasDetailedCounts(self):
        return self.__hasDetailedCounts

    def run(self):
        self.__hasRun = True

        print "Running test '%s' ..." % (self.__scriptId)
        self.__execute()

        if self.__executionResult is None:
            print "    ... killed after timeout of %d seconds." % (self.__timeout)
            return
        elif self.__executionResult > 1:
            print "    ... finished with %d errors." % (self.__executionResult)
        elif self.__executionResult == 1:
            print "    ... finished with 1 error."
        elif self.__executionResult < 0:
            print "    ... failed to run, exit code was %d." % (self.__executionResult)
        elif self.__executionResult == 0:
            print "    ... success."

        # Try to parse a more detailed result data.
        try:
            log_file = open(self.__outputFile, "r")
            log_file_contents = log_file.read()
            log_file.close()

            log_file_result = filter(lambda log_file_result: not all(value is None for value in log_file_result.values()), [m.groupdict() for m in TestScript.__log_regex_1.finditer(log_file_contents)])[-1]

            self.__passedCount = parseOrZero(log_file_result["passed"])
            self.__skippedCount = parseOrZero(log_file_result["skipped"])
            self.__skippedByExecutionOptionsCount = parseOrZero(log_file_result["skipped_execution"])
            self.__failedCount = parseOrZero(log_file_result["failed"])
            self.__totalCount = self.__passedCount + self.__skippedCount + self.__failedCount
            self.__hasDetailedCounts = True
        except:
            # Try to at least parse the trexfwkwrap output.
            try:
                log_file = open(self.__outputFile, "r")
                log_file_contents = log_file.read()
                log_file.close()

                log_file_result = filter(lambda log_file_result: not all(value is None for value in log_file_result.values()), [m.groupdict() for m in TestScript.__log_regex_2.finditer(log_file_contents)])[-1]

                self.__passedCount = parseOrZero(log_file_result["passed"])
                self.__totalCount = parseOrZero(log_file_result["total"])
                self.__failedCount = self.__totalCount - self.__passedCount
                self.__hasDetailedCounts = True
            except:
                pass

    def __execute(self):
        # Resolve the full path of the file.
        # test_file, test_file_ext = os.path.splitext(self.__scriptName)
        # test_file = test_file.replace(".", os.sep) + test_file_ext

        process_call = ['python', '/newz/tools/trexfwkwrap.py', self.__scriptName]
        for option in self.__options:
            option_value = self.__options[option]
            if option_value:
                process_call += [ "--%s=%s" % (option, option_value) ]
            else:
                process_call += [ "--%s" % (option) ]

        log_file = file(self.__outputFile, "w")

        start_time = datetime.now()
        process = subprocess.Popen(process_call, stdout=log_file, stderr=log_file)
        
        # Wait for the process to exit.
        while process.returncode is None:
            process.poll()

            if process.returncode is not None:
                break

            time.sleep(1)

            # If there is a timeout, then wait till the timeout is reached.
            if self.__timeout is not None and getTimedeltaSeconds(datetime.now() - start_time) >= (self.__timeout):
                process.kill()
                break

        end_time = datetime.now()
        log_file.close()

        self.__executionTime = getTimedeltaSeconds(end_time - start_time)

        if process.returncode != 255:
            self.__executionResult = process.returncode
        else:
            # Exit codes are limited to 255, so if the value is 255, then reparse log result to get exit code.
            try:
                last_line = None
                with open(self.__outputFile, "r") as log_file:
                    for last_line in log_file:
                        pass

                self.__executionResult = int(re.search(r"error count to (-?\d+)", last_line).group(1))
            except Exception:
                self.__executionResult = process.returncode

class ProfileRunner:
    __default_timeout = 60

    def __init__(self, profile_path):
        self.__outputFile = None
        self.__testScripts = []
        self.__catalogedCrashdumps = set()
        self.__startTime = None
        self.__endTime = None

        if not os.path.exists(profile_path):
            raise RuntimeError("Profile file '%s' does not exist or is not readable." % (profile_path))

        self.__profileName = os.path.splitext(os.path.basename(profile_path))[0]
        self.__outputFile = "%s.html" % (self.__profileName)
        self.__initTestScripts(profile_path)

    def __initTestScripts(self, profile_path):
        print "Parsing profile for tests ..."

        test_timeout_factor = 1
        if "RETRY_PROFILE" in os.environ and os.environ["RETRY_PROFILE"] == "1":
            print "    ... [Info] Detected test profile retry, increasing all timeouts by 25%."
            test_timeout_factor = 1.25

        profile_xml = xml.dom.minidom.parse(profile_path)
        for test_script_element in profile_xml.getElementsByTagName("script"):
            if not "id" in test_script_element.attributes.keys() or not "name" in test_script_element.attributes.keys():
                print "    ... [Warning] Skipping over script due to one or more missing properties."
                continue

            test_script = TestScript(test_script_element.attributes["id"].value)
            test_script.setScriptName(test_script_element.attributes["name"].value)

            for option in test_script_element.getElementsByTagName("option"):
                if not "name" in option.attributes.keys():
                    print "    ... [Warning] Skipping over test option for script '%s' due to missing 'name' property." % (test_script.getScriptId())
                    continue

                if "value" in option.attributes.keys():
                    test_script.addOptionWithValue(option.attributes["name"].value, option.attributes["value"].value)
                else:
                    test_script.addOption(option.attributes["name"].value)

            for duration in test_script_element.getElementsByTagName("duration"):
                if not "max" in duration.attributes.keys():
                    print "    ... [Warning] Skipping over maximum duration for script '%s' due to missing 'max' property." % (test_script.getScriptId())
                    continue
                test_script.setTimeout(int(duration.attributes["max"].value) * 60 * test_timeout_factor)

            if test_script.getTimeout() is None:
                print "    ... [Warning] Undeclared maximum duration for script '%s', defaulting to %d minutes." % (test_script.getScriptId(), ProfileRunner.__default_timeout * test_timeout_factor)
                test_script.setTimeout(ProfileRunner.__default_timeout * 60 * test_timeout_factor)

            self.__testScripts += [test_script]
        
        test_script_count = len(self.__testScripts)
        if test_script_count == 0:
            print "    ... done, no valid test scripts found."
            raise RuntimeError("Profile file '%s' did not contain any valid test scripts." % (profile_path))
        elif test_script_count == 1:
            print "    ... done, found 1 test script."
        else:
            print "    ... done, found %d test scripts." % (test_script_count)

    def run(self):
        # Create the log location.
        log_location = os.path.join(tempfile.gettempdir(), self.__profileName)
        if not os.path.exists(log_location):
            os.makedirs(log_location)

        # Ignore crashdumps that occur prior to starting this test profile.
        self.__catalogedCrashdumps = self.__detectCrashdumps()
        crash_dump_location = os.path.join(tempfile.gettempdir(), "crashdumps")

        if not os.path.exists(crash_dump_location):
            os.makedirs(crash_dump_location)

        self.__startTime = datetime.now()
        self.__recordResults()

        for test_script in self.__testScripts:
            test_script.setOutputFile(os.path.join(log_location, test_script.getScriptId()) + ".log")
            test_script.run()

            # Find crashdumps generated by this test.
            new_crash_dumps = self.__detectCrashdumps().difference(self.__catalogedCrashdumps)
            for new_crash_dump in new_crash_dumps:
                crash_dump_filename = os.path.split(new_crash_dump)[1]
                shutil.copyfile(new_crash_dump, os.path.join(crash_dump_location, crash_dump_filename))

                test_script.addCrashdump(crash_dump_filename)

            # Add the new crashdumps to the catalog.
            self.__catalogedCrashdumps = self.__catalogedCrashdumps.union(new_crash_dumps)

            # Write the results file.
            self.__recordResults()

        self.__endTime = datetime.now()
        self.__recordResults()

        for test_script in self.__testScripts:
            if test_script.getExecutionResult() is None or test_script.getExecutionResult() != 0:
                return 1
        return 0

    def __detectCrashdumps(self):
        def __isValidCrashdumpFile(filename):
            return (("crashdump" in filename) or ("emergencydump" in filename)) and filename.endswith(".trc") and not filename.endswith(".ipmm.trc")

        crashdumps = set()
        instance_dir = os.getenv('DIR_INSTANCE')

        for host in os.listdir(instance_dir):
            if os.path.isdir(os.path.join(instance_dir, host)) and os.path.exists(os.path.join(instance_dir, host, 'trace')):
                trace_path = os.path.normpath(os.path.join(instance_dir, host, 'trace'))
                for trace_file in os.listdir(trace_path):
                    # Search DB_* directories for crashdumps.
                    if trace_file.startswith("DB_") and os.path.isdir(os.path.join(trace_path, trace_file)):
                        trace_db_path = os.path.join(trace_path, trace_file)
                        for trace_db_file in os.listdir(trace_db_path):
                            if __isValidCrashdumpFile(trace_db_file):
                                crashdumps.add(os.path.join(trace_db_path, trace_db_file))
                    # Check if the file is a crashdump file.
                    elif __isValidCrashdumpFile(trace_file):
                        crashdumps.add(os.path.join(trace_path, trace_file))

        return crashdumps

    def __recordResults(self):
        html_file = file(os.path.join(tempfile.gettempdir(), self.__profileName) + ".html", "w")
        html_file.write(results_header % (self.__profileName))

        html_file.write("<h1>&ldquo;%s&rdquo; Profile Results</h1>" % (self.__profileName))
        html_file.write("<h2>Tests</h2>")
        html_file.write('''<table><tr><th rowspan="2">Test ID</th><th rowspan="2">Test File</th><th colspan="5">Test Results</th><th rowspan="2">Time<br />(Seconds)</th><th rowspan="2">Crashdumps</th><th rowspan="2">Log</th></tr><tr><th>Passed</th><th>Skipped</th><th>S.B.E.O*</th><th>Failed</th><th>Total</th></tr>''')

        total_passed = 0
        total_skipped = 0
        total_sbeo = 0
        total_failed = 0
        total_overall_tests = 0
        total_overall_time = 0
        total_overall_crashdumps = 0
        total_terminated_tests = 0

        for test_script in self.__testScripts:
            result_class = ""
            if test_script.getExecutionResult() == None:
                if test_script.hasRun():
                    total_terminated_tests += 1
                    result_class = "timedout"
            elif test_script.getExecutionResult() == 0:
                result_class = "passed"
            else:
                result_class = "failed"

            total_passed        += parseOrZero(test_script.getPassedCount())
            total_skipped       += parseOrZero(test_script.getSkippedCount())
            total_sbeo          += parseOrZero(test_script.getSkippedByExecutionOptionsCount())
            total_failed        += parseOrZero(test_script.getFailedCount())
            total_overall_tests += parseOrZero(test_script.getTotalCount())
            total_overall_time  += parseOrZero(test_script.getExecutionTime())
            total_overall_crashdumps += len(test_script.getCrashdumps())

            html_file.write("<tr>")
            html_file.write('''<td class="left %s">%s</td><td class="left">%s</td>''' % (result_class, test_script.getScriptId(), test_script.getScriptName()))
            if test_script.hasRun():
                if test_script.getExecutionResult() is None:
                    html_file.write('''<td colspan="5">(Timed Out)</td>''')
                else:
                    html_file.write("<td>%s</td>" % (test_script.getPassedCount()))
                    html_file.write("<td>%s</td>" % (test_script.getSkippedCount()))
                    html_file.write("<td>%s</td>" % (test_script.getSkippedByExecutionOptionsCount()))
                    html_file.write("<td>%s</td>" % (test_script.getFailedCount()))
                    html_file.write("<td>%s</td>" % (test_script.getTotalCount()))

                html_file.write("<td>%d</td>" % (test_script.getExecutionTime()))
                html_file.write("<td>%d</td>" % (len(test_script.getCrashdumps())))

                test_log_filename = test_script.getScriptId() + ".log"
                html_file.write('''<td><a href="%s" target="_blank">%s</a></td>''' % (os.path.join(self.__profileName, test_log_filename), test_log_filename))
            else:
                html_file.write('''<td colspan="8">(Pending)</td>''')
            html_file.write("</tr>")

        html_file.write('''<tr><th colspan="2">Total</th>''')
        html_file.write("<th>%d</th>" % (total_passed))
        html_file.write("<th>%d</th>" % (total_skipped))
        html_file.write("<th>%d</th>" % (total_sbeo))
        html_file.write("<th>%d</th>" % (total_failed))
        html_file.write("<th>%d</th>" % (total_overall_tests))
        html_file.write("<th>%d</th>" % (total_overall_time))
        html_file.write("<th>%d</th>" % (total_overall_crashdumps))
        html_file.write("<th></th></tr>")
        html_file.write("</table>")
        html_file.write("* Skipped By Execution Options (excluded from total test count)<br />")

        if self.__endTime is None:
            end_time = "N/A"
            total_time = str(getTimedeltaSeconds(datetime.now() - self.__startTime)) + " seconds and counting"
        else:
            end_time = self.__endTime
            total_time = str(getTimedeltaSeconds(self.__endTime - self.__startTime)) + " seconds"

        html_file.write("<h2>Crashdumps</h2>")
        if total_overall_crashdumps > 0:
            html_file.write("<table><tr><th>Test ID</th><th>Crashdumps</th></tr>")
            for test_script in self.__testScripts:
                if len(test_script.getCrashdumps()) > 0:
                    html_file.write('''<tr><td class="left">%s</td><td class="left">''' % (test_script.getScriptId()))
                    for crash_dump in test_script.getCrashdumps():
                        html_file.write('''&bull;&nbsp;<a href="%s" target="_blank">%s</a>&nbsp;(<a href="%s" target="_blank">Download</a>)<br />''' % (os.path.join("crashdumps", crash_dump, "*view*"), crash_dump, os.path.join("crashdumps", crash_dump)))
                    html_file.write("</td></tr>")
            html_file.write('''<tr><th colspan="2">All&nbsp;Crashdumps:&nbsp;<a href="crashdumps" target="_blank">View All</a>&nbsp;|&nbsp;<a href="crashdumps/*zip*/crashdumps.zip" target="_blank">Download All</a></th></tr>''')
            html_file.write("</table>")
        else:
            html_file.write("<b>No crashdumps associated with the test profile were found.</b><br />")

        html_file.write("<h2>Profile Summary</h2><table>")

        html_file.write('''<tr><td class="left">Errors:</td>''')
        if total_failed > 0:
            html_file.write('''<td class="failed">%d</td>''' % (total_failed))
        else:
            html_file.write('''<td class="passed">0</td>''')
        html_file.write("</tr>")

        html_file.write('''<td class="left">Terminated Tests:</td>''')
        if total_terminated_tests > 0:
            html_file.write('''<td class="failed">%d</td>''' % (total_terminated_tests))
        else:
            html_file.write('''<td class="passed">0</td>''')
        html_file.write("</tr>")

        html_file.write('''<tr><td class="left">Start Time:</td><td>%s</td></tr>''' % (self.__startTime))
        html_file.write('''<tr><td class="left">End Time:</td><td>%s</td></tr>''' % (end_time))
        html_file.write('''<tr><td class="left">Overall Duration:</td><td>%s</td></tr>''' % (total_time))
        html_file.write("</table>")
        html_file.write(results_footer)

        html_file.close()

        json_data = {}
        json_data["profile"] = str(self.__profileName)
        json_data["start_time"] = str(self.__startTime)
        json_data["end_time"] = str(end_time)
        json_data["tests"] = []

        for test_script in self.__testScripts:
            test_data = {
                "test_id": test_script.getScriptId(),
                "test_file": test_script.getScriptName()
            }

            test_results = {
                "tests_passed": "?",
                "tests_skipped": "?",
                "tests_skipped_by_execution_options": "?",
                "tests_failed": "?",
                "tests_total": "?"
            }

            if test_script.hasRun():
                test_data["test_runtime"] = test_script.getExecutionTime()
                test_data["test_crashdumps"] = test_script.getCrashdumps()
                test_data["test_log"] = os.path.join(self.__profileName, test_script.getScriptId() + ".log")

                if test_script.getExecutionResult() is None:
                    test_data["test_status"] = "timed_out"
                else:
                    if test_script.getExecutionResult() == 0:
                        test_data["test_status"] = "passed"
                    else:
                        test_data["test_status"] = "failed"

                    test_results["tests_passed"] = test_script.getPassedCount()
                    test_results["tests_skipped"] = test_script.getSkippedCount()
                    test_results["tests_skipped_by_execution_options"] = test_script.getSkippedByExecutionOptionsCount()
                    test_results["tests_failed"] = test_script.getFailedCount()
                    test_results["tests_total"] = test_script.getTotalCount()
            else:
                test_data["test_status"] = "pending"
                test_data["test_runtime"] = ""
                test_data["test_crashdumps"] = []
                test_data["test_log"] = ""

            test_data["test_results"] = test_results
            json_data["tests"].append(test_data)

        json_file = file(os.path.join(tempfile.gettempdir(), "result") + ".json", "w")
        json_file.write("%s\n" % (json.dumps(json_data, indent=4, sort_keys=True)))
        json_file.close()


def main():
    profile_runner = ProfileRunner(sys.argv[1])
    exit(profile_runner.run())

if __name__ == "__main__":
    main()