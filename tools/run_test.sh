#!/bin/bash

# Resolve the path of the test profile.
cd /newz/install/test/profiles/
TEST_PROFILE_PATH=$(readlink -n -e "${TEST_PROFILE}")

# Check that the resolved path exists.
if [[ ! -e "${TEST_PROFILE_PATH}" ]]; then
	echo "Unable to resolve path for test profile: ${TEST_PROFILE}"
	exit 1
fi

# Move into the instance directory.
cd ~/../HDB00/

# Setup environment variables.
source ./hdbenv.sh

if [[ -e "$AUGMENT_HANA_ENV" ]]; then
	echo "Detected custom environment configuration."
	source "$AUGMENT_HANA_ENV"
fi

# Move to the testscripts folder.
cd exe/testscripts/

# Run the test.
python /newz/tools/execute_profile.py ${TEST_PROFILE_PATH}

# Exit with the previous exit code.
exit $?