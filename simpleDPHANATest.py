from lib.sqlTest import SqlTestCase, classification, importTables, configurations
from DPServerFunctions import *
from lib.sqlTestUtilities import SQLResultSet, ExpectedSimpleResultSet
from connectionManager import ConnectionManager
from hdbcli import dbapi
import dpagent
from subprocess import call,check_output
import string
import os
import os.path
from utils.functools.decorators import parametrized
from dpadapter.logreader.lib.dpadapterFunctions import *
from dpadapter.logreader.lib.dpadapterUtilities import *

run_test=0
tracing=0
tracing_home_dir = "/sapmnt/trextest/trex_test/nginx/simpleDPHANATest/traceLog"

try:
    print "[DEBUG-mainScript]: check file"
    path = '/sapmnt/trextest/trex_test/nginx/simpleDPHANATest/notest'
    if os.path.isfile(path) and os.access(path,os.R_OK):
        print "[DEBUG-mainScript]: Test DPAgent Dummy will start"
        run_test = 1
        tracing = 1

    else:
        print "[DEBUG-mainScript]: Test DPAgent dummy has been disabled"
        run_test = 0
        tracing = 0
        pass
    ####run_test =1
    ####tracing = 1

except Exception as e:
    print "[DEBUG-mainScript]: Test has been disabled"
    run_test=0
    tracing=0

src= {}
agent = {}
dummy = {}
virTableList = []
remoteSubList = []
targetTableList = []
remoteTableList = []

strIP = os.popen("hostname -i").read().strip().split(" ")[0]
hdbHost = os.popen("host " + strIP).read().strip().strip(".").split(" ")[-1]
hdbPort = '3' + os.environ['TINSTANCE'] + '15'
db_Name = os.environ['SAPSYSTEMNAME']

src['pds_host_name'] = hdbHost
src['pds_port_number'] = hdbPort
src['pds_username'] = 'APP_USER'
src['pds_password'] = 'Sybase123'
src['RemoteSourceName'] = 'HDBAdapterSrc'
src['instance_name'] = 'hdb'+db_Name
src['DBType'] = 'HANA'
#src['admin_port'] = str(ra_port)
src['adapter_name'] = 'HanaAdapter'
src['pds_multi_container'] = 'true'
src['pds_database_name'] = db_Name
src['pds_database_port'] = hdbPort
src['system_password'] = 'manager'

class DPAdapterAAsimpleDPHANATest(SqlTestCase):

    def setUpTestCase(self):
	""" This is common setup steps before all tests start. """
	super(DPAdapterAAsimpleDPHANATest,self).setUp()

    def setUp(self):
        """Create tables and insert values for a specific test."""
        try:
            print "[DEBUG-mainScript]: run_test -  " + str(run_test)
            if run_test == 1:
                super(DPAdapterAAsimpleDPHANATest, self).setUp()
                # Start DP Agnet on linux
                self.dp = dpagent.DPAgent("/sapmnt/trextest/trex_test/hana_im/scripts", "config.ini", osType)
                # Start DP Agent on win
                #self.dp = dpagent.DPAgent("/sapmnt/trextest/trex_test/hana_im/scripts", "config.ini", "win")
                self.dp.setTracing(tracing)

                self.dp.appendTrace("Installing DP agent")
                self.dp.installDP()

                self.dp.appendTrace("Starting DP agent")
                self.dp.startDP()
                self.agent_name = self.dp.getAgentName()

                self.dp.appendTrace("Enable DP server on HANA")
                enableDPServer(self)
            else:
                pass
        except Exception as e:
            self.dp.appendTrace('exception in setup')
            self.dp.appendTrace(str(e))
            raise

    def tearDown(self):
	self.dp.appendTrace('In teardown')
        try:
            if run_test == 1:
                self.dp.appendTrace("kill the DP agent process")
                self.dp.killDPAgent()
                self.dp.appendTrace("Uninstall DP agent")
                self.dp.uninstallDP()
                self.dp.appendTrace("Clean up tables in HANA")
                self.cleanUp()
            else:
                pass
        except dbapi.Error, err:
            self.dp.appendTrace('Error in tear down')
            self.dp.appendTrace(str(err))
            pass

    def tearDownTestCase(self):
        if run_test == 1:
            ###disableDPServer(self)
            super(DPAdapterAAsimpleDPHANATest,self).tearDownTestCase()
        else:
            pass

    def cleanUp(self):
        global remoteSubList
        global virTableList
        global targetTableList
        global remoteTableList
        global src


        conman = ConnectionManager(verbosity=self._verbosity)
        self.conn = conman.createConnection(autocommit=True)
        cursor = self.conn.cursor()

        consrc = ConnectionManager()
        self.conn_src = consrc.createConnection(address=src['pds_host_name'], port=int(src['pds_database_port']), user="SYSTEM", password=src['system_password'],autocommit=True)
        cursor_src = self.conn_src.cursor()

        testapi = DPAdapterApi(self.conn, cursor)
        testSrc = DPAdapterRemoteHDB(self.conn_src, cursor_src)

        try:
            if len(remoteSubList) > 0:
                try:
                    testapi.dropRemoteSubscription(subName, "SYSTEM")
                except Exception as e:
                    pass

            if len(targetTableList) > 0:
                try:
                    testapi.dropTargetTable(tableName, "SYSTEM")
                except Exception as e:
                    pass
            if len(virTableList) > 0:
                try:
                    testapi.dropVirtualTable(tableName, "SYSTEM")
                except Exception as e:
                    pass

	    print 'drop remote source "HDBAdapterSrc" cascade'
            try:
                self.execute('drop remote source "' + src['RemoteSourceName'] + '" cascade')
            except Exception as e:
                pass
	    print 'drop adapter "HanaAdapter" cascade'
            try:
                self.execute('drop adapter "HanaAdapter" cascade')
            except Exception as e:
                pass
	    print 'drop agent "' , self.agent_name , '"'
            try:
                self.execute('drop agent "' + self.agent_name + '"')
            except Exception as e:
                pass
	    print 'cleanup done'
            self.dp.appendTrace('cleanup done')
        except dbapi.Error, err:
            self.dp.appendTrace('Error in cleanup')
            self.dp.appendTrace(str(err))
            pass

    def testHDBBarrier(self):
        """ Creates agent and test adapter. Create remote source and CDC """
        env_dict = str(os.environ)
        #print env_dict
        #self.dp.appendTrace(env_dict)
        global remoteSubList
        global virTableList
        global targetTableList
        global remoteTableList
        global src
        global agent
        try:
            if run_test == 1:
                #self.dp.appendTrace(env_dict)
                self.agent_name = self.dp.getAgentName()
                port = str(self.dp.getAgentPort())
                host = self.dp.getAgentHost()
                cursor = self.conn.cursor()
                testapi = DPAdapterApi(self.conn, cursor)

                ra_port = self.dp.ra_port
                remoteTableName='dpagent_testAdapter_emp'
                remoteTableOwner='SYSTEM'
                remoteTableSchema="COL1 INT"
                agent['agent_host'] = host
                agent['agent_port'] = port
                agent['agent_dir'] = '/usr/sap/dp/' + self.agent_name
                agent['agent_name'] = self.agent_name
                agent['java_path'] = '/usr/sap/dp/java/bin'

                src['admin_port'] = str(ra_port)

                consrc = ConnectionManager()
                self.conn_src = consrc.createConnection(address=src['pds_host_name'], port=string.atoi(src['pds_port_number']), user="SYSTEM", password='manager' , autocommit=True)
                cursor_src = self.conn_src.cursor()
                testSrc = DPAdapterRemoteHDB(self.conn_src, cursor_src)

                # cleanup RA system objects from source HDB in case these objects left in previous test failure
                testSrc.cleanRAObjects(src['pds_username'])

                # create pds_username on source HDB
                userType = "admin_user"
                testSrc.createUser(userType, src['pds_username'], src['pds_password'])

                self.dp.appendTrace('create agent')
                testapi.createAgent(agent)

                self.dp.appendTrace('create adapter')
                testapi.createAdapter(src['adapter_name'], self.agent_name)

                self.dp.appendTrace('create remote source')
                adapterType = "hana"
                testapi.createRemoteSource(adapterType, src, agent)


                dummy['dumTableName'] = "DPDUMMY"
                dummy['dumTableOwner'] = src['pds_username'].upper()
                dummy['dumTableSchema'] = "COL1 INT PRIMARY KEY"
                dummy['dumSubName'] = "SUB_DPDUMMY"
                dummy['dumVTableName'] = testapi.getVirtualTableName(src['pds_username'], dummy['dumTableName'])
                dummy['dumTTableName'] = 'T_' + dummy['dumTableName']                
                targetTableOwner = "SYSTEM"
                virtualTableOwner = "SYSTEM"

                testSrc.createTable(dummy['dumTableName'], dummy['dumTableOwner'], dummy['dumTableSchema'])
                insert_data = 10000
                insertDataList = []
                i = 1
                rowcnt = 3
                while (i < rowcnt + 1):
                    ini_data = str(i + insert_data)
                    insertDataList.append(ini_data)
                    i += 1
                testSrc.insertManyRows(dummy['dumTableName'],  dummy['dumTableOwner'], insertDataList)

                self.dp.appendTrace('create virtual table')
                testapi.createVirtualTable(src['RemoteSourceName'], dummy['dumTableOwner'], dummy['dumTableName'], dummy['dumVTableName'])
                virTableList.append(dummy['dumVTableName'])

                self.dp.appendTrace('create target table')
                testapi.createTargetTable(dummy['dumTTableName'], dummy['dumVTableName'])
                targetTableStr = targetTableOwner + "." + dummy['dumTTableName']
                targetTableList.append(targetTableStr)

                self.dp.appendTrace('create remote subscription')
                testapi.createRemoteSubscription(dummy['dumSubName'], dummy['dumVTableName'], dummy['dumTTableName'])
                remoteSubList.append(dummy['dumSubName'])

                self.dp.appendTrace('QUEUE')
                status = "QUEUE"
                testapi.alterRemoteSubscription(dummy['dumSubName'], status)

                self.dp.appendTrace('initial load')
                virtualTableWhereClause = "None"
                exprowcnt = testSrc.getRowCount(dummy['dumTableName'], dummy['dumTableOwner'], virtualTableWhereClause)
                virtualTableColumns = '*'
                timeout = 5
                testapi.iniLoadTargetTable( dummy['dumVTableName'], virtualTableColumns, exprowcnt, dummy['dumTTableName'], targetTableOwner, timeout, virtualTableOwner, virtualTableWhereClause)

                self.dp.appendTrace('DISTRIBUTE')
                status = 'DISTRIBUTE'
                testapi.alterRemoteSubscription(dummy['dumSubName'], status)

                self.dp.appendTrace('insert and compare data')
                #insert to source
                testSrc.insertManyRows(dummy['dumTableName'], dummy['dumTableOwner'], ["12345"], True, "None")
                print "Checking if INSERT replicated correctly to HANA ..."
                selectSql = 'SELECT * FROM ' +  targetTableOwner + '.' + dummy['dumTTableName'] + ' ORDER BY COL1 ASC'
                resultset = "testHDBBarrier1i"
                self.compareRepData(selectSql, resultset)

                setClause = "COL1 = 678910"
                updateWhereClause = "COL1 = 12345"
                testSrc.updateRow(dummy['dumTableName'], dummy['dumTableOwner'], setClause, updateWhereClause)
                print "Checking if UPDATE replicated correctly to HANA ..."
                resultset = "testHDBBarrier1u"
                self.compareRepData(selectSql, resultset)

                deleteWhereClause = "COL1 > 10002"
                testSrc.deleteRow(dummy['dumTableName'], dummy['dumTableOwner'], deleteWhereClause)
                print "Checking if DELETE replicated correctly to HANA ..."
                resultset = "testHDBBarrier1d"
                self.compareRepData(selectSql, resultset)

                print 'Test complete successful !'

            else:
                pass
        except dbapi.Error, err:
            self.dp.appendTrace('Error in the test')
            self.dp.appendTrace(str(err))
	    self.assertEqual("True", "False","Fail to create agent instance!")
            pass

    def compareRepData(self, selectSql, resultset, timeout=300):
        """
        Define compareRepData inside of test class to generate the new expect result file named DPAdapterAAsimpleDPHANATest
        The expected result set file has limitation of 10M size. Existing DPAdapterDataCompareExpected.py contains too many resultsets.
        When the file size exceed 10m, we have to put the file to /area51 and also need many extra steps to let test find the file.
        See more details on the limitation at:
        http://trexweb.wdf.sap.corp:1080/wiki/index.php/PyUnit_Test_Framework
        """
        conman = ConnectionManager(verbosity=self._verbosity)
        self.conn = conman.createConnection(autocommit=True)
        cursor = self.conn.cursor()

        msg = "compareRepData:" + selectSql + ":" + str(resultset)
        loggerTest.info(msg)

        wait_period = os.getenv('WAIT_PERIOD')
        if wait_period != None:
            timeout = int(wait_period)

        if timeout < 0:
            loggerTest.info("Illegal timeout value given. Acceptable value should be >= 0, will use default value 300 (seconds).")
            timeout = 300

        # check only once if timeout = 0
        intv = 5
        if timeout == 0:
            try:
                cursor.execute(selectSql)
                e = ExpectedSimpleResultSet(cursor)
                self.assertExpected(e, resultset, "Data not replicated correctly to HANA.")
            except Exception as err:
                raise
        else:
            # check data within timeout seconds
            wait_time = 0
            while (wait_time < timeout):
                try:
                    cursor.execute(selectSql)
                    e = ExpectedSimpleResultSet(cursor)
                    if self.assertExpected(e, resultset, "Data not replicated correctly to HANA.") is None:
                        break
                except Exception as err:
                    time.sleep(intv)
                    wait_time = wait_time + intv
                    msg = "wait " + str(wait_time) + " sec"
                    loggerTest.info(msg)

            if wait_time >= timeout:
                errmsg = "Data not replicated correctly to HANA after waiting for " + str(timeout) + " seconds."
                try:
                    cursor.execute(selectSql)
                    e = ExpectedSimpleResultSet(cursor)
                    self.assertExpected(e, resultset, errmsg)
                except Exception as err:
                    raise


    ###@parametrized.by(os=["linux", "win"])
    @parametrized.by(os=["linux"])
    def configEnv(self):
        global osType
        osType = self.os
        print "Test will be run on: ",osType

if __name__ == '__main__':
  print '######## DPAgent dummy Main #########'
  if run_test == 1:
    SqlTestCase.runTest(DPAdapterAAsimpleDPHANATest)
    pass
  else:
      pass
