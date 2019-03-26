SID=DB1
SAPMNT=/hana/shared
INSTALL_DIRECTORY=/newz/install/__installer.HDB

cat /newz/tools/passwords.xml | ${INSTALL_DIRECTORY}/hdblcm --component_dirs=${INSTALL_DIRECTORY}/server --components=all --hdbinst_server_import_content=off -b -s ${SID} --read_password_from_stdin=xml --sapmnt=${SAPMNT} --ignore=check_platform
if [[ $? -ne 0 ]]; then
	echo "HANA installation failed."
	exit 1
fi

# Parallelize the installation of test packages.
declare -a WAIT_PIDS
/newz/install/test/tests/installTestPkg.sh -s ${SID} /newz/install/test/tests/testpack.tgz &
WAIT_PIDS[0]=$!

/newz/install/test/python_support_internal/installTestPkg.sh -s ${SID} /newz/install/test/python_support_internal/python_support_internal.tgz &
WAIT_PIDS[1]=$!

/newz/install/test/tests_gmock/installTestPkg.sh -s ${SID} /newz/install/test/tests_gmock/testgmockpack.tgz &
WAIT_PIDS[2]=$!

INSTALL_FAILURES=0
for WAIT_PID in ${WAIT_PIDS[*]}; do
	wait $WAIT_PID
	if [[ $? -ne 0 ]]; then
		echo "Test package installation encountered an error."
		exit 1
	fi
done
