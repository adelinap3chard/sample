#!/bin/bash

logFile=docker_$hanaVer_$(date +%Y-%m-%d_%H-%M-%S)
touch $logPath/$logFile

log () {
   echo "bootstrap_log_$(date +%T): $*" >&2 >> $logPath/$logFile
}

log "creating new host file"
log "=============================================================="
cp /etc/hosts /usr/sap/.
sed -i -e 's/^127.0.0.1/#127.0.0.1/' /usr/sap/hosts
echo $ip $hostname.$domain $hostname localhost >> /usr/sap/hosts
cp /usr/sap/hosts /etc/.
cat /usr/sap/hosts >> $logPath/$logFile

containerID=`hostname -s`

log "reading ENV"
log "=============================================================="
log "container id: "$containerID
log "sid: $uSID"
log "hostname: $hostname"
log "domain: $domain"
log "ip: $ip"
log "logPath: $logPath"
log "sapcar: $sapcarPath"
log "hana version: $hanaVer"
log "hana installer: $hanaInstaller"
log "hanaDrop: $hanaDropPath"
log "instance: $instance"
log "hanadb port: 3$instance15"
log "Hana port1: $port8"
log "Hana port2: $port4"
log "uSID: $uSID"
log "lSID: $lSID"
log "dp user: $dUser"
log "sid user: $aUser"

log "=============================================================="
log "set vars" 
fullhost=$hostname"."$domain

log "=============================================================="
log "start DPagent"
su - $dUser -c "/usr/sap/dataprovagent/bin/dpagent_service.sh start"
log "start dp rntcode: "$?

log "=============================================================="
log "Installing HANA"
log "=============================================================="
if [ -d $hanaDropPath"__installer.HDB" ]; then
	hanaInstCmd=$hanaDropPath"__installer.HDB/hdbinst --batch --sid=$uSID --number=$instance --password=$aPassword --system_user_password=$sPassword --sapmnt=/hana/shared --ignore=check_hardware --hostname=$hostname"
else	
	log "extracting hana installer"
	$sapcarPath -xvf $hanaDropPath$hanaInstaller -R /usr/sap >&2 >> $logPath/$logFile
	hanaInstCmd="/usr/sap/__installer.HDB/hdbinst --batch --sid=$uSID --number=$instance --password=$aPassword --system_user_password=$sPassword --sapmnt=/hana/shared --ignore=check_hardware --hostname=$hostname"
fi 

log "Install cmd: $hanaInstCmd"
$hanaInstCmd >&2 >> $logPath/$logFile
log "install hana rntcode: $?"

log "=============================================================="
if [ $hanaVer = '12' ]; then
	log "generating permission file - 12"
	echo "alter SYSTEM alter CONFIGURATION ('xsengine.ini','SYSTEM') set ('scheduler','enabled')='true' with reconfigure;" >> /usr/sap/permissions.sql
	echo "alter SYSTEM alter CONFIGURATION ('daemon.ini','SYSTEM') SET ('scriptserver','instances')='1' with reconfigure;" >> /usr/sap/permissions.sql
	echo "alter SYSTEM alter CONFIGURATION ('daemon.ini', 'SYSTEM') SET ('dpserver', 'instances')='1' with reconfigure;" >> /usr/sap/permissions.sql
	echo "alter SYSTEM alter CONFIGURATION ('daemon.ini', 'HOST', '$hostname') SET ('dpserver', 'instances')='1' WITH reconfigure;" >> /usr/sap/permissions.sql
	echo "call GRANT_ACTIVATED_ROLE('sap.hana.ide.roles::Developer', 'SYSTEM');" >> /usr/sap/permissions.sql
	echo "call GRANT_ACTIVATED_ROLE('sap.hana.xs.ide.roles::Developer', 'SYSTEM');" >> /usr/sap/permissions.sql
	echo "call GRANT_ACTIVATED_ROLE('sap.hana.xs.lm.roles::Developer', 'SYSTEM');" >> /usr/sap/permissions.sql	
	cat /usr/sap/permissions.sql >> $logPath/$logFile
	
	chmod 777 -R /usr/sap/*.sql
	
	#perCmd="su - $aUser -c \"hdbsql -n $fullhost -i $instance -u SYSTEM -p manager  -I /usr/sap/permissions.sql\""
	#log $perCmd
	su - $aUser -c "hdbsql -n $fullhost -i $instance -u SYSTEM -p manager  -I /usr/sap/permissions.sql" >&2 >> $logPath/$logFile
	log "importing permission file rntcode: $?"
fi

if [ $hanaVer != '12' ]; then
	log "generating permission file - 12"
	echo "ALTER SYSTEM ALTER CONFIGURATION ('xsengine.ini', 'database', '$uSID') SET ('public_urls', 'http_url') = 'http://$lSID.$fullhost:$port8' WITH RECONFIGURE;" >> /usr/sap/permissions.sql
	echo "ALTER SYSTEM ALTER CONFIGURATION ('xsengine.ini', 'database', '$uSID') SET ('public_urls', 'https_url') = 'https://$lSID.$fullhost$port4' WITH RECONFIGURE;" >> /usr/sap/permissions.sql
	echo "ALTER DATABASE $uSID ADD 'dpserver';" >> /usr/sap/permissions.sql
	echo "alter SYSTEM alter CONFIGURATION ('xsengine.ini','SYSTEM') set ('scheduler','enabled')='true' with reconfigure;" >> /usr/sap/permissions.sql
	cat /usr/sap/permissions.sql >> $logPath/$logFile
	
	log "generating tenant file for hana2.0"
	echo "call GRANT_ACTIVATED_ROLE('sap.hana.ide.roles::Developer', 'SYSTEM');" >> /usr/sap/tenant.sql
	echo "call GRANT_ACTIVATED_ROLE('sap.hana.xs.ide.roles::Developer', 'SYSTEM');" >> /usr/sap/tenant.sql
	echo "call GRANT_ACTIVATED_ROLE('sap.hana.xs.lm.roles::Developer', 'SYSTEM');" >> /usr/sap/tenant.sql
	cat /usr/sap/tenant.sql >> $logPath/$logFile
	
	chmod 777 -R /usr/sap/*.sql
	
	log "Deploying DU"
	#perCmd="su - $aUser -c \"hdbsql -n $fullhost -i $instance -u SYSTEM -p manager -d systemdb -I /usr/sap/permissions.sql\"" 
	#log "$perCmd" 
	su - $aUser -c "hdbsql -n $fullhost -i $instance -u SYSTEM -p manager -d systemdb -I /usr/sap/permissions.sql" >&2 >> $logPath/$logFile
	log "importing permission file rntcode: $?"

	#tenantCmd="su - $aUser -c \"hdbsql -n $fullhost -i $instance -u SYSTEM -p manager -d $uSID -I /usr/sap/tenant.sql\""
	#log "$tenantCmd"
	su - $aUser -c "hdbsql -n $fullhost -i $instance -u SYSTEM -p manager -d $uSID -I /usr/sap/tenant.sql" >&2 >> $logPath/$logFile
	log "importing tenant file rntcode: $?"
	
fi

log "=============================================================="
hanaInstPort="3"$instance"15"
#hdbStoreCmd="su - $aUser -c \"hdbuserstore SET webide $fullhost:$hanaInstPort SYSTEM manager\"" 
#log "$hdbStoreCmd"
su - $aUser -c "hdbuserstore SET webide $fullhost:$hanaInstPort SYSTEM manager" >&2 >> $logPath/$logFile
log "hdbuserStore rntcode: $?"

#regiCmd="su - $aUser -c \"regi import /usr/sap/HANA_IDE_CORE.tgz --key=webide --verbose\""
#log "$regiCmd"
su - $aUser -c "regi import /usr/sap/HANA_IDE_CORE.tgz --key=webide --verbose" >&2 >> $logPath/$logFile
log "import WebIDE DU rntcode: $?" 

log "=============================================================="
log "generating ini file"
log "=============================================================="
if [ $hanaVer = '12' ]; then
	rm -rf $iniPath/hana1sp12
else
	rm -rf $iniPath/hana20
fi 

echo "containerID="$containerID >> $iniPath/$hanaFullVer
echo "host="$hostname >> $iniPath/$hanaFullVer
echo "instance=$instance" >> $iniPath/$hanaFullVer
echo "SID=$uSID" >> $iniPath/$hanaFullVer
echo "port1=$port8" >> $iniPath/$hanaFullVer
echo "port2=$port4" >> $iniPath/$hanaFullVer
echo "sysPassword=$sPassword" >> $iniPath/$hanaFullVer
echo "admPassword=$aPassword" >> $iniPath/$hanaFullVer
echo "fullhost="$fullhost >> $iniPath/$hanaFullVer
echo "URL=http://$fullhost:$port8" >> $iniPath/$hanaFullVer

cat $iniPath/$hanaFullVer >> $logPath/$logFile
chmod 777 -R $iniPath/*

log "=============================================================="
log "Clean up"
log "=============================================================="
#rm -rf /usr/sap/__installer.HDB >&2 >> $logPath/$logFile
#rm -rf installer.DPAgent-1.3.13-SNAPSHOT-linuxx64.tgz >&2 >> $logPath/$logFile

log "=============================================================="
log " error checking"
log "=============================================================="
ps -ef | grep dpagent >&2 >> $logPath/$logFile
ps -ef | grep $lSID >&2 >> $logPath/$logFile

sleep infinity
