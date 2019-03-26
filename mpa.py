import ConfigParser, sys, os, json, time
import getopt, textwrap
from pprint import pprint 
import httplib, urllib
sys.path.append("/data/RestfulAPI_cmd/scripts")
sys.path.append("/data/RestfulAPI_cmd/scripts/lib")

defaultConfig = 'config.ini'
seleniumConfig = 'config.properties'
################################################################

def sendRequest(conn, url):
    conn.request("GET", url)
    resp = conn.getresponse()
    print resp.status, resp.reason
    respString = resp.read()
    #print respString
    data = json.loads(respString)
    if (data.get('errorInfo') != None):
        print data['errorInfo']
        sys.exit(1)
    return data

def deleteImage(conn,imageName, user):
    deleteUrl = '/docker/delete?' +  urllib.urlencode({'name': imageName, 'username': user})
    print deleteUrl
    data = sendRequest(conn, deleteUrl)    

def createImage(conn, params, waitTime):
    createUrl = '/docker/create?' + params
    print 'DEBUG: '+ createUrl
    createData = sendRequest(conn, createUrl)
    connectionInfo=(createData['service']['metadata']['name'])
    print 'DEBUG: ' + connectionInfo
    imageName=connectionInfo
    
    time.sleep(waitTime)
    #check for status
    statusUrl = '/docker/status_check?' +  urllib.urlencode({'name': connectionInfo, 'username': userName})
    print 'DEBUG: '+ statusUrl
    statusData = sendRequest(conn, statusUrl)
    if (statusData.get('status') == 'active'):
        connectionInfo = statusData['connection_info']
    elif (statusData.get('err_info') != ''):
        print 'DEBUG: ' + statusData['err_info']
	print "ERROR: failed to create image will clean up: " + imageName
        deleteUrl = '/docker/delete?' +  urllib.urlencode({'name': imageName, 'username': userName})
        print 'DEBUG: ' + deleteUrl
        #data = sendRequest(conn, deleteUrl)
        sys.exit(1)
    
    #get connection info
    infoUrl = '/docker/connection_info?' +  urllib.urlencode({'name': imageName, 'username': userName})
    print 'DEBUG: ' + infoUrl
    data = sendRequest(conn, infoUrl)
     
    print "DEBUG: image created - " + imageName
    return (data,imageName)
    
def readConfig(path):
    config = ConfigParser.ConfigParser()
    config.read(path + '/' + defaultConfig)  
    sections = config.sections()
    imageType = config.get('INFO', 'imageType')
    deleteMode = config.get('INFO', 'deleteMode')
    dpImageName = config.get('INFO', 'dpImageName')
    hanaImageName = config.get('INFO','hanaImageName')
    userName = config.get('INFO', 'userName')
    hanaPath = config.get('HANA', 'installPath')
    testPackPath = config.get('HANA', 'testPackPath')
    dpagentPath = config.get('DPAGENT', 'installPath')
    hanaVersion = config.get('HANA','hanaVersion')

    return(imageType,deleteMode, dpImageName, hanaImageName,userName,hanaPath,testPackPath,dpagentPath,hanaVersion)

def writeProperties(path, data, imageType,imageName):

    print "default config file: " + defaultConfig
    print "selenium config file: " + seleniumConfig
    #get values fron connection info
    hostName= data['connection_info']['Host_IP']

    if (imageType == 'dpagent'):
        dPort=data['connection_info']['Ports_Mapping']['sdilisten']
    else:
        webIdePort = data['connection_info']['Ports_Mapping']['hanawebide']
        hanaPort = data['connection_info']['Ports_Mapping']['listen']

    config = ConfigParser.ConfigParser()
    config.read(path + '/' + defaultConfig)
    
    #write to config.ini file
    if (imageType == 'dpagent'):
        config.set('INFO','dpImageName',str(imageName))
        config.set('DPAGENT','dpagentHost',str(hostName))
	config.set('DPAGENT','dpagentPort',str(dPort))
    else:
        config.set('INFO','hanaImageName',str(imageName))
        config.set('HANA','hanaHost',str(hostName))
        config.set('HANA','hanaPort',str(hanaPort))
        config.set('HANA','webide',str('http://' + str(hostName) + ':' + str(webIdePort) + '/sap/hana'))

    configFile = open (path + '/'+ defaultConfig, 'w')
    config.write(configFile)
    configFile.close()

    #write to config.properties file for selenium only 		
    with open(path + '/' + seleniumConfig) as f:
        lines = list(line for line in f)
        length = len(lines)
        dict = {}
        for index, line in enumerate(lines, start = 0):   # default is zero
            tokens = lines[index].split('=')
            if (len(tokens) == 2):
                dict[tokens[0]] = index #keep track of index

        if (imageType == 'dpagent'):
	    lines[dict['host.name']] = 'host.name=' + str(hostName) + '\n'
            lines[dict['port']]= 'port=' + str(dPort) + '\n'
	else:
            lines[dict['APP.url']] = 'APP.url=http://' + str(hostName) + ':' + str(webIdePort) + '/sap/hana' + '\n'
            lines[dict['ahanasource.host.name']] = 'ahanasource.host.name=' + str(hostName) +'\n'
	    lines[dict['ahanasource.port.number']] = 'ahanasource.port.number=' + str(hanaPort) + '\n'
            lines[dict['bhanasource.host.name']] = 'bhanasource.host.name=' + str(hostName) +'\n'
            lines[dict['bhanasource.port.number']] = 'bhanasource.port.number=' + str(hanaPort) + '\n'
            lines[dict['remotesrc.version']] = 'remotesrc.version=' + str(hanaVersion) + '\n'
            lines[dict['hana.version']] = 'hana.version=' + str(hanaVersion) + '\n'
    with open (path + '/' + seleniumConfig, "w") as fp:
        fp.write(''.join(lines))
		
##################################################################            
if __name__ == '__main__':
    #read commandline arguments, first
    fullCmdArguments = sys.argv

    # - further arguments
    argumentList = fullCmdArguments[1:]
    #print argumentList

    unixOptions = "ho"
    gnuOptions = ["help","output="]

    try:
        arguments, values = getopt.getopt(argumentList, unixOptions, gnuOptions)
    except getopt.error as err:
        # output error, and return with an error code
        print (str(err))
        sys.exit(2)
    
	# evaluate given options
    for currentArgument, currentValue in arguments:
        if currentArgument in ("-h", "--help"):
            print textwrap.dedent("""\

            avaiable options are:
                -t --type: type of image ie.. dpagent or suse12-sp1-hana
                -p --path: path to image installation file
                -u --url: url to image installation file
                -x --xpath: path to test pack installation file
            """)

        elif currentArgument in ("-o", "--output"):
            outputPath = (currentValue)

    conn = httplib.HTTPSConnection("mo-9e4485ae5.mo.sap.corp", 5000)

    temp = readConfig(outputPath)
    imageType = temp[0]
    deleteMode = temp[1]
    dpImageName = temp[2]
    hanaImageName = temp[3]
    userName = temp[4]
    hanaPath = temp[5]
    testPackPath = temp[6]
    dpagentPath = temp[7]
    hanaVersion = temp[8]

    print("image type: " + imageType)
    print('DEBUG : ' + imageType,deleteMode, dpImageName, hanaImageName,userName,hanaPath,testPackPath,dpagentPath,hanaVersion)
	
    if (deleteMode == 'yes'):
        if (dpImageName == '' or hanaImageName == ''):
           print 'WARNING: no image name found in config file - Tool will ignore delete request'
	else:
            if (dpImageName != ''):
	        deleteImage(conn,dpImageName,userName)
            if (hanaImageName != ''):
                deleteImage(conn,hanaImageName,userName)
		
    if (imageType == 'dpagent'):
        print "DEBUG: image mode dpagent"
        if ( dpagentPath == '' or userName == ''):
            print 'ERROR: dpagent path/username is empty. Tool will abort'
            sys.exit(1)
        else:
            createParams = urllib.urlencode({'type': imageType, 'url': dpagentPath, 'username': userName})
            waitTime = 5 * 60
            temp = createImage(conn, createParams, waitTime)
            data = temp[0]
            imageName = temp[1]
            writeProperties(outputPath, data, imageType,imageName)
	        
			
    elif (imageType == 'hana-dpagent'):
        print "DEBUG: image mode  hana-dpagent "
        if (hanaPath == '' or dpagentPath == '' or testPackPath == '' or userName == ''):
            print 'ERROR: hana/dpagentpath/username is empty. Tool will abort'
            sys.exit(1)
        else:
            createHanaParams = urllib.urlencode({'type': 'suse12-sp1-hana-quick', 'path': hanaPath, 'testPackagePath': testPackPath, 'username': userName})
            waitTime = 17 * 60
            temp = createImage(conn, createHanaParams, waitTime)
            data = temp[0]
            imageName = temp[1]
            writeProperties(outputPath, data, imageType,imageName)
			
	    createAgentParams = urllib.urlencode({'type': 'dpagent', 'url': dpagentPath, 'username': userName})
            waitTime = 5 * 60
            temp = createImage(conn, createAgentParams, waitTime)
            data = temp[0]
            imageName = temp[1]
            writeProperties(outputPath, data, 'dpagent',imageName)

    else:
	print "DEBUG: image mode HANA "
        if (imageType == '' or hanaPath == None or testPackPath == None or userName == None):
            print 'ERROR: hana/testpackpath/username is empty. Tool will abort'
            sys.exit(1)
        else:
            createParams = urllib.urlencode({'type': imageType, 'path': hanaPath, 'testPackagePath': testPackPath, 'username': userName})
            waitTime = 17 * 60
            temp = createImage(conn, createParams, waitTime)
            data = temp[0]
            imageName = temp[1]
	    writeProperties(outputPath, data, imageType,imageName)

    conn.close()
    sys.exit(0)


