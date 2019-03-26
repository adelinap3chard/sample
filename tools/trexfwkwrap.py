"""Wrapper class for the multitude of hana test frameworks"""

from __future__ import print_function

import json
import os
import sys
import traceback
import logging
from collections import namedtuple
from importlib import import_module

RC_CRASHED = -1
RC_MISSING = -2
RC_TEST_EXCLUSION_ERROR = -300
RC_TESTBASE = -1999

BaseClassItem = namedtuple('BaseClassItem', 'prio obj')

_logger = logging.getLogger('trexfwkwrap')


class TestExclusionException(Exception):
    """Indicates errors when checking test exclusions"""


class UnbufferedStrem(object):
    """
    Disables internal python buffering of streams like sys.stdout
    """

    def __init__(self, stream):
        self.stream = stream

    def write(self, data):
        self.stream.write(data)
        self.stream.flush()

    def __getattr__(self, attr):
        return getattr(self.stream, attr)


def find_key(script_path, exclude_config):
    """Find the exclusion key to use.

    Note:
        This method is a duplicate of the find_key method in the hana repo
            (nutest/testscripts/lib/excludeTestsUtils.py).
        If you do changes here, please also change the find_key method in excludeTestsUtils.py.
    """
    if len(exclude_config) == 1:
        return exclude_config.keys()[0]
    split_path = script_path.split(os.sep)
    for i in range(len(script_path)):
        potential_identifier = '.'.join(split_path[i:])
        if potential_identifier in exclude_config:
            return potential_identifier


def _tuple2int(result=(0, 0)):
    if not isinstance(result, tuple):
        return result
    if isinstance(result[1], dict):
        return result[0]
    if result[0] > result[1]:
        return result[0] - result[1]
    return result[1] - result[0]


class Wrapper(object):
    """Wrapper class for a test case"""

    def __init__(self, test, args):
        self.test = test
        self.options = {}
        self.arguments = []
        self.module = None
        for arg in args:
            if arg.startswith('--'):
                argraw = arg[2:]
                splitted = argraw.split('=')
                if 2 <= len(splitted):
                    self.options[splitted[0]] = '='.join(splitted[1:])
                else:
                    self.options[splitted[0]] = None
            else:
                self.arguments.append(arg)

    def _get_testbase(self):
        """Get the test base class.

        Returns:
            :obj:`TestBaseClass`: Instance of the test base class"""
        testbase = None
        baseclass = self._get_base_class()

        # If this block returns, we're running a suite based on TestSuiteBuilder
        try:
            import lib.suiteUtilities
        except ImportError:
            _logger.warning('Could not import suiteUtilities')
            pass
        else:
            tsb = baseclass
            try:
                if isinstance(tsb, lib.suiteUtilities.TestSuiteBuilder):
                    self.module = sys.modules['lib.suiteUtilities']
                    self.module.m_subtestOkCount = -1
                    self.module.m_subtestCount = -1
                    return tsb
            except TypeError:
                pass

        try:
            self.module = __import__(baseclass)
            self.module.m_subtestOkCount = -1
            self.module.m_subtestCount = -1

            if baseclass == 'testbase':
                testbase = self.module.TestBase()
            elif baseclass == 'regTestbase':
                testbase = self.module.RegTestBase()
            elif baseclass == 'lib.sqlTest':
                self.module = sys.modules[baseclass]
                testbase = self.module.NewDbTestCase()
            elif baseclass == 'lib.backupRecoverySqlTest':
                self.module = sys.modules[baseclass]
                testbase = self.module.BackupRecoverySqlTestCase
            elif baseclass == 'lib.gunit.GUnitTestCase':
                self.module = sys.modules[baseclass]
                testbase = self.module.GUnitTestCase
            else:
                raise Exception("%s is no known baseclass!" % baseclass)
        except Exception:
            print("===ERROR: no %s!\n" % baseclass)
            print(traceback.format_exc())
        return testbase

    def _get_base_class(self):
        __import__(self.test)
        t = sys.modules[self.test]

        backup_test_case = self._import_base_class('lib.backupRecoverySqlTest',
                                                   'BackupRecoverySqlTestCase')
        test_suite_builder = self._import_base_class('lib.suiteUtilities', 'TestSuiteBuilder')
        sql_test_newdb_test_case = self._import_base_class('lib.sqlTest', 'NewDbTestCase')
        gunit_wrapper = self._import_base_class('lib.gunit.GUnitTestCase', 'GUnitTestCase')

        bases = []
        for obj in (getattr(t, symbol) for symbol in dir(t)):
            try:
                #isinstance has to be called BEFORE issubclass, otherwise it
                #is skipped because of the TypeError (not a class)
                if isinstance(obj, test_suite_builder):
                    bases.append(BaseClassItem(4, obj))

                if issubclass(obj, gunit_wrapper):
                    bases.append(BaseClassItem(3, 'lib.gunit.GUnitTestCase'))
                if issubclass(obj, backup_test_case):
                    bases.append(BaseClassItem(2, 'lib.backupRecoverySqlTest'))
                if issubclass(obj, sql_test_newdb_test_case):
                    bases.append(BaseClassItem(1, 'lib.sqlTest'))
            except TypeError:
                # obj is not a class
                pass

        if bases:
            # Return base with highest priority
            return sorted(bases, key=lambda i: i.prio)[-1].obj

        # ...or is it regtestbase?
        try:
            rtb = __import__('regTestbase')
        except ImportError:
            return 'testbase'

        try:
            if isinstance(t.Test(), rtb.RegTestBase):
                return 'regTestbase'
        except AttributeError:
            pass

        return 'testbase'

    @staticmethod
    def _import_base_class(module_name, class_name):
        try:
            mod = import_module(module_name)
            clazz = getattr(mod, class_name)
        except (ImportError, AttributeError):
            _logger.warning('Could not import %(class)s', {'class': class_name})
            clazz = type('Dummy%s' % class_name, (), {})
        return clazz

    def testIsExcluded(self, testfile):

        if "excludeTestsInFile" not in self.options:
            return False

        jsonfile = self.options["excludeTestsInFile"]
        if jsonfile is None:
            print("missing filename for --excludeTestsInFile")
            return True

        try:
            with open(jsonfile, 'r') as config_file:
                exclude_config = json.load(config_file)
        except IOError:
            raise TestExclusionException("config file {0} could not be opened".format(jsonfile))
        except ValueError:
            raise TestExclusionException("config file {0} not a valid json file".format(jsonfile))

        if exclude_config is None:
            raise TestExclusionException(
                "config file to exclude test methods is valid json but invalid"
            )

        if testfile in exclude_config:
            testfileconfig = exclude_config[testfile]  # deprecated. Please use the filename as key
        else:
            key = find_key(testfile, exclude_config)
            if key:
                testfileconfig = exclude_config[key]  # Support for Bug 78259
            else:
                print("config file to exclude test methods was used but test case "
                      "{0} was not defined".format(testfile))
                return True

        if (isinstance(testfileconfig, basestring) and testfileconfig == "excludeAll") or \
                (hasattr(testfileconfig, "get") and testfileconfig.get("excludeAll")):  # Bug 78259
            print("This Test Case has been flagged as unstable/broken and will be skipped!")
            return True

        return False

    def run(self):
        """Run the test wrapped by this runner."""
        print("*** trexfwkwrap is running test <{0}>:\n".format(self.test))
        testbase = self._get_testbase()
        rc = RC_CRASHED
        print(self.arguments)
        print(self.options)
        if not testbase:
            rc = RC_TESTBASE
        else:
            # dirty:
            old = sys.argv[0]
            sys.argv[0] = os.path.join(os.getcwd(), sys.argv[1])
            try:
                result = None
                if not self.testIsExcluded(sys.argv[1]):
                    result = testbase.runTest(self.test, *self.arguments, **self.options)
                    result = _tuple2int(result)
                    print("\t->result of process is {0}".format(result))
                    print("*** ok      tests: %s " % (str(self.module.m_subtestOkCount)))
                    print("*** overall tests: %s " % (str(self.module.m_subtestCount)))
                if result is None:
                    rc = (self.module.m_subtestCount - self.module.m_subtestOkCount)
                else:
                    if hasattr(result, 'getLastError'):
                        rc = result.getLastError().getCode()
                        print("\t->getLastError() is %s" % (str(rc)))
                    elif hasattr(result, 'getErrorCode'):
                        rc = result.getErrorCode().getCode()
                        print("\t->getErrorCode() is %s" % (str(rc)))
                    elif isinstance(result, int):
                        rc = result
            except self.module.TestError:
                print("\n*** testbase rc  : %s " % (str(testbase.memrc)))
                print("*** ok      tests: %s " % (str(self.module.m_subtestOkCount)))
                print("*** overall tests: %s " % (str(self.module.m_subtestCount)))
                if 3 == testbase.memrc:
                    rc = self.module.m_subtestCount - self.module.m_subtestOkCount
            except ImportError:
                print("*** FAILED to import {0}".format(self.test))
                print("*** (wrong typecase or module does not exist?)")
                rc = RC_MISSING  # module not found
            except TestExclusionException as err:
                print(str(err))
                rc = RC_TEST_EXCLUSION_ERROR
            except Exception:
                print("<--kaboom-->\n%s" % (traceback.format_exc()))
            sys.argv[0] = old
            print("\n*** assessing %s error count to %s" % (self.test, str(rc)))
        return rc


def usage():
    """Display usage information and exit."""
    print()
    print('==============================================================')
    print('trexfwkwrap.py: testwrapper for trex testbase based scripts')
    print('usage: trexfwkwrap.py <testscript> [testoptions] [testparams]')
    print('==============================================================')
    return 0


def main():
    """Main method of trexfwkwrap"""
    handler = logging.StreamHandler()
    handler.formatter = logging.Formatter('%(asctime)s %(funcName)s %(levelname)s: %(message)s')
    _logger.addHandler(handler)
    _logger.setLevel(logging.DEBUG)

    if 'posix' == os.name:
        os.umask(000)
    sys.stdout = UnbufferedStrem(sys.stdout)
    if len(sys.argv) < 2:
        sys.exit(usage())
    testscript = sys.argv[1]
    if testscript.endswith(".py"):
        testscript = testscript[:-3]
    args = sys.argv[2:]
    wrapper = Wrapper(testscript, args)
    ret = wrapper.run()
    ret = min(ret, 255)  # Quickfix for Bug 153326
    if ret < 0:
        ret = 255  # force start all tests to reparse the output
    os._exit(ret)


if __name__ == '__main__':
    main()
