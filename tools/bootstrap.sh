#!/bin/bash

source /newz/tools/functions.sh

trap prepare_logs EXIT

echo "Target Test Profile: ${TEST_PROFILE}"

# Do the installation.
echo "Performing HANA installation."
set_temporary_environment "/newz/logs/install"
/newz/tools/install.sh
if [[ $? -ne 0 ]]; then
	exit 1
fi

export AUGMENT_HANA_SID="DB1"
export AUGMENT_HANA_INSTANCE_NUMBER="00"
export AUGMENT_HANA_ADM_USER="db1adm"
export AUGMENT_HANA_ENV="/testenv.sh"

# Check if there is an augment to the installation.
if [[ -e "/newz/augment.sh" ]]; then
	echo "Executing augment shell script."
	echo "Augment shell script contents:"
	sudo -E cat "/newz/augment.sh"

	touch "$AUGMENT_HANA_ENV"
	chmod 777 "$AUGMENT_HANA_ENV"

	set_temporary_environment "/newz/logs/augment_install"
	sudo -E /newz/augment.sh | tee "/newz/logs/augment_install/run.log"
	if [[ $? -ne 0 ]]; then
		echo "Augment shell script returned a non-zero exit code."
		exit 1
	fi
else
	echo "No augment shell script detected."
fi

# Check if there is an augment to the running HANA server.
if [[ -e "/newz/augment.sql" ]]; then
	echo "Executing augment SQL script."
	echo "Augment SQL script contents:"
	sudo -E -u db1adm cat /newz/augment.sql

	set_temporary_environment "/newz/logs/augment_profile"
	sudo -E -u db1adm /newz/tools/run_augment.sh | tee "/newz/logs/augment_profile/run.log"
	if [[ $? -ne 0 ]]; then
		echo "Augment SQL script returned a non-zero exit code."
		exit 1
	fi
else
	echo "No augment SQL script detected."
fi

# Then run the test.
echo "Running test profile ${TEST_PROFILE}."
set_temporary_environment "/newz/logs/test"
sudo -E -u db1adm /newz/tools/run_test.sh
RUN_TEST_EC=$?

# Package the trace and tmp directories.
tar -zcf /newz/logs/test/trace.tar.gz -C /usr/sap/DB1/HDB00/$(hostname)/ trace
tar -zcf /newz/logs/test/tmp.tar.gz -C / tmp
tar -zxf /newz/logs/test/trace.tar.gz -C /newz/logs/test/
tar -zxf /newz/logs/test/tmp.tar.gz -C /newz/logs/test/
chmod -R 777 "/newz/logs"

# Done.
echo "Done."
exit $RUN_TEST_EC