#################################################################################
# Test suite : testPagedAttributeCreateTable.py
#
# DDL tests : Create Column table Using Hana datatypes
# Author : Denis de O   (d.oliveira@sap.com)
# 
# Please see http://trexweb.wdf.sap.corp:1080/wiki/index.php/Unit_Test_Framework
# for a detailed explanation.
#
# History :
#                         Created : Denis de O  - 2/19/2013
#                         Update  : Denis de O  - 3/26/2013
#                                   Denis de O  - 5/7/2013   Enable tests / Skipped test19/22
#                                   Denis de O  - 5/29/2013  Fix the order of the tests                                    
#################################################################################

from lib.SqlTestCase import SqlTestCase
from lib.classification import classification
from lib.ConfigModifier import ConfigModifier
from hdbcli import dbapi
import os
import tempfile
import shutil
from lib.performanceUtils import waitForMetadataPostdropWithVersionGC

# Tests for paged attribute
class TestPagedAttributeCreateTable(SqlTestCase):
    cfgMod = ConfigModifier()
    tableName     =  'PAGEDTABLE1'
    viewtablename =  '"VIEWPTABLE1"'
    tableName2    =  '"PAGEDTABLE2"'
    tableName3    =  '"NOPAGEDTABLE"'
    tableSeq      =  '"tabSeq"'

    test_types = {'TINYINT':['0','1','2','3','4','5','6','7','8','9','127','255'],
                  'SMALLINT':['-32768','0','1','2','3','4','5','6','7','8','9','32767'],
                  'INTEGER':['-2147483648','0','1','2','3','4','5','6','7','8','9','2147483647'],
                  'BIGINT':['-922','0','1','2','3','4','5','6','7','8','9','922337'],
                  'REAL':['-2.89','0.0','1.0','2.0','3.0','4.0','5.0','6.0','7.0','8.0','9.0','1.7e+38'],
                  'FLOAT':['-1.5e-45','0.0','1.0','2.0','3.0','4.0','5.0','6.0','7.0','8.0','9.0','3.4e+38'],
                  'DOUBLE':['-5e-324','0.0','1.0','2.0','3.0','4.0','5.0','6.0','7.0','8.0','9.0','1.7e+308'],
                  'NCHAR(20)':["''","'a'","'aaaaaaaaaaaaaaaaaaaa'","'bbb'","'cc'","'dd'","'ee'","'f'","'g'","'z'","'z'","'zzzzzzzzzzzzzzzzzzzz'"],
                  'CHAR':["''","'a'","'b'","'c'","'d'","'e'","'f'","'g'","'h'","'i'","'z'"],
                  'DECIMAL':['-7922','-1E-28','0','1E-28','1','2','3','4','5','6','7','8','9','79228'],
                  'SMALLDECIMAL':['-7922','-1E-28','0','1E-28','1','2','3','4','5','6','7','8','9','79228'],
                  'VARCHAR(20)':["' '","'a'","'aaaaaaaaaaaaaaaaaaaa'","'bbb'","'cc'","'dd'","'ee'","'f'","'g'","'z'","'zzzzzzzzzzzzzzzzzzzz'"],
                  'NVARCHAR(20)':["' '","'a'","'aaaaaaaaaaaaaaaaaaaa'","'bbb'","'cc'","'dd'","'ee'","'f'","'g'","'z'","'zzzzzzzzzzzzzzzzzzzz'"],
                  'VARBINARY(20)':["'a'","'aaaaaaaaaaaaaaaaaaaa'","'11'", "''", "'0F'", "'b'","'c'","'d'","'e'","'f'","'ffffffffffffffffffff'"],
                  'BINARY':["'a'","'b'","'c'","'d'","'c'","'d'","'e'","'f'","'c'","'d'","'e'","'f'","'f'"],
                  'DATE':["'0001-01-01'","'2002-08-22'","'2002-08-22'","'2002-08-23'","'2002-08-12'","'2002-08-22'","'2002-08-18'","'2001-08-22'","'2002-08-22'",
                  "'2002-08-22'","'2002-08-22'","'9999-12-31'"],
                  'TIME':["'00:00:00'","'10:05:10'","'10:05:12'","'10:05:10'","'1:05:10'","'10:05:01'","'10:35:10'","'11:05:10'","'10:02:10'","'10:15:10'","'23:59:59'"],
                  'SECONDDATE':["'0001-01-01 00:00:01'", "'0002-01-01 00:00:01'", "'0003-01-01 00:00:01'","'0004-01-01 00:00:01'","'0005-01-01 00:00:01'","'0006-01-01 00:00:01'", "'0007-01-01 00:00:01'","'0008-01-01 00:00:01'", "'0009-01-01 00:00:01'", "'0010-01-01 00:00:01'", "'0012-01-01 00:00:01'"],
                  'TIMESTAMP':["'0001-01-01 00:00:00'","'2002-08-12 10:05:10'","'2002-07-22 10:05:10'","'2002-08-22 10:05:10'","'2002-08-22 10:05:10'","'2002-08-22 10:04:10'","'2002-08-22 10:05:10'","'2002-08-22 10:01:10'","'2002-08-22 10:05:10'","'2002-08-22 10:15:10'","'9999-12-31 23:59:59'"],
                  'SHORTTEXT(20)':["' '","'a'","'aaaaaaaaaaaaaaaaaaaa'","'bbb'","'cc'","'dd'","'ee'","'f'","'g'","'z'","'zzzzzzzzzzzzzzzzzzzz'"],
                  'ALPHANUM(20)':["''","'a11111'","'a22222'","'b33333'","'c44444'","'d55555'","'e6666'","'f7777'","'g88888'","'z99999'","'z10'"]}
    ##  Todo: In SP07 these datatypes below should be enabled.
    test_unsupported_types = ['TEXT', 'BLOB', 'NCLOB', 'CLOB', 'ST_POINT', 'ST_GEOMETRY']

    def setUp(self):
        """ create table in setUp """
        super(TestPagedAttributeCreateTable,self).setUp()
        self.conn.setautocommit(True)
        self.dropTable(self.tableName)

    def tearDown(self):
        """ drop table in tearDown """
        self.dropTable(self.tableName)
        self.conn.setautocommit(False)
        super(TestPagedAttributeCreateTable,self).tearDown()
 
    def setUpTestCase(self):
        super(TestPagedAttributeCreateTable,self).setUpTestCase()
        # fixme: When enable_nds_paging_fixedsize_dictionary activated by
        # default, remove the next 3 lines:
        self.cfgMod.set(('indexserver.ini', 'unifiedtable', 'enable_nds_paging_fixedsize_dictionary', 'True'), save = True, reconfigure = True)
        self.cfgMod.set(('indexserver.ini', 'unifiedtable', 'enable_nds_descriptors', '1'), save = True, reconfigure = True)
        print "Activated paging_fixsize_dictionary and enable_nds_descriptors."

    # Runs once during testPagedAttribute.py
    def tearDownTestCase(self):
        # fixme: When enable_nds_paging_fixedsize_dictionary activated by
        # default, remove the next 3 lines:
        self.cfgMod.unset(("indexserver.ini", "unifiedtable", "enable_nds_paging_fixedsize_dictionary"), reconfigure=True)
        self.cfgMod.unset(("indexserver.ini", "unifiedtable", "enable_nds_descriptors"), reconfigure=True)
        print "De-activated paging_fixsize_dictionary and enable_nds_descriptors."

########################### Testcase 01 (PA001_01)
    
    @classification("basic")
    def test01(self):
        """ Verify if syntax with paged attribute is working properly / create table  using all the supported dataypes """
        cursor = self.conn.cursor()
        try:
            for t in self.test_types:
                self._dropTable(cursor)
                cursor.execute("CREATE COLUMN TABLE "+self.tableName+ " (A SMALLINT PRIMARY KEY, B  char(1), C " + t + " PAGE LOADABLE)")
                
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (1, 'A', " +self.test_types[t][0]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (2, 'B', " +self.test_types[t][1]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (3, 'A', " +self.test_types[t][2]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (4, 'B', " +self.test_types[t][3]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (5, 'C', " +self.test_types[t][4]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (6, 'B', NULL)")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (7, 'B', " +self.test_types[t][5]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (8, 'B', " +self.test_types[t][6]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (9, 'B', " +self.test_types[t][7]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (10,'B', " +self.test_types[t][8]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (11,'B', " +self.test_types[t][9]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (12,'B',  NULL)")
                
                cursor.execute("MERGE DELTA OF " + self.tableName)

                cursor.execute("SELECT * FROM " + self.tableName + " where B = 'C'")

                res = cursor.fetchall()
                self.assertEqual(len(res),1)
                
        finally:
            cursor.close()

########################### Testcase 02 (PA001_02)

    @classification("basic")
    def test02(self):
        """ NEGATIVE TEST : create column table with Paged Attribute using same column names / Error  "272" should be expected """
        cursor = self.conn.cursor()
        gotError = 0
        try:
            self._dropTable(cursor)
            cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A SMALLINT PRIMARY KEY, A  INTEGER PAGE LOADABLE)")
        except dbapi.Error, err:
            errorcode = err[0]
            gotError = 1
            # expect an error
            if  (errorcode != 272):
                self.fail("Unexpected error code %d" % errorcode)
        if (gotError == 0):
                self.fail("Create Column Table using same column name did NOT raise an error!")

        cursor.close()

########################### Testcase 03  (PA001_08)

    @classification("basic")
    def test03(self):
        """  NEGATIVE TEST : create row table with Paged Attribute  / Error  "3" should be expected """
        cursor = self.conn.cursor()
        gotError = 0
        try:
            self._dropTable(cursor)
            cursor.execute("CREATE ROW TABLE "+self.tableName+" (A SMALLINT PRIMARY KEY, B  INTEGER PAGE LOADABLE)")
        except dbapi.Error, err:
            errorcode = err[0]
            gotError = 1
            # expect an error
            if  (errorcode != 7):
                self.fail("Unexpected error code %d" % errorcode)
        if (gotError == 0):
                self.fail("Create row table using paged attribute did NOT raise an error!")

        cursor.close()

########################### Testcase 04  (PA001_09)

    @classification("basic")
    def test04(self):
        """  NEGATIVE TEST : create history table with Paged Attribute  / Error  "7" should be expected """
        cursor = self.conn.cursor()
        gotError = 0
        try:
            self._dropTable(cursor)
            cursor.execute("CREATE HISTORY COLUMN TABLE "+self.tableName+" (A SMALLINT PRIMARY KEY, B  INTEGER PAGE LOADABLE)")
        except dbapi.Error, err:
            errorcode = err[0]
            # expect an error
            gotError = 1
            if (errorcode != 7):
                self.fail("Unexpected error code %d" % errorcode)
        if (gotError == 0):
            self.fail("Create history column table using paged attribute did NOT raise an error!")

        cursor.close()

########################### Testcase 05 (PA001_10)

    @classification("basic")
    def test05(self):
        """  NEGATIVE TEST : create global temporary table with Paged Attribute  / Error  "7" should be expected """
        cursor = self.conn.cursor()
        gotError = 0
        try:
            self._dropTable(cursor)
            cursor.execute("CREATE GLOBAL TEMPORARY TABLE "+self.tableName+" (A SMALLINT PRIMARY KEY, B  INTEGER PAGE LOADABLE)")
        except dbapi.Error, err:
            errorcode = err[0]
            gotError = 1
            # expect an error
            if  (errorcode != 7):
                self.fail("Unexpected error code %d" % errorcode)
        if (gotError == 0):
                self.fail("Create global temporary table using paged attribute did NOT raise an error!")

        cursor.close()

########################### Testcase 06 (PA001_11)

    @classification("basic")
    def test06(self):
        """  NEGATIVE TEST : create local temporary table with Paged Attribute  / Error  "257" should be expected """
        cursor = self.conn.cursor()
        gotError = 0
        try:
            self._dropTable(cursor)
            cursor.execute("CREATE LOCAL TEMPORARY TABLE "+self.tableName+" (A SMALLINT PRIMARY KEY, B  INTEGER PAGE LOADABLE)")
        except dbapi.Error, err:
            errorcode = err[0]
            gotError = 1
            # expect an error
            if  (errorcode != 7):
                self.fail("Unexpected error code %d" % errorcode)
        if (gotError == 0):
                self.fail("Create local temporary table using paged attribute did NOT raise an error!")

        cursor.close()

########################### Testcase 07

    @classification("basic")
    def test07(self):
        """  NEGATIVE TEST : create table with Paged Attribute  / Error  "7" should be expected """
        cursor = self.conn.cursor()
        gotError = 0
        try:
            self._dropTable(cursor)
            cursor.execute("CREATE ROW TABLE "+self.tableName+" (A SMALLINT PRIMARY KEY, B  INTEGER PAGE LOADABLE)")
        except dbapi.Error, err:
            errorcode = err[0]
            gotError = 1
            # expect an error
            if  (errorcode != 7):
                self.fail("Unexpected error code %d" % errorcode)
        if (gotError == 0):
                self.fail("Create GLOBAL temporary table using paged attribute did NOT raise an error!")
        cursor.close()

########################### Testcase 08  (PA001_14)

    @classification("basic")
    def test08(self):
        """  DROP TABLE RESTRICT   / Error  "419" should be expected """
        cursor = self.conn.cursor()
        gotError = 0
      
        self._dropTable(cursor)
        self._dropviewTable(cursor)
        
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A SMALLINT PRIMARY KEY, B  INTEGER PAGE LOADABLE)")
           
        cursor.execute("INSERT INTO " + self.tableName+" VALUES('1','2')")
        cursor.execute("INSERT INTO " + self.tableName+" VALUES('2','2')")
            
        cursor.execute("CREATE VIEW " + self.viewtablename+" AS (SELECT * FROM "+self.tableName+")")

        cursor.execute("MERGE DELTA OF " + self.tableName)
        
        try:
            cursor.execute("DROP TABLE "+self.tableName+" RESTRICT")
        except dbapi.Error, err:
               errorcode = err[0]
               gotError = 1
        # expect an error
               if  (errorcode != 419):
                   self.fail("Unexpected error code %d" % errorcode) 
            
        if (gotError == 0):
                self.fail("RESTRICT OPTION : Drops the table only when dependent objects do not exist, did NOT raise an error")
        
        cursor.close()

########################### Testcase 09 (PA001_13)

    @classification("basic")
    def test09(self):
        """  DROP TABLE CASCADE  / Error 259 should be expected """
        cursor = self.conn.cursor()
        gotError = 0

        self._dropTable(cursor)
        self._dropviewTable(cursor)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A SMALLINT PRIMARY KEY, B  INTEGER PAGE LOADABLE)")
        cursor.execute("INSERT INTO " + self.tableName+" VALUES('1','2')")
        cursor.execute("INSERT INTO " + self.tableName+" VALUES('2','2')")

        cursor.execute("CREATE VIEW " + self.viewtablename+" AS (SELECT * FROM "+self.tableName+")")

        cursor.execute("MERGE DELTA OF " + self.tableName)

        try:
            cursor.execute("DROP TABLE "+self.tableName+" CASCADE")
            cursor.execute("SELECT * from " + self.viewtablename)
        except dbapi.Error, err:
               errorcode = err[0]
               gotError = 1
        # expect an error
               if  (errorcode != 259):
                   self.fail("Unexpected error code %d" % errorcode)

        if (gotError == 0):
                self.fail("CASCADE OPTION : Drops the table with no dependent objects,  raise an error" % errorcode)

        cursor.close()

########################### Testcase 10  (PA001_03)

    @classification("basic")
    def test10(self):
        """  Create column table with Paged Attribute using columns with Default values """
        cursor = self.conn.cursor()
        try:
            self._dropTable(cursor)

            try:
                cursor.execute( """drop sequence myseq""")
            except dbapi.Error, err:
                pass

            cursor.execute( """CREATE sequence myseq start with 1 """)
            cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (ID INTEGER NOT NULL DEFAULT 1 PAGE LOADABLE ,FIRSTNAME VARCHAR(30) DEFAULT \'Joan\' PAGE LOADABLE, LASTNAME VARCHAR(28) NOT NULL DEFAULT \'Chen\' PAGE LOADABLE, PRICE REAL DEFAULT 1.7e+38 PAGE LOADABLE, loginN char(1), keyseq INTEGER PAGE LOADABLE)")

            cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('Z', myseq.nextval)")
            cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('X', myseq.nextval)")
            cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('W', myseq.nextval)")
            cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('S', myseq.nextval)")
            cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('Y', myseq.nextval)")

            cursor.execute("MERGE DELTA OF " + self.tableName)

            cursor.execute("SELECT ID,FIRSTNAME,LASTNAME FROM " + self.tableName +" where keyseq > 1")
            res = cursor.fetchall()

            expected =[(1, 'Joan', 'Chen'), (1, 'Joan', 'Chen'), (1, 'Joan', 'Chen'), (1, 'Joan', 'Chen')]
            self.assertEqual(str(res),str(expected))

        finally:
            cursor.close()

########################### Testcase 11  (New)

    @classification("basic")
    def test11(self):
        """ NEGATIVE TEST : Unsupported datatypes : 'TEXT','BLOB','NCLOB','CLOB', 'ST_POINT' and 'GEOMETRY' datatypes are not allowed in SP06 """
        cursor = self.conn.cursor()
        cursor.execute("alter system alter configuration ('indexserver.ini','SYSTEM') set ('spatial','activate_beta_spatial_engine') = 'Yes' with reconfigure")
        self._dropTable(cursor)
        cursor.execute("alter system alter configuration ('indexserver.ini','SYSTEM') set ('sql','lobPaging') = 'False' with reconfigure")
        for t in self.test_unsupported_types:
            self._dropTable(cursor)
            try:
                   cursor.execute("CREATE COLUMN TABLE "+self.tableName+ " (A SMALLINT PRIMARY KEY, B  char(1), C " + t + " PAGE LOADABLE)")
            except dbapi.Error, err:
                   errorcode = err[0]
                   gotError = 1
                   # expect an error
                   if (errorcode != 7):
                      self.fail("Unexpected error code %d" % errorcode)
            if (gotError == 0):
               self.fail("Create COLUMN TABLE using unsupported paged attribute data type did NOT raise an error!")

        cursor.execute("alter system alter configuration ('indexserver.ini','SYSTEM') set ('sql','lobPaging') = 'True' with reconfigure")
        for t in ['BLOB', 'NCLOB', 'CLOB']:
            self._dropTable(cursor)
            try:
                cursor.execute("CREATE COLUMN TABLE "+self.tableName+ " (A " + t + " PAGE LOADABLE)")
            except dbapi.Error, err:
                self.fail("Must be able to create table with lobPaging='True'.")
        cursor.execute("alter system alter configuration ('indexserver.ini','SYSTEM') set ('sql','lobPaging') = 'True' with reconfigure")

        cursor.execute("alter system alter configuration ('indexserver.ini','SYSTEM') set ('spatial','activate_beta_spatial_engine') = 'No' with reconfigure")
        cursor.close()

###########################

    @classification("basic")
    def testDisableSeriesData(self):
        """ NEGATIVE TEST : Unsupported page loadable for SERIESDATA columns """
        cursor = self.conn.cursor()
        self._dropTable(cursor)

        statementPairs = [
            ('(A INT, T TIMESTAMP PAGE LOADABLE)', False),
            ('(A INT PAGE LOADABLE, T TIMESTAMP)', False),
            ('(A INT, B INT PAGE LOADABLE, T TIMESTAMP)', True)
        ]
        for (tbl, supported) in statementPairs:
            self._dropTable(cursor)
            statement = ' CREATE COLUMN TABLE ' + self.tableName + tbl + \
                ' SERIES(SERIES KEY("A") EQUIDISTANT INCREMENT BY INTERVAL 1 ' + \
                ' SECOND PERIOD FOR SERIES("T"))'

            try:
                cursor.execute(statement)
                if supported:
                    cursor.execute("INSERT INTO " + self.tableName + \
                        " VALUES(0, 12345, '1972-01-01 00:00:01')")
                    cursor.execute("MERGE DELTA OF " + self.tableName)
                    cursor.execute("UNLOAD " + self.tableName)
                    cursor.execute("SELECT MAX(B) FROM " + self.tableName)
                    res = cursor.fetchall()
                    self.assertEqual(res[0][0], 12345)
            except dbapi.Error, err:
                if supported:
                    self.fail("Failed on supported statement.")
                elif (err[0] != 7): # feature not supported code
                    self.fail("Unexpected failure: %s" %(str(err)))

        # No PA partitions for SERIESDATA columns with TIMESELECTION
        schema = """ (A int, B varchar(8), C INT, D TIMESTAMP)
SERIES(SERIES KEY("C") EQUIDISTANT INCREMENT BY INTERVAL 1 SECOND PERIOD FOR SERIES("D")) """

        specCountPairs = [
           ("RANGE[TIME SELECTION NO UNIQUE CHECK] B 00000000,20100101-20110201,*'", 0),
           ("RANGE[TIME SELECTION: PAGED ATTRIBUTES, NO UNIQUE CHECK] B 00000000,20100101-20110201,*'", 2)
        ]

        for (spec, count) in specCountPairs:
            self._dropTable(cursor)
            self._dropTable(cursor)
            statement = ' CREATE COLUMN TABLE ' + self.tableName + schema + \
                " with parameters('PARTITION_SPEC' = '" + spec + ")"
            try:
                cursor.execute(statement)

                cursor.execute("INSERT INTO " + self.tableName + \
                    "(A,B) VALUES(1,'00000000')")
                cursor.execute("INSERT INTO " + self.tableName + \
                    "(A,B) VALUES(1,'20100922')")
                cursor.execute("INSERT INTO " + self.tableName + \
                    "(A,B) VALUES(1,'20120101')")

                # Merge must not crash:
                cursor.execute("MERGE DELTA OF " + self.tableName)

                cursor.execute("SELECT COLUMN_NAME FROM TABLE_COLUMNS " + \
                    "WHERE LOAD_UNIT = 'PAGE' AND TABLE_NAME='" + self.tableName + "'" + \
                    "ORDER BY COLUMN_NAME")

                res = cursor.fetchall()
                self.assertEqual(len(res), count)
                if count > 0:
                    self.assertEqual(res[0][0],"A")
                    self.assertEqual(res[1][0],"B")
            except dbapi.Error, err:
                self.fail("Unexpected failure: %s" %(str(err)))

        cursor.close()

###########################

    @classification("basic")
    def testTimeSelectionWithPAMergeToOne(self):
        """ Merge single level TS table with PA to CS table """
        cursor = self.conn.cursor()
        self._dropTable(cursor)
        oldDisallow = self.getConfigParameter('indexserver.ini', 'system',
            'partitioning', 'disallow_page_loadable_partitions')
        self.setConfigParameter('indexserver.ini', 'system',
            'partitioning', 'disallow_page_loadable_partitions', 'false')

        cursor.execute("CREATE COLUMN TABLE %s (A VARCHAR(8), B INT)" % self.tableName)
        cursor.execute("INSERT INTO %s (A,B) VALUES('00000000',1)" % self.tableName)
        cursor.execute("INSERT INTO %s (A,B) VALUES('00000001',1)" % self.tableName)
        cursor.execute("MERGE DELTA OF " + self.tableName)
        cursor.execute("ALTER TABLE " + self.tableName + " with parameters " + \
            "('PARTITION_SPEC' = 'RANGE[TIME SELECTION: PAGED ATTRIBUTES] A 00000000,*')")
        cursor.execute("ALTER TABLE %s  with parameters ('PARTITION_SPEC' = 'MERGE')" % self.tableName)
        cursor.close()

########################### Testcase 12
    @classification("basic")
    def test12(self):
        """ Create column table with Paged Attribute using  varbinary datypes """
        cursor = self.conn.cursor()
        try:
            self._dropTable(cursor)

            try:
                cursor.execute( """drop sequence myseq""")
            except dbapi.Error, err:
                pass

            cursor.execute( """CREATE sequence myseq start with 1 """)
            cursor.execute("CREATE COLUMN TABLE "+self.tableName+"(a varbinary(20) PAGE LOADABLE, b varbinary(10) PAGE LOADABLE, KEY BIGINT PAGE LOADABLE)")

            cursor.execute("INSERT INTO " + self.tableName+" VALUES (HEXTOBIN('A1B2C3D4FF'), HEXTOBIN('ABCDEF'), myseq.nextval)")
            cursor.execute("INSERT INTO " + self.tableName+" VALUES (TO_BINARY('A1B2C3D4FF'), TO_BINARY('ABCDEF'),myseq.nextval)")
            cursor.execute("INSERT INTO " + self.tableName+" VALUES (TO_BINARY('ABCDEFGHIJKLMNOPQRST'), TO_BINARY('1234567890'), myseq.nextval)")
            cursor.execute("INSERT INTO " + self.tableName+" VALUES (HEXTOBIN('FF00FF00FF'), HEXTOBIN('00FFFF00'), myseq.nextval)")
            cursor.execute("INSERT INTO " + self.tableName+" VALUES (NULL, NULL, myseq.nextval)")

            cursor.execute("MERGE DELTA OF " + self.tableName)

            cursor.execute("SELECT TO_CHAR(a),TO_CHAR(b) FROM " + self.tableName +" where key = 1")

            res = cursor.fetchall()
            expected = [('A1B2C3D4FF', 'ABCDEF')]

            self.assertEqual(str(res),str(expected))

        finally:
            cursor.close()

########################### Testcase 13   (PA001_15/16)
    @classification("basic")
    def test13(self):
        """ RENAME Column table for table with paged attribute and not  """
        cursor = self.conn.cursor()
        self._dropTable(cursor)
        self._dropTable3(cursor)
        try:
            ## Create column table with paged attribute
            cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A INT PRIMARY KEY, B INT PAGE LOADABLE) WITH PARAMETERS (\'AUTO_MERGE\'= (\'OFF\'))")
            cursor.execute("INSERT INTO "+self.tableName+" values (1, 10)")
            cursor.execute("INSERT INTO "+self.tableName+" values (2, 20)")

            cursor.execute("MERGE DELTA OF " + self.tableName)

            cursor.execute("SELECT * FROM "+self.tableName)
            cursor.execute("SELECT COLUMN_NAME, LOAD_UNIT from SYS.TABLE_COLUMNS WHERE TABLE_NAME = \'PAGEDTABLE1\'")

            res = cursor.fetchall()
            self.assertEqual(len(res),2)

            self.assertEquals(res[0][0], 'A')
            self.assertEquals(res[0][1], 'DEFAULT')
            self.assertEquals(res[1][0], 'B')
            self.assertEquals(res[1][1], 'PAGE')

            cursor.execute("RENAME COLUMN "+self.tableName+".B to X")

            cursor.execute("SELECT COLUMN_NAME, LOAD_UNIT from SYS.TABLE_COLUMNS WHERE TABLE_NAME = \'PAGEDTABLE1\'")

            res = cursor.fetchall()
            self.assertEqual(len(res),2)

            self.assertEquals(res[0][0], 'A')
            self.assertEquals(res[0][1], 'DEFAULT')
            self.assertEquals(res[1][0], 'X')
            self.assertEquals(res[1][1], 'PAGE')

            cursor.execute ("select * from "+self.tableName)

            ## create column table without paged attribute
            cursor.execute("CREATE COLUMN TABLE "+self.tableName3+" (A INT PRIMARY KEY, B INT) WITH PARAMETERS (\'AUTO_MERGE\'= (\'OFF\'))")
            cursor.execute("INSERT INTO "+self.tableName3+" values (1, 10)")
            cursor.execute("INSERT INTO "+self.tableName3+" values (2, 20)")

            cursor.execute("MERGE DELTA OF " + self.tableName3)

            cursor.execute("SELECT * FROM "+self.tableName3)

            cursor.execute("SELECT COLUMN_NAME, LOAD_UNIT from SYS.TABLE_COLUMNS WHERE TABLE_NAME = \'NOPAGEDTABLE\'")

            res = cursor.fetchall()

            self.assertEqual(len(res),2)

            self.assertEquals(res[0][0], 'A')
            self.assertEquals(res[0][1], 'DEFAULT')
            self.assertEquals(res[1][0], 'B')
            self.assertEquals(res[1][1], 'DEFAULT')

            cursor.execute("RENAME COLUMN "+self.tableName3+".B to X")

            cursor.execute("SELECT COLUMN_NAME, LOAD_UNIT from SYS.TABLE_COLUMNS WHERE TABLE_NAME = \'NOPAGEDTABLE\'")

            res = cursor.fetchall()
            self.assertEqual(len(res),2)

            self.assertEquals(res[0][0], 'A')
            self.assertEquals(res[0][1], 'DEFAULT')
            self.assertEquals(res[1][0], 'X')
            self.assertEquals(res[1][1], 'DEFAULT')

            cursor.execute ("select * from "+self.tableName3)

        finally:
            cursor.close()

########################### Testcase 14
    @classification("basic")
    def test14(self):
        """ DROP COLUMN table test for table with paged attribute  """
        cursor = self.conn.cursor()
        self._dropTable(cursor)
        self._dropTable3(cursor)
        gotError = 0

        ## Create column table with paged attribute
        try:
            cursor.execute( """drop sequence myseq""")
        except dbapi.Error, err:
               pass

        cursor.execute( """CREATE sequence myseq start with 1 """)
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (ID INTEGER NOT NULL DEFAULT 1 PAGE LOADABLE ,FIRSTNAME VARCHAR(30) DEFAULT \'Joan\' PAGE LOADABLE,LASTNAME VARCHAR(28) NOT NULL DEFAULT \'Chen\',PRICE REAL DEFAULT 1.7e+38, loginN char(1) , keyseq INTEGER)")

        cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('Z', myseq.nextval)")
        cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('X', myseq.nextval)")
        cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('W', myseq.nextval)")
        cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('S', myseq.nextval)")
        cursor.execute("INSERT INTO " + self.tableName+"(loginN,keyseq) VALUES ('Y', myseq.nextval)")

        cursor.execute("MERGE DELTA OF " + self.tableName)

        cursor.execute("SELECT * FROM "+self.tableName)

        try:
           sqlstat = """ALTER TABLE PAGEDTABLE1 DROP("FIRSTNAME")"""

           cursor.execute(sqlstat)
           errorcode = 0
        except dbapi.Error, err:
           errorcode = err[0]
           gotError = 1
        # expect NO error
        if (errorcode != 0):
             self.fail("Unexpected error code %d" % errorcode) 
            
        if (gotError != 0):
           self.fail("DROP COLUMN FAILED : Drops column should NOT failed,  raise an error" % errorcode)
    
        cursor.close()

########################### Testcase 15 (PA001_04)
    @classification("basic")
    def test15(self):
        """ Create column table with paged attribue and NOT null/null values  """
        cursor = self.conn.cursor()
        self._dropTable(cursor)
        
        ## Create column table with paged attribute
        try:
            cursor.execute( """drop sequence myseq""")
        except dbapi.Error, err:
               pass

        cursor.execute( """CREATE sequence myseq start with 1 """)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c_bigint1 bigint default 0 NOT NULL PAGE LOADABLE, c_bigint2 bigint default 2147483647,\
                       c_bigint3 bigint default -2147483648 NULL PAGE LOADABLE , c_bigint4 bigint default 9223372036854775807, c_bigint5 bigint default -9223372036854775808,\
                        key     bigint)")  
                        
        cursor.execute("INSERT INTO "  + self.tableName+"(c_bigint1 , c_bigint2, key) values(11, 22, myseq.nextval)")
        cursor.execute("INSERT INTO "  + self.tableName+"(c_bigint1 , c_bigint2, key) values(111, 222,  myseq.nextval)")
        cursor.execute("INSERT INTO "  + self.tableName+"(c_bigint1 , c_bigint2, key) values(1111, 2222, myseq.nextval)")
        cursor.execute("INSERT INTO "  + self.tableName+ " values(11111,22222,33333, 0.0,0,myseq.nextval)")
        cursor.execute("INSERT INTO "  + self.tableName+ " values(111111,222222,NULL,NULL,NULL,myseq.nextval)")

        cursor.execute("MERGE DELTA OF " + self.tableName)
            
        cursor.execute("SELECT * FROM "+self.tableName+" where key = 2")
        res = cursor.fetchall()
        
        self.assertEquals(len(res),1)
        self.assertEquals(res[0][0],111)
        self.assertEquals(res[0][1],222)
        self.assertEquals(res[0][2],-2147483648)

        self.assertEquals(res[0][3],9223372036854775807)
        self.assertEquals(res[0][4],-9223372036854775808)
        self.assertEquals(res[0][5],2)
     
        cursor.close()
        
########################### Testcase 16 (PA001_05)

    @classification("basic")
    def test16(self):
        """ Create column table with paged attribue / unique index  """
        cursor = self.conn.cursor()
        self._dropTable(cursor)
        
        ## Create column table with paged attribute
        try:
            cursor.execute( """drop sequence myseq""")
        except dbapi.Error, err:
               pass

        cursor.execute( """CREATE sequence myseq start with 1 """)
        
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c_bigint1 bigint default 0 NOT NULL PAGE LOADABLE, c_bigint2 bigint default 2147483647,\
                       c_bigint3 bigint default -2147483648 NULL PAGE LOADABLE , c_bigint4 bigint default 9223372036854775807, c_bigint5 bigint default -9223372036854775808,\
                        key     bigint)")  
                        
        cursor.execute("create unique index idx1 on " +self.tableName+" ( c_bigint1 )")
        cursor.execute("create unique index idx2 on " +self.tableName+" ( c_bigint2 )")
        cursor.execute("create unique index idx3 on " +self.tableName+" ( c_bigint3 )")
        cursor.execute("create unique index idx4 on " +self.tableName+" ( c_bigint4 )")
        cursor.execute("create unique index idx5 on " +self.tableName+" ( c_bigint5 )")
        waitForMetadataPostdropWithVersionGC(self.conn) # enforce metadata version collection to allow merge
        
        cursor.execute("INSERT into "+self.tableName+" values(1,2,3,4,5, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(11,22,33,44,55, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(111,222,333,444,555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(1111,2222,3333,4444,5555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(11111,22222,33333,44444,55555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(111111,222222,333333,444444,555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(1111111,2222222,3333333,4444444,5555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(11111111,22222222,33333333,44444444,55555555, myseq.nextval)")

        cursor.execute("MERGE DELTA OF " + self.tableName)

        cursor.execute("SELECT * FROM "+self.tableName+" where key = 2")
        res = cursor.fetchall()
        
        self.assertEquals(len(res),1)
        self.assertEquals(res[0][0],11)
        self.assertEquals(res[0][1],22)
        self.assertEquals(res[0][2],33)

        self.assertEquals(res[0][3],44)
        self.assertEquals(res[0][4],55)
        self.assertEquals(res[0][5],2)
     
        cursor.close()
        
########################### Testcase 17 (PA001_06)

    @classification("basic")
    def test17(self):
        """ Create column table with paged attribue / primary key multiple columns  """
        cursor = self.conn.cursor()
        self._dropTable(cursor)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (n_bigint bigint PAGE LOADABLE, cchar char(20) PAGE LOADABLE, c_varchar varchar(10) PAGE LOADABLE , PRIMARY KEY (n_bigint, cchar, c_varchar))")

        cursor.execute("INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'vacation\')")
        cursor.execute("INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'work\')")
        cursor.execute("INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'vacation\')")
        cursor.execute("INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'work\')")

        # Expected unique constraint errors against delta
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'vacation\')",301)
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'work\')",301)
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'vacation\')",301)
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'work\')",301)

        cursor.execute("MERGE DELTA OF " + self.tableName)

        # Expected unique constraint errors against main
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'vacation\')",301)
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'work\')",301)
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'vacation\')",301)
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'work\')",301)

        # Unload and re-verify
        cursor.execute("unload "+self.tableName)

        # Expected unique constraint errors against main
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'vacation\')",301)
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'work\')",301)
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'vacation\')",301)
        self._execSqlExpectError(cursor,"INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'work\')",301)

        #verify data
        cursor.execute("SELECT * from "+self.tableName)
        res = cursor.fetchall()

        expected =[(1,'char testing1', 'vacation'), (1, 'char testing1', 'work'), (1, 'char testing2', 'vacation'), (1, 'char testing2', 'work')]

        #this should be generated expected results
        self.assertEquals(str(expected), str(res))

        # now drop primary key and verify
        cursor.execute("ALTER TABLE " + self.tableName + " DROP PRIMARY KEY")

        # Expected no unique constraint errors against main
        cursor.execute("INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'vacation\')")
        cursor.execute("INSERT into "+self.tableName+" VALUES (1, \'char testing1\', \'work\')")
        cursor.execute("INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'vacation\')")
        cursor.execute("INSERT into "+self.tableName+" VALUES (1, \'char testing2\', \'work\')")

        cursor.close()

############################ Testcase 18

    @classification("basic")
    def test18(self):
        """ You create column table with paged attribute with "like/AS" / "with data" and "no data" clause.   """

        self.skipTest("Bug 203181")

        cursor = self.conn.cursor()
        try:
            for t in self.test_types:

                self._dropTable(cursor)

                cursor.execute("CREATE COLUMN TABLE "+self.tableName+ " (A SMALLINT PRIMARY KEY, B  char(1), C " + t + " PAGE LOADABLE)")

                cursor.execute("INSERT INTO "+self.tableName+" VALUES (1, 'A', " +self.test_types[t][0]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (2, 'B', " +self.test_types[t][1]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (3, 'A', " +self.test_types[t][2]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (4, 'B', " +self.test_types[t][3]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (5, 'C', " +self.test_types[t][4]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (6, 'B', NULL)")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (7, 'B', " +self.test_types[t][5]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (8, 'B', " +self.test_types[t][6]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (9, 'B', " +self.test_types[t][7]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (10,'B', " +self.test_types[t][8]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (11,'B', " +self.test_types[t][9]+ ")")
                cursor.execute("INSERT INTO "+self.tableName+" VALUES (12,'B',  NULL)")

                cursor.execute("MERGE DELTA OF " + self.tableName)

                cursor.execute("select * from "+self.tableName)

                res = cursor.fetchall()
                self.assertEqual(len(res),12)

                try:
                   cursor.execute( """DROP TABLE TB_TEST""")
                except dbapi.Error, err:
                       pass

                cursor.execute("CREATE COLUMN TABLE TB_TEST LIKE "+self.tableName+" WITH NO DATA")
        
                #Table TB_TEST should NOT have zero rows
                cursor.execute("SELECT * from TB_TEST")
                res = cursor.fetchall()

                self.assertEqual(len(res),0)
                cursor.execute("DROP TABLE TB_TEST")

                #Table TB_TEST should have 12 rows
                cursor.execute("CREATE COLUMN TABLE TB_TEST LIKE "+self.tableName+" WITH DATA")

                cursor.execute("SELECT * from  TB_TEST")
                res = cursor.fetchall()

                self.assertEqual(len(res),12)

                cursor.execute("DROP TABLE TB_TEST")

                #Table TB_TEST should have zero rows
                cursor.execute("CREATE COLUMN TABLE TB_TEST AS (select * from "+self.tableName+") WITH NO DATA")

                cursor.execute("SELECT * from  TB_TEST")
                res = cursor.fetchall()

                self.assertEqual(len(res),0)

                cursor.execute("DROP TABLE TB_TEST")

                #Table TB_TEST should have 12 rows
                cursor.execute("CREATE COLUMN TABLE TB_TEST AS (select * from "+self.tableName+") WITH DATA")
                
                cursor.execute("SELECT * from  TB_TEST")
                res = cursor.fetchall()
                
                self.assertEqual(len(res),12)
                
                cursor.execute("DROP TABLE TB_TEST")
                
        finally:
            cursor.close()

########################### Testcase 19 (PA003_02 and PA003_05)

    @classification("basic")
    def test19(self):
        """ Create column table with paged attribue / create index and multiple indexes / great equal expression  """

        cursor = self.conn.cursor()
        self._dropTable(cursor)

        ## Create column table with paged attribute
        try:
            cursor.execute( """drop sequence myseq""")
        except dbapi.Error, err:
               pass

        cursor.execute( """CREATE sequence myseq start with 1 """)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c_int1 integer NOT NULL PAGE LOADABLE, c_int2 integer default 2 NOT NULL PAGE LOADABLE, c_int3 integer NULL PAGE LOADABLE, c_int4 integer DEFAULT 4 PAGE LOADABLE, c_int5  integer PAGE LOADABLE, key bigint PRIMARY KEY)")

        cursor.execute("INSERT into "+self.tableName+" values(1,2,3,4,5, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(11,22,33,44,55, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(111,222,333,444,555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(1111,2222,3333,4444,5555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(11111,22222,33333,44444,55555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(111111,222222,333333,444444,555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(1111111,2222222,3333333,4444444,5555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(11111111,22222222,33333333,44444444,55555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(111111111,222222222,333333333,444444444,555555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-1,-2,-3,-4,-5, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-11,-22,-33,-44,-55, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-111,-222,-333,-444,-555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-1111,-2222,-3333,-4444,-5555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-11111,-22222,-33333,-44444,-55555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-111111,-222222,-333333,-444444,-555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-1111111,-2222222,-3333333,-4444444,-5555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-11111111,-22222222,-33333333,-44444444,-55555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-111111111,-222222222,-333333333,-444444444,-555555555, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-0, -00, -0, -00, -000, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(0, 00, 0, 00, 000, myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values(-1111,-2222,NULL,NULL,NULL, myseq.nextval)")

        cursor.execute("MERGE DELTA OF " + self.tableName)

        ## Create Indexes , Expression - Operator (Tree Index)
        cursor.execute("create index idx_int1 on "+self.tableName+" (c_int1)")
        cursor.execute("create index idx_int3 on "+self.tableName+" (c_int3)")
        cursor.execute("create index idx_int5 on "+self.tableName+" (c_int5)")

        ## '>='

        cursor.execute("select key, c_int1 from "+self.tableName+" where c_int1 >= 11 order by key")
        res = cursor.fetchall()

        expected =[(2, 11), (3, 111), (4, 1111), (5, 11111),(6, 111111), (7, 1111111), (8, 11111111), (9, 111111111)]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_int1 from "+self.tableName+" where c_int1 >= 0 order by key")
        res = cursor.fetchall()

        expected =[(1, 1),(2, 11), (3, 111), (4, 1111), (5, 11111),(6, 111111), (7, 1111111), (8, 11111111), (9, 111111111), (19, 0), (20, 0)]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_int1 from "+self.tableName+" where c_int3 > c_int1 order by key")
        res = cursor.fetchall()

        expected =[(1, 1),(2, 11), (3, 111), (4, 1111), (5, 11111),(6, 111111), (7, 1111111), (8, 11111111), (9, 111111111)]
        self.assertEqual(str(res),str(expected))

        ## Drop indexes
        cursor.execute("drop index idx_int1")
        cursor.execute("drop index idx_int3")
        cursor.execute("drop index idx_int5")

        ## Create Multi-Key, Index, Expression - Operator (Multi-key Index)
        cursor.execute("create index idx_int1 on "+self.tableName+" (c_int1, c_int3)")
        cursor.execute("create index idx_int3 on "+self.tableName+" (c_int3, c_int1)")

        ## '>='
        cursor.execute("select key, c_int1 from "+self.tableName+" where c_int1 >= 11 order by key")
        res = cursor.fetchall()

        expected =[(2, 11), (3, 111), (4, 1111), (5, 11111),(6, 111111), (7, 1111111), (8, 11111111), (9, 111111111)]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_int1 from "+self.tableName+" where c_int1 >= 0 order by key")
        res = cursor.fetchall()

        expected =[(1, 1),(2, 11), (3, 111), (4, 1111), (5, 11111),(6, 111111), (7, 1111111), (8, 11111111), (9, 111111111), (19, 0), (20, 0)]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_int1 from "+self.tableName+" where c_int3 > c_int1 order by key")
        res = cursor.fetchall()

        expected =[(1, 1),(2, 11), (3, 111), (4, 1111), (5, 11111),(6, 111111), (7, 1111111), (8, 11111111), (9, 111111111)]
        self.assertEqual(str(res),str(expected))

        ## Drop indexes
        cursor.execute("drop index idx_int1")
        cursor.execute("drop index idx_int3")

        cursor.close()

########################### Testcase 20 (PA003_04)

    @classification("basic")
    def test20(self):
        """ Create column table with paged attribue /  index  / View  """
        cursor = self.conn.cursor()
        self._dropTable(cursor)
        self._dropviewTable(cursor)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (n BIGINT PAGE LOADABLE, t TIMESTAMP PAGE LOADABLE, ch CHAR (40) PAGE LOADABLE, v VARCHAR(200) PAGE LOADABLE, r VARBINARY(10) PAGE LOADABLE)")

        cursor.execute("INSERT into "+self.tableName+" values(1, '2001/01/01 1:1:1', 'chars1', 'varchars1', hextobin('ABCDF'))")
        cursor.execute("INSERT into "+self.tableName+" values(2, '2002/02/02 2:2:2', 'chars2', 'varchars2', hextobin('ABCDF2'))")

        ## Create Index
        cursor.execute("create index idx on "+self.tableName+" (n,t)")

        ## Create View
        cursor.execute("create view "+self.viewtablename+" as select * from "+self.tableName)

        cursor.execute("MERGE DELTA OF " + self.tableName)

        cursor.execute("select  n, TO_CHAR(t), ch,v,TO_CHAR(r) from "+self.viewtablename+" order by n")
        res = cursor.fetchall()

        expected =[(1, '2001-01-01 01:01:01.0000000', 'chars1', 'varchars1', '0ABCDF'), (2, '2002-02-02 02:02:02.0000000', 'chars2', 'varchars2', 'ABCDF2')]
        self.assertEqual(str(res),str(expected))

        ## Drop index
        cursor.execute("drop index idx")
        self._dropviewTable(cursor)

        cursor.close()

########################### Testcase 21 (PA003_03)

    @classification("basic")
    def test21(self):
        """ Create column table with paged attribue / create index and multiple indexes / Not equal expression char  """
        cursor = self.conn.cursor()
        self._dropTable(cursor)

        ## Create column table with paged attribute
        try:
            cursor.execute( """drop sequence myseq""")
        except dbapi.Error, err:
               pass

        cursor.execute( """CREATE sequence myseq start with 1 """)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c_char1 char(100) NOT NULL PAGE LOADABLE, c_char2 char(100) DEFAULT 'DEFAULT 2' NOT NULL PAGE LOADABLE, c_char3 char(100)  NULL PAGE LOADABLE, c_char4 char(100) default 'DEFAULT 4' PAGE LOADABLE, c_char5  char(100), key bigint PRIMARY KEY)")  

        cursor.execute("MERGE DELTA OF " + self.tableName)

        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 1','CHAR DATA 2','CHAR DATA 3','CHAR DATA 4','CHAR DATA 5', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 11','CHAR DATA 22','CHAR DATA 33','CHAR DATA 44','CHAR DATA 55', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 111','CHAR DATA 222','CHAR DATA 333','CHAR DATA 444','CHAR DATA 555', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 1111','CHAR DATA 2222','CHAR DATA 3333','CHAR DATA 4444','CHAR DATA 5555', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 11111','CHAR DATA 22222','CHAR DATA 33333','CHAR DATA 44444','CHAR DATA 55555', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 111111','CHAR DATA 222222','CHAR DATA 333333','CHAR DATA 444444','CHAR DATA 555555', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 1111111','CHAR DATA 2222222','CHAR DATA 3333333','CHAR DATA 4444444','CHAR DATA 5555555', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 11111111','CHAR DATA 22222222','CHAR DATA 33333333','CHAR DATA 44444444','CHAR DATA 55555555', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 111111111','CHAR DATA 222222222','CHAR DATA 33333333','CHAR DATA 444444444','CHAR DATA 555555555', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('','','','','', myseq.nextval)")
        cursor.execute("INSERT into "+self.tableName+" values('CHAR DATA 1234','CHAR DATA 1234',NULL,NULL,NULL, myseq.nextval)")

        ## Create Indexes  / Not equal expression char
        cursor.execute("create index idx_char1 on "+self.tableName+" (c_char1)")
        cursor.execute("create index idx_char3 on "+self.tableName+" (c_char3)")
        cursor.execute("create index idx_char5 on "+self.tableName+" (c_char5)")

        ## '!='

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char1 != 'CHAR DATA 1' order by key")
        res = cursor.fetchall()

        expected =[(2, 'CHAR DATA 11'), (3, 'CHAR DATA 111'), (4, 'CHAR DATA 1111'), (5, 'CHAR DATA 11111'), (6, 'CHAR DATA 111111'), (7, 'CHAR DATA 1111111'), (8, 'CHAR DATA 11111111'), (9, 'CHAR DATA 111111111'), (10, ''), (11, 'CHAR DATA 1234')]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char1 != '' order by key")
        res = cursor.fetchall()

        expected =[(1, 'CHAR DATA 1'), (2, 'CHAR DATA 11'), (3, 'CHAR DATA 111'), (4, 'CHAR DATA 1111'), (5, 'CHAR DATA 11111'), (6, 'CHAR DATA 111111'), (7, 'CHAR DATA 1111111'), (8, 'CHAR DATA 11111111'), (9, 'CHAR DATA 111111111'), (11, 'CHAR DATA 1234')]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char3 != NULL order by key")
        res = cursor.fetchall()

        expected =[]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char3 != c_char3 order by key")
        res = cursor.fetchall()

        expected =[]
        self.assertEqual(str(res),str(expected))


        ## '<>'
        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char1 <> 'CHAR DATA 1' order by key")
        res = cursor.fetchall()

        expected =[(2, 'CHAR DATA 11'), (3, 'CHAR DATA 111'), (4, 'CHAR DATA 1111'), (5, 'CHAR DATA 11111'), (6, 'CHAR DATA 111111'), (7, 'CHAR DATA 1111111'), (8, 'CHAR DATA 11111111'), (9, 'CHAR DATA 111111111'), (10, ''), (11, 'CHAR DATA 1234')]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char1 <> '' order by key")
        res = cursor.fetchall()

        expected =[(1, 'CHAR DATA 1'), (2, 'CHAR DATA 11'), (3, 'CHAR DATA 111'), (4, 'CHAR DATA 1111'), (5, 'CHAR DATA 11111'), (6, 'CHAR DATA 111111'), (7, 'CHAR DATA 1111111'), (8, 'CHAR DATA 11111111'), (9, 'CHAR DATA 111111111'), (11, 'CHAR DATA 1234')]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char3 <> NULL order by key")
        res = cursor.fetchall()

        expected =[]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char3 <> c_char3 order by key")
        res = cursor.fetchall()

        expected =[]
        self.assertEqual(str(res),str(expected))

        ## Drop indexes
        cursor.execute("drop index idx_char1")
        cursor.execute("drop index idx_char3")
        cursor.execute("drop index idx_char5")

        ## Create Multi-Key Indexes / Not equal expression char
        cursor.execute("create index idx_char1 on "+self.tableName+" (c_char1, c_char3)")
        cursor.execute("create index idx_char3 on "+self.tableName+" (c_char3, c_char1)")

        ## '!=' / Multi-key indexes

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char1 != 'CHAR DATA 1' order by key")
        res = cursor.fetchall()

        expected =[(2, 'CHAR DATA 11'), (3, 'CHAR DATA 111'), (4, 'CHAR DATA 1111'), (5, 'CHAR DATA 11111'), (6, 'CHAR DATA 111111'), (7, 'CHAR DATA 1111111'), (8, 'CHAR DATA 11111111'), (9, 'CHAR DATA 111111111'), (10, ''), (11, 'CHAR DATA 1234')]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char1 != '' order by key")
        res = cursor.fetchall()

        expected =[(1, 'CHAR DATA 1'), (2, 'CHAR DATA 11'), (3, 'CHAR DATA 111'), (4, 'CHAR DATA 1111'), (5, 'CHAR DATA 11111'), (6, 'CHAR DATA 111111'), (7, 'CHAR DATA 1111111'), (8, 'CHAR DATA 11111111'), (9, 'CHAR DATA 111111111'), (11, 'CHAR DATA 1234')]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char3 != NULL order by key")
        res = cursor.fetchall()

        expected =[]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char3 != c_char3 order by key")
        res = cursor.fetchall()

        expected =[]
        self.assertEqual(str(res),str(expected))


        ## '<>' / Multi-Key Indexes
        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char1 <> 'CHAR DATA 1' order by key")
        res = cursor.fetchall()

        expected =[(2, 'CHAR DATA 11'), (3, 'CHAR DATA 111'), (4, 'CHAR DATA 1111'), (5, 'CHAR DATA 11111'), (6, 'CHAR DATA 111111'), (7, 'CHAR DATA 1111111'), (8, 'CHAR DATA 11111111'), (9, 'CHAR DATA 111111111'), (10, ''), (11, 'CHAR DATA 1234')]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char1 <> '' order by key")
        res = cursor.fetchall()

        expected =[(1, 'CHAR DATA 1'), (2, 'CHAR DATA 11'), (3, 'CHAR DATA 111'), (4, 'CHAR DATA 1111'), (5, 'CHAR DATA 11111'), (6, 'CHAR DATA 111111'), (7, 'CHAR DATA 1111111'), (8, 'CHAR DATA 11111111'), (9, 'CHAR DATA 111111111'), (11, 'CHAR DATA 1234')]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char3 <> NULL order by key")
        res = cursor.fetchall()

        expected =[]
        self.assertEqual(str(res),str(expected))

        cursor.execute("select key, c_char1 from "+self.tableName+" where c_char3 <> c_char3 order by key")
        res = cursor.fetchall()

        expected =[]
        self.assertEqual(str(res),str(expected))

        ## Drop indexes
        cursor.execute("drop index idx_char1")
        cursor.execute("drop index idx_char3")


        cursor.close()

########################### Testcase 22 ( New)

    @classification("basic")
    def test22(self):
        """ Create column table with paged attribue /  create TREE index search of char / varchar  """

        cursor = self.conn.cursor()
        self._dropTable(cursor)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c char(2) page loadable , v varchar(2) page loadable)")

        cursor.execute("INSERT into "+self.tableName+" values('0', '0')")
        cursor.execute("INSERT into "+self.tableName+" values('1', '1')")

        try:
            cursor.execute( """drop index idx""")
        except dbapi.Error, err:
               pass

        ## Create TREE Index
        cursor.execute("create TREE index idx on "+self.tableName+" (c)")
        waitForMetadataPostdropWithVersionGC(self.conn) # enforce metadata version collection to allow merge

        cursor.execute("MERGE DELTA OF " + self.tableName)

        cursor.execute("select  top 1 * from "+self.tableName+" where c >= '0' order by c")
        res = cursor.fetchall()

        expected =[('0', '0')]
        self.assertEqual(str(res),str(expected))

        ## Drop index
        cursor.execute("drop index idx")

        ## Create TREE Index
        cursor.execute("create TREE index idx on "+self.tableName+" (v)")

        cursor.execute("select  top 1 * from "+self.tableName+" where c>= '0' order by v")
        res = cursor.fetchall()

        expected =[('0', '0')]
        self.assertEqual(str(res),str(expected))

        ## Drop index
        cursor.execute("drop index idx")

        cursor.close()

########################### Testcase 23

    @classification("basic")
    def test23(self):
        """ Test paged string dictionaries - basic minimum acceptance test """
        cursor = self.conn.cursor()
        self._dropTable(cursor)

	## testing fixed strings and strings for now, blob is currently not supported

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c char(2) page loadable , v varchar(4) page loadable)")

        cursor.execute("INSERT into "+self.tableName+"(c,v) values('aa', 'ccc3')")
        cursor.execute("INSERT into "+self.tableName+"(c,v) values('bb', 'dd')")

	## Test merge
        cursor.execute("MERGE DELTA OF " + self.tableName)

        cursor.execute("select  * from "+self.tableName)
        res = cursor.fetchall()

        expected =[('aa', 'ccc3'), ('bb', 'dd')]
        self.assertEqual(str(res),str(expected))

	## Test unload/load
        cursor.execute("unload " + self.tableName)

	cursor.execute("load " + self.tableName + " all")

        cursor.execute("select  * from "+self.tableName)
        res = cursor.fetchall()

        expected =[('aa', 'ccc3'), ('bb', 'dd')]
        self.assertEqual(str(res),str(expected))

        ## Drop table
        cursor.execute("drop table " + self.tableName)

        cursor.close()

########################### Testcase 24

    @classification("basic")
    def test24(self):
        """ Test binary export/import - basic minimum acceptance test """
        cursor = self.conn.cursor()
        self._dropTable(cursor)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c char(2) page loadable)")

        cursor.execute("INSERT into "+self.tableName+"(c) values('aa')")
        cursor.execute("INSERT into "+self.tableName+"(c) values('bb')")

        cursor.execute("MERGE DELTA OF " + self.tableName)

	## Test binary export/import
        tmpdir = tempfile.mkdtemp()
        params = (self.tableName, tmpdir)

        cursor.execute("export %s as binary into '%s' with replace" % params)

	cursor.execute("import %s from '%s' with replace" % params)

        cursor.execute("select  * from "+self.tableName)
        res = cursor.fetchall()

        expected =[('aa',), ('bb',)]
        self.assertEqual(str(res),str(expected))

        shutil.rmtree(tmpdir, True)

        ## Drop table
        cursor.execute("drop table " + self.tableName)

        cursor.close()

########################### Testcase 26

    @classification("basic")
    def test25(self):
        """ Test unload/load - basic minimum acceptance test """
        cursor = self.conn.cursor()
        self._dropTable(cursor)

        def getUTMemSize():
            cursor.execute("select OBJECT_SIZE from sys.m_memory_objects where type like '%UnifiedTable%'")
            return cursor.fetchone()[0]

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c char(2) page loadable)")

        cursor.execute("INSERT into "+self.tableName+"(c) values('aa')")
        cursor.execute("INSERT into "+self.tableName+"(c) values('bb')")

        cursor.execute("MERGE DELTA OF " + self.tableName)

	## Test unload/load

        preUnloadSize = getUTMemSize()
        cursor.execute("unload %s" % self.tableName)
        postUnloadSize = getUTMemSize()
        # We can't reliably measure postUnloadSize because GC may come in and reload the table
        # asynchronously.
        #self.assertTrue(postUnloadSize < preUnloadSize)
	cursor.execute("load %s all" % self.tableName)
        postLoadSize = getUTMemSize()
        # self.assertTrue(postUnloadSize < postLoadSize)

        ## Drop table
        cursor.execute("drop table " + self.tableName)

        cursor.close()

########################### Testcase 25
    @classification("basic")
    def test26(self):
        """ Test binary export/import - basic minimum acceptance test """

        self.skipTest("Bug 203178.")

        cursor = self.conn.cursor()
        self._dropTable(cursor)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c int page loadable, d int page loadable)")

        cursor.execute("INSERT into "+self.tableName+" values(1, 3)")
        cursor.execute("INSERT into "+self.tableName+" values(2, 4)")

        cursor.execute("MERGE DELTA OF " + self.tableName)

	## Test binary export/import
        # tmpdir = tempfile.mkdtemp()
        # The above seems not to work in a distributed landscape.  Following
        # code in testTextDiskLob.py and testImportExport.py.
        tmpdir = os.path.join(os.getenv('DIR_INSTANCE'), 'work', 'test26')
        if not os.path.isdir(tmpdir):
            os.makedirs(tmpdir)
        params = (self.tableName, tmpdir)

        cursor.execute("export %s as binary into '%s' with replace" % params)

	cursor.execute("import %s from '%s' with replace" % params)

        cursor.execute("select  * from "+self.tableName)
        res = cursor.fetchall()

        expected =[(1, 3), (2, 4)]
        self.assertEqual(str(res),str(expected))

        shutil.rmtree(tmpdir, True)

        ## Drop table
        cursor.execute("drop table " + self.tableName)

        cursor.close()

########################### Testcase 27
    @classification("basic")
    def test27(self):
        """ Test for bug 31136 """
        cursor = self.conn.cursor()
        self._dropTable(cursor)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (c date)")

        cursor.execute("ALTER TABLE "+self.tableName+" ALTER(c date page loadable)")

        ## Drop table
        cursor.execute("drop table " + self.tableName)

        cursor.close()

########################### Testcase 28
    @classification("basic")
    def test28(self):
        """ Test for bug 31988 """
        cursor = self.conn.cursor()
        self._dropTable(cursor)


        cursor.execute("CREATE COLUMN TABLE %s (c varchar(10) PAGE LOADABLE) WITH PARAMETERS ('AUTO_MERGE'=('OFF'))"%self.tableName)

        for i in range(23):
            cursor.execute("INSERT INTO %s VALUES ('%d')"%(self.tableName, i))
        cursor.execute("MERGE DELTA OF %s"%self.tableName)
        cursor.execute("INSERT INTO %s VALUES ('23')"%self.tableName)
        cursor.execute("MERGE DELTA OF %s"%self.tableName)

        cursor.execute("DROP TABLE %s"%self.tableName)

        cursor.close()

########################### Testcase 29

    @classification("basic")
    def test29(self):
        """ Create column table using  primary key page loadable  / No error expected """

        cursor = self.conn.cursor()
        self._dropTable(cursor)
      
        # 1) int datatype syntax 1
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A SMALLINT PRIMARY KEY PAGE LOADABLE, B  INTEGER PAGE LOADABLE)")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(1,1)")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(2,2)")
        cursor.execute("MERGE DELTA OF "+self.tableName)
        self._execSqlExpectError(cursor,"INSERT INTO "+self.tableName+" VALUES(1,2)",301)

        # drop primary key and verify
        cursor.execute("ALTER TABLE "+self.tableName+" DROP PRIMARY KEY")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(1,2)")

        self._dropTable(cursor)
        
        # 2) int datatype syntax 2
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A SMALLINT PAGE LOADABLE, B  INTEGER PAGE LOADABLE, PRIMARY KEY(a))")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(1,1)")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(2,2)")
        cursor.execute("MERGE DELTA OF "+self.tableName)
        self._execSqlExpectError(cursor,"INSERT INTO "+self.tableName+" VALUES(1,2)",301)

        # drop pk constraint by name and verify
        cursor.execute("select CONSTRAINT_NAME from CONSTRAINTS where TABLE_NAME='%s' and IS_PRIMARY_KEY='TRUE'" % self.tableName)
        results = cursor.fetchall()
        pk_name1 = results[0][0]
        cursor.execute("ALTER TABLE "+self.tableName+" DROP CONSTRAINT %s" % pk_name1)
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(1,2)")
        self._dropTable(cursor)

        # 1) string datatype syntax 1
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A VARCHAR(8) PRIMARY KEY PAGE LOADABLE, B  INTEGER PAGE LOADABLE)")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES('one',1)")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES('two',2)")
        cursor.execute("MERGE DELTA OF "+self.tableName)
        self._execSqlExpectError(cursor,"INSERT INTO "+self.tableName+" VALUES('one',2)",301)

        # drop pk constraint by name and verify
        cursor.execute("select CONSTRAINT_NAME from CONSTRAINTS where TABLE_NAME='%s' and IS_PRIMARY_KEY='TRUE'" % self.tableName)
        results = cursor.fetchall()
        pk_name2 = results[0][0]
        cursor.execute("ALTER TABLE "+self.tableName+" DROP CONSTRAINT %s" % pk_name2)
        cursor.execute("INSERT INTO "+self.tableName+" VALUES('one',2)")

        self._dropTable(cursor)
        
        # 2) string datatype syntax 2
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A VARCHAR(8) PAGE LOADABLE, B  INTEGER PAGE LOADABLE, PRIMARY KEY(a))")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES('one',1)")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES('two',2)")
        cursor.execute("MERGE DELTA OF "+self.tableName)
        self._execSqlExpectError(cursor,"INSERT INTO "+self.tableName+" VALUES('one',2)",301)

        # drop primary key and verify
        cursor.execute("ALTER TABLE "+self.tableName+" DROP PRIMARY KEY")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES('one',2)")

        self._dropTable(cursor)

        cursor.close()

###########################
#Testcases 30-33 tests various scenarios of adding a primary key on paged attribute column through alter statement

    @classification("basic")
    def test30(self):
        """ Alter add single column primary key"""

        cursor = self.conn.cursor()
        self._dropTable(cursor)

        # 1) ALTER TABLE table ALTER column primary key to PA column
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A INT PAGE LOADABLE, B VARCHAR(8) PAGE LOADABLE)")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(1,'one')")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(2,'two')")
        cursor.execute("MERGE DELTA OF "+self.tableName)

        #add primary key to A int which is page loadable
        cursor.execute("ALTER TABLE "+self.tableName+" alter (A INT PRIMARY KEY PAGE LOADABLE)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = 'A'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==81) #81 represent that primary key flag is set along with page loadable
        cursor.execute("ALTER TABLE " + self.tableName + " DROP PRIMARY KEY")
        #add primary key B string which is page loadable
        cursor.execute("ALTER TABLE "+self.tableName+" alter (B VARCHAR(8) PRIMARY KEY PAGE LOADABLE)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = 'B'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==81) #81 represent that primary key flag is set along with page loadable
        cursor.execute("ALTER TABLE " + self.tableName + " DROP PRIMARY KEY")

        #add primary key through ADD CONSTRAINT syntax
        cursor.execute("ALTER TABLE "+self.tableName+" ADD CONSTRAINT PK_"+self.tableName+" PRIMARY KEY(A)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = 'A'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==81) #81 represent that primary key flag is set along with page loadable
        cursor.execute("ALTER TABLE " + self.tableName + " DROP PRIMARY KEY")
        cursor.execute("ALTER TABLE "+self.tableName+" ADD PRIMARY KEY(B)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = 'B'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==81) #81 represent that primary key flag is set along with page loadable
        self._execSqlExpectError(cursor,"INSERT INTO "+self.tableName+" VALUES(2,'two')", 301)

        self._dropTable(cursor)

        cursor.close()

    @classification("basic")
    def test31(self):
        """ Alter add multi column primary key """

        cursor = self.conn.cursor()
        self._dropTable(cursor)

        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A INT PAGE LOADABLE, B VARCHAR(8) PAGE LOADABLE, C INT)")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(1,'one',1)")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(2,'two',2)")
        cursor.execute("MERGE DELTA OF "+self.tableName)

        #add multi-column primary key constraint, all paged
        cursor.execute("ALTER TABLE "+self.tableName+" ADD CONSTRAINT PK_"+self.tableName+" PRIMARY KEY(A,B)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = '$trexexternalkey$'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==145) #145 represent that trexexternalkey is NOT page loadable
        cursor.execute("ALTER TABLE " + self.tableName + " DROP PRIMARY KEY")
        #add multi-column primary key constraint, mixed paged and non-paged
        cursor.execute("ALTER TABLE "+self.tableName+" ADD CONSTRAINT PK_"+self.tableName+" PRIMARY KEY(A,C)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = '$trexexternalkey$'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==145) #145 represent that trexexternalkey is NOT page loadable
        self._dropTable(cursor)

        cursor.close()

    @classification("basic")
    def test32(self):
        """ Alter table ALTER PRIMARY KEY single column to paged """

        cursor = self.conn.cursor()
        self._dropTable(cursor)

        # 1) ALTER TABLE table ALTER column primary key to PA column
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A INT PRIMARY KEY, B VARCHAR(8))")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(1,'one')")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(2,'two')")
        cursor.execute("MERGE DELTA OF "+self.tableName)

        #alter A to page loadable
        cursor.execute("ALTER TABLE "+self.tableName+" alter (A INT PAGE LOADABLE)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = 'A'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==81) #81 represent that primary key flag is set along with page loadable

        #drop primary key A
        cursor.execute("ALTER TABLE "+self.tableName+" DROP PRIMARY KEY")

        #add primary key B string (alter to paged and primary key simultaneously)
        cursor.execute("ALTER TABLE "+self.tableName+" alter (B VARCHAR(8) PRIMARY KEY PAGE LOADABLE)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = 'B'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==81) #81 represent that primary key flag is set along with page loadable

        self._dropTable(cursor)

        cursor.close()

    @classification("basic")
    def test33(self):
        """ Alter table ALTER PRIMARY KEY paged single column to unpaged"""

        cursor = self.conn.cursor()
        self._dropTable(cursor)

        # 1) ALTER TABLE table ALTER column primary key to PA column
        cursor.execute("CREATE COLUMN TABLE "+self.tableName+" (A INT PRIMARY KEY page loadable, B VARCHAR(8))")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(1,'one')")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(2,'two')")
        cursor.execute("MERGE DELTA OF "+self.tableName)

        #alter A to column loadable
        cursor.execute("ALTER TABLE "+self.tableName+" alter (A INT COLUMN LOADABLE)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = 'A'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==17) #17 represent that primary key flag is set along with NOT page loadable
        waitForMetadataPostdropWithVersionGC(self.conn) # enforce metadata version collection to allow merge

        #verify
        self._execSqlExpectError(cursor, "INSERT INTO "+self.tableName+" VALUES(2,'two')", 301)
        cursor.execute("MERGE DELTA OF "+self.tableName)
        cursor.execute("select * from "+self.tableName+" where A=2")
        result = cursor.fetchall()
        #this should be generated expected results
        expected =[(2,'two')]
        self.assertEquals(str(expected), str(result))

        #drop primary key A
        cursor.execute("ALTER TABLE "+self.tableName+" DROP PRIMARY KEY")

        #add primary key B string (alter to paged and primary key simultaneously)
        cursor.execute("ALTER TABLE "+self.tableName+" alter (B VARCHAR(8) PRIMARY KEY)")

        #alter B to column loadable
        cursor.execute("ALTER TABLE "+self.tableName+" alter (B VARCHAR(8) COLUMN LOADABLE)")
        cursor.execute("select IMPLEMENTATION_FLAGS from m_cs_all_columns where TABLE_NAME = '"+self.tableName+"' and COLUMN_NAME = 'B'")
        resultset = cursor.fetchall()
        self.assertTrue(resultset[0][0]==17) #17 represent that primary key flag is set along with NOT page loadable

        #verify
        self._execSqlExpectError(cursor, "INSERT INTO "+self.tableName+" VALUES(1,'one')", 301)
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(3,'three')")
        cursor.execute("INSERT INTO "+self.tableName+" VALUES(4,'four')")
        cursor.execute("MERGE DELTA OF "+self.tableName)
        cursor.execute("select * from "+self.tableName+" where B='three'")
        result = cursor.fetchall()
        #this is expected result
        expected =[(3,'three')]

        self.assertEquals(str(expected), str(result))

        self._dropTable(cursor)

        cursor.close()


    @classification("basic")
    def testBug57638(self):
        """ Test for Bug 57638 - Delta replay > 32 PA columns """
        
        cursor = self.conn.cursor()
        self._dropTable(cursor)
        gotError = 0

        createStmt = "CREATE COLUMN TABLE " + self.tableName + " ("
        for i in range(32):
            createStmt += "c%d SMALLINT PAGE LOADABLE,"%i
        
        createStmt += "c33 SMALLINT PAGE LOADABLE)"

        cursor.execute(createStmt);

        cursor.execute("INSERT INTO " + self.tableName +
                           " VALUES(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33)")

    @classification("basic")
    def testBug92553(self):
        """ BUG 92553: Disable ading page loadable column with SYSUUID as default value."""

        cursor = self.conn.cursor()
        self.dropTable("Tab92553")
        cmd = "create column table Tab92553 (c1 int page loadable default 10, c2 varbinary(16) page loadable default SYSUUID)"
        try:
            cursor.execute(cmd)
            self.fail("'%s' should have failed due to adding page loadable column currently not supported.")
        except dbapi.Error, err:
            self.assertEquals(err[0], 7)
            self.assertTrue(err[1].find('cannot add page loadable column') >= 0)
        cursor.close()

##########################################################################
 # Utility functions
 ##########################################################################

    def _dropTable(self, cursor):
        """ drop column table with paged attribute"""
        try:
            cursor.execute("DROP TABLE "+self.tableName)
        except: pass

    def _dropTable3(self, cursor):
        """ drop column table with NO page attribute """
        try:
            cursor.execute("DROP TABLE "+self.tableName3)
        except: pass

    def _dropviewTable(self, cursor):
        """ drop view  """
        try:
            cursor.execute("DROP VIEW "+self.viewtablename)
        except: pass


    def _execSqlExpectError(self, cursor, sql, expected):

        try:
            cursor.execute(sql)
        except dbapi.Error, err:
            errorcode = err[0]
            gotError = 1
            # expect an error
            if  (errorcode != expected):
                self.fail("Unexpected error code %d" % errorcode)
        if (gotError == 0 and expected != 0):
            self.fail("Create row table using paged attribute did NOT raise an error!")

if __name__ == '__main__':
    SqlTestCase.runTest(TestPagedAttributeCreateTable)
