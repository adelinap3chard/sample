#!/usr/bin/python

from datetime import datetime, timedelta
import sys, re, codecs, shutil, os, errno, subprocess
import sqlite3, json, csv, collections 
import decimal
from decimal import Decimal
sys.path.insert(0,"/usr/sap/hdbclient")
sys.path.append("/data/adelina/QADB/scripts")
sys.path.append("/data/adelina/QADB/scripts/lib")
from hdbcli import dbapi

#===================================================
# server info
serverAddress='qadb.wdf.sap.corp'
#serverAddress='qadb-test.wdf.sap.corp'
serverPort=30015
userName='READER'
passWord='help2Read!'

#Get date/time as filename
getCurrentDateTime=str(datetime.now())
print "current date/time: ", getCurrentDateTime
folderName = re.sub(r"[ :\-]",".", getCurrentDateTime)
fileName = 'makes'
# path info
rawOutputPath = '/data/adelina/QADB/scripts/output/raw/'
liveOutputPath = '/data/adelina/QADB/scripts/output/live/'
currentOutputPath = '/data/adelina/QADB/scripts/output/current/'

#serverRoot = '/sapmnt/trextest/trex_test/nginx/i834575/QADB/'
serverRoot = '/area51/temp/nginx/i834575/'
rawDestPath = serverRoot + folderName + '/raw/'
liveDestPath = serverRoot + folderName + '/live/'
currentDestPath = serverRoot + folderName + '/current/'

#define query:
queryMakes="select to_varchar(TS) as TS, ID, LCPOOLID,  VERSION,  BUILDPFX,  IDPLATFORM,  IDQASTATUS,  IDOBJSTATUS,  CHANGELIST, LCOK, LCOK_TRANS,  HISTCOUNT,  TOOLCL,  IDTESTSET,  BUILD_PURPOSE,  IDSERVER,  ERRORS,  PROGRESS,  LCPOOL_SIZE,  SCRATCH, OWN,  USER,  PRETEST,  TYPE,  BRANCH,  TARGET,  GITHASH,  PATCHSET_REVISION,  GERRIT_NUMBER,  POOL_LOCATION, POOL_NAME,  POOL_PATH,  COMPONENT,  POOL_ROOT,  PATCH_NUMBER,  BUILD_PROFILE from TESTER.MAKES where build_purpose = 'C' and idobjstatus >= 900 and idobjstatus <= 3000 order by TS desc"

queryPlatforms="select * from TESTER.PLATFORMS"

queryObjstatus="select * from TESTER.OBJSTATUS"

#===================================================
#user define functions:
#===================================================
class Record(object):
    pass

def record_default(obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    return obj.__dict__

def genData(cursor):
    header = [column[0] for column in cursor.description]
    data = [row for row in cursor.fetchall()]
    return header, data

def genCSV(outputFileName, header, data):
    with open(outputFileName, mode='wb') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(header)
        writer.writerows(data)
        
def genJSON(outputFileName, header, data):
    objects_list = []
    num_fields = len(header)
    for row in data:
        d = Record()
        for n in range(num_fields):
            #d.field_names[n] = row[n]
            setattr(d,header[n],row[n])
        objects_list.append(d)

    j = json.dumps(objects_list,default=record_default)
    #print j
    with codecs.open(outputFileName, mode='w') as f:
        if f != None:
            f.write(j)
    
def genXML(outputFileName, header, data):
    with codecs.open(outputFileName,encoding='utf-8', mode='w') as f:
        f.write('<?xml version="1.0" encoding="utf-8"?>\n')
        num_fields = len(header)
        f.write("<makes>")
        for row in data:
            f.write("<Row>")
            for n in range(num_fields):
                f.write("<" + header[n] + ">")
                f.write(str(row[n]))
                f.write("</" + header[n] + ">")

            f.write("</Row>")
        f.write("</makes>")

def quote_str(in_str): 
    if in_str == None:
        return "NULL"
    in_str = str(in_str)

    if len(in_str) == 0: 
        return "''" 
    if len(in_str) == 1: 
        if in_str == "'": 
            return "''''" 
        else: 
            return "'%s'" % in_str 
    if in_str[0] != "'" or in_str[-1:] != "'": 
        return "'%s'" % in_str.replace("'", "''") 
    return in_str 

def quote_list(l): 
    return [quote_str(x) for x in l]

def quote_list_as_str(l): 
    return ",".join(quote_list(l))

def genSqlite(dbName, header, data):
    dbIsNew = not os.path.exists(dbName)
    sqliteConn = sqlite3.connect(dbName)
    #print dbIsNew
    if dbIsNew:
        print "New database created successfully."
    else:
        print "Database exists. Will remove and re-create"
        sqliteConn.close()
        os.remove(dbName)

        sqliteConn = sqlite3.connect(dbName)
        if dbIsNew == False:
            print "Database re-created successfully."
        else:
            print "Database exists."

    #create table
    table_name = "makes"
    createTableStr = "CREATE TABLE MAKES (TS LONGDATE,ID INTEGER DEFAULT 2147483647 NOT NULL,LCPOOLID CHAR(24), VERSION CHAR(4) NOT NULL, BUILDPFX CHAR(3) NOT NULL, IDPLATFORM INTEGER NOT NULL, IDQASTATUS INTEGER  NOT NULL, IDOBJSTATUS INTEGER DEFAULT 0, CHANGELIST CHAR(6) NOT NULL, LCOK TINYINT, LCOK_TRANS TINYINT, HISTCOUNT INTEGER DEFAULT 0, TOOLCL CHAR(7), IDTESTSET DECIMAL(10,0) DEFAULT 1, BUILD_PURPOSE CHAR(1) DEFAULT 'A', IDSERVER INTEGER, ERRORS INTEGER, PROGRESS DECIMAL(3,0) DEFAULT -1, LCPOOL_SIZE INTEGER, SCRATCH CHAR(1) DEFAULT '0', OWN VARCHAR(50), USER CHAR(12), PRETEST SMALLINT DEFAULT 0, TYPE CHAR(1), BRANCH CHAR(40), TARGET VARCHAR(100), GITHASH CHAR(40), PATCHSET_REVISION CHAR(45), GERRIT_NUMBER INTEGER, POOL_LOCATION VARCHAR(256) DEFAULT 'wdf', POOL_NAME VARCHAR(256) DEFAULT '', POOL_PATH VARCHAR(256) DEFAULT '',  COMPONENT VARCHAR(256) DEFAULT 'Engine',  POOL_ROOT VARCHAR(256) DEFAULT '', PATCH_NUMBER CHAR(2) DEFAULT '00', BUILD_PROFILE VARCHAR(128) DEFAULT '', PRIMARY KEY (ID))"

    #field_names = [i[0] for i in header]  
    #print header
    #colstr = ",".join(header) 
    try: 
        sqliteConn.execute("drop table %s;" % table_name) 
    except: 
        pass
    #sqliteConn.execute("create table %s (%s);" % (table_name, colstr)) 
    sqliteConn.execute(createTableStr)

    #insert data
    for l in data:
        sql = "insert into %s values (%s);" % (table_name, quote_list_as_str(l))
        sqliteConn.execute(sql) 
    sqliteConn.commit()

    #close sqlite db connection
    sqliteConn.close()

def getLinuxDirectory(directory):
    directory_map = {'\\\\write.filer-hanabuilds.sap.corp\\builds': '/sapmnt/production2/makeresults/HANA-write', '\\\\production2\\': '/sapmnt/production2/','\\\\production2.wdf.sap.corp\\':'/sapmnt/production2/','\\\\production.wdf.sap.corp\\':'/sapmnt/production/', '\\\\production\\':'/sapmnt/production/'}

    for x in directory_map.keys():
        if directory.startswith(x):
            return directory.replace(x, directory_map[x]).replace('\\','/')
    return directory

def filterLiveData(header, data):
    count = 0 
    poolPath = header.index('POOL_PATH')
    poolRoot = header.index('POOL_ROOT')
    rows = [ row for row in data if row[poolPath] != '' and row[poolRoot] != '' ]
    result = []

    empty = len(data)-len(rows)
    print "Total row count for RAW data: ", len(data)
    nonNull = len(data) - empty
    print "Total row count for non-NULL path: ", nonNull 

    for row in rows:
        path = getLinuxDirectory(os.path.join(row[poolRoot], row[poolPath]))
        #print path 
        #path = os.path.join(row[poolRoot], row[poolPath])
        if os.path.exists(path) and os.access(path, os.R_OK):
            result.append(row)
        else:
            count = count + 1
    print "Total row count for valid path: ", len(result) 
    return result

def filterCurrentData(header, data):
    today=datetime.now()
    print today
    deltaDate = today - timedelta(hours=24)
    print deltaDate
    TS = header.index('TS')
    poolPath = header.index('POOL_PATH')
    poolRoot = header.index('POOL_ROOT')
    #rows = [ row for row in data if row[TS] <= getCurrentDateTime and row[TS] >= deltaDateTime]
    result = []
    for row in data:
        #d, t = row[TS].split(" ")
        ts = datetime.strptime(row[TS][:-1], "%Y-%m-%d %H:%M:%S.%f")
        if ts <= today and ts > deltaDate:
	#if ts == today :
            path = getLinuxDirectory(os.path.join(row[poolRoot], row[poolPath]))
            #path = row[poolRoot] + '/' + row[poolPath]
            #print path
            result.append(path)
    print "Total row count for lastBuild: ", len(result)
    return result


def genSqlitePlatforms(dbName, header, data):
    dbIsNew = not os.path.exists(dbName)
    sqliteConn = sqlite3.connect(dbName)
    #print dbIsNew
    if dbIsNew:
        print "New database created successfully."
    else:
        print "Database exists. Will add platforms to existing DB"

    #create table
    table_name = "platforms"
    createTableStr = "CREATE TABLE PLATFORMS (ID INTEGER NOT NULL, DESCTEXT CHAR(20), PERLTEXT CHAR(8), READTEXT CHAR(30), OSNAME CHAR(12), OSVERSION CHAR(12), DISTRIBNAME CHAR(20), BITS CHAR(3) DEFAULT '64 ', BINPATH VARCHAR(200), TCPPORT INTEGER, PRIMARY KEY (ID))"

    try:
        sqliteConn.execute("drop table %s;" % table_name)
    except:
        pass
    #sqliteConn.execute("create table %s (%s);" % (table_name, colstr))
    sqliteConn.execute(createTableStr)

    #insert data
    for l in data:
        sql = "insert into %s values (%s);" % (table_name, quote_list_as_str(l))
        sqliteConn.execute(sql)
    sqliteConn.commit()

    #close sqlite db connection
    sqliteConn.close()

def genSqliteObjstatus(dbName, header, data):
    dbIsNew = not os.path.exists(dbName)
    sqliteConn = sqlite3.connect(dbName)
    #print dbIsNew
    if dbIsNew:
        print "New database created successfully."
    else:
        print "Database exists. Will add OBJSTATUS to existing DB"

    #create table
    table_name = "objstatus"
    createTableStr = "CREATE TABLE OBJSTATUS (ID INTEGER  NOT NULL, DESCTEXT VARCHAR(120), PRIMARY KEY (ID))"

    try:
        sqliteConn.execute("drop table %s;" % table_name)
    except:
        pass
    #sqliteConn.execute("create table %s (%s);" % (table_name, colstr))
    sqliteConn.execute(createTableStr)

    #insert data
    for l in data:
        sql = "insert into %s values (%s);" % (table_name, quote_list_as_str(l))
        sqliteConn.execute(sql)
    sqliteConn.commit()

    #close sqlite db connection
    sqliteConn.close()
    
def genPath():
    path2Create = [rawDestPath, liveDestPath, currentDestPath]
    for i in path2Create:
        try:
            os.makedirs(i, 0755);
        except OSError as e:
            if exc.errno == errno. EEXIST and os.path.isdir(path):
                pass
            else: raise

def copyFile2Server():
    shutil.copy2(rawOutputPath + fileName + '.csv',rawDestPath + fileName + '.csv')
    shutil.copy2(liveOutputPath + fileName + '.csv',liveDestPath + fileName + '.csv')

    shutil.copy2(rawOutputPath + fileName + '.js',rawDestPath + fileName + '.js')
    shutil.copy2(liveOutputPath + fileName + '.js',liveDestPath + fileName + '.js')

    shutil.copy2(rawOutputPath + fileName + '.xml',rawDestPath + fileName + '.xml')
    shutil.copy2(liveOutputPath + fileName + '.xml',liveDestPath + fileName + '.xml')

    shutil.copy2(rawOutputPath + fileName + '.db',rawDestPath + fileName + '.db')
    shutil.copy2(liveOutputPath + fileName + '.db',liveDestPath + fileName + '.db')

    shutil.copy2(currentOutputPath + fileName +'.txt', currentDestPath + fileName +'.txt')
    #check if file copied
    fileList = [rawDestPath + fileName + '.csv', liveDestPath + fileName + '.csv', rawDestPath + fileName + '.js', liveDestPath + fileName + '.js',rawDestPath + fileName + '.db',liveDestPath + fileName + '.db',rawDestPath + fileName + '.xml',liveDestPath + fileName + '.xml']
    for file in fileList:
        try:
            os.path.isfile(file) and os.access(file, os.R_OK)
            print "file copied: ", file
            #os.chmod(file,0777)
        except OSError as e:
            print "Failed to copy: ",file

    #genrate symbolic link to latest 
    #print serverRoot + folderName
    #print serverRoot +'latest'
    cmd = 'ln -fns '+ serverRoot + folderName + ' ' + serverRoot +'latest'
    os.system(cmd)

#===================================================
#main
#===================================================
if __name__ == '__main__':
    conn=dbapi.connect(serverAddress,serverPort,userName,passWord)
    checkDBrnt=conn.isconnected()
    print "DB connection rnt: ",checkDBrnt
    cursor=conn.cursor()
    #cursor.execute(query,[str(selectDate)])
    cursor.execute(queryMakes)
    headerMakes,dataMakes = genData(cursor)
    cursor.execute(queryPlatforms)
    headerPlatforms,dataPlatforms = genData(cursor)
    cursor.execute(queryObjstatus)
    headerObjstatus,dataObjstatus = genData(cursor) 
    cursor.close()
    conn.close()

    #call function to generate raw output files
    print "++++++++++++raw output++++++++++++++"
    outputFileName = rawOutputPath + fileName + '.csv'
    genCSV(outputFileName,headerMakes, dataMakes)

    outputFileName = rawOutputPath + fileName + '.js'
    genJSON(outputFileName,headerMakes, dataMakes)

    outputFileName = rawOutputPath + fileName + '.xml'
    genXML(outputFileName,headerMakes, dataMakes)

    dbName = rawOutputPath + fileName +'.db'
    genSqlite(dbName, headerMakes, dataMakes)
    
    #call filter data to generate live data and output to files
    liveData = filterLiveData(headerMakes, dataMakes)
    print "++++++++++++live output+++++++++++++++"

    outputFileName = liveOutputPath + fileName + '.csv'
    genCSV(outputFileName, headerMakes, liveData)

    outputFileName = liveOutputPath + fileName + '.js'
    genJSON(outputFileName,headerMakes, liveData)

    outputFileName = liveOutputPath + fileName + '.xml'
    genXML(outputFileName,headerMakes, liveData)

    dbName = liveOutputPath + fileName +'.db'
    genSqlite(dbName, headerMakes, liveData)

    #add 2 more tables to sqlite db
    print "++++++++++++adding tables+++++++++++++++"
    dbName = rawOutputPath + fileName +'.db'
    genSqlitePlatforms(dbName, headerPlatforms, dataPlatforms)
    dbName = rawOutputPath + fileName +'.db'
    genSqliteObjstatus(dbName, headerObjstatus, dataObjstatus)

    dbName = liveOutputPath + fileName +'.db'
    genSqlitePlatforms(dbName, headerPlatforms, dataPlatforms)
    dbName = liveOutputPath + fileName +'.db'
    genSqliteObjstatus(dbName, headerObjstatus, dataObjstatus)

    #call filter data to generate current data and output to txt file
    print "+++++++++++++current output++++++++++++++"
    path = filterCurrentData(headerMakes, liveData)
    path.sort()
    with open(currentOutputPath + fileName +'.txt', 'wb') as writeFile:
        for item in path:
             writeFile.write("%s\n" % item)
        writeFile.close()

    #create folder tree
    genPath()

    #copy output file to webserver
    copyFile2Server()










