#!/bin/bash
sid=DD1
aUser=dd1adm
aPassword=Sybase123
sPassword=manager

echo "hostname: " $hostname
echo "domain: " $domain
fullhost=$hostname"."$domain
echo "fullhost name: " $fullhost

echo "=============================================================="
echo "start DPagent"
su - dp_user -c "/usr/sap/dataprovagent/bin/dpagent_service.sh start"
echo "start dp rntcode: "$?

echo "=============================================================="
echo "Installing HANA"
echo "=============================================================="
#echo "exacting HANA installer"
#/usr/sap/SAPCAR -xvf /remote/eiminfra1/hanainfra_im/dropzone/weekstone/HANA/1_0/SP12/Rev122_11/CW29/SAP_HANA_DATABASE_linux.sar -R /usr/sap/

/remote/eiminfra1/hanainfra_im/dropzone/weekstone/HANA/1_0/SP12/Rev122_11/CW29/__installer.HDB/hdbinst --batch --sid=$sid --number=00 --password=$aPassword --system_user_password=$sPassword --sapmnt=/hana/shared --ignore=check_hardware --hostname=$hostname
echo "install hana rntcode: "$?

#echo "add a line to permission file"
echo "alter SYSTEM alter CONFIGURATION ('daemon.ini', 'HOST', '$hostname') SET ('dpserver', 'instances')='1' WITH reconfigure;" >> /usr/sap/permissions.sql

echo "=============================================================="
echo "Deploying DU"
su - dd1adm -c "hdbsql -n $fullhost -i 00 -u SYSTEM -p manager  -I /usr/sap/permissions.sql"
echo $?

su - dd1adm -c "hdbuserstore SET webide $fullhost:30015 SYSTEM manager"
echo $?

su - dd1adm -c "regi import /usr/sap/HANA_IDE_CORE.tgz --key=webide --verbose"
echo $?

echo "=============================================================="
echo "Clean up"
echo "=============================================================="
#rm -rf /usr/sap/__installer.HDB
#rm -rf installer.DPAgent-1.3.13-SNAPSHOT-linuxx64.tgz

echo "=============================================================="
echo " error checking"
echo "=============================================================="
ps -ef | grep dpagent
ps -ef | grep $aUser

#while [ 1 ]
        #do
        #sleep 60 &
        #wait
#done