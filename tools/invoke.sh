echo "Test URL: ${BUILD_URL}"
ACTUAL_HANA_INSTALLATION_PATH=$(readlink -e -n "${HANA_INSTALLATION_PATH}")
if [[ -z "${ACTUAL_HANA_INSTALLATION_PATH}" ]]; then
	echo "Failed to resolve HANA Installation path."
	exit 1
fi
echo "Resolved HANA Installation Path: ${ACTUAL_HANA_INSTALLATION_PATH}"

IMAGE_ID=$(docker build --quiet https://github.wdf.sap.corp/newz/docker-base-image.git)
echo "Image ID: ${IMAGE_ID}"

(cd /area51/external_components)
(cd "${HANA_INSTALLATION_PATH}")

if [[ ! -z "${AUGMENT_SQL_PATH}" && ! -f "${AUGMENT_SQL_PATH}" ]]; then
	echo "The augment SQL script provided (${AUGMENT_SQL_PATH}) is not a file."
	exit 1
fi

if [[ ! -z "${AUGMENT_SHELL_PATH}" && ! -f "${AUGMENT_SHELL_PATH}" ]]; then
	echo "The augment shell script provided (${AUGMENT_SHELL_PATH}) is not a file."
	exit 1
fi

if [[ -z "${NAGINATOR_COUNT}" ]]; then
	RETRY_PROFILE=0
else
	RETRY_PROFILE=1
fi

declare CONTAINER_ID

if [[ ! -z "${AUGMENT_SQL_PATH}" && ! -z "${AUGMENT_SHELL_PATH}" ]]; then
	CONTAINER_ID=$(docker create --rm --tty --privileged --init --env TEST_PROFILE=$TEST_PROFILE --env RETRY_PROFILE=$RETRY_PROFILE -v "$AUGMENT_SHELL_PATH":/newz/augment.sh -v "$AUGMENT_SQL_PATH":/newz/augment.sql -v "$ACTUAL_HANA_INSTALLATION_PATH":/newz/install -v /area57:/area51 -v /area57:/area57 -v /area51/external_components:/newz/external_components -v /area57/newz/mini/tools:/newz/tools -v "$LOG_PATH":/newz/logs $IMAGE_ID /newz/tools/bootstrap.sh)
elif [[ ! -z "${AUGMENT_SQL_PATH}" && -z "${AUGMENT_SHELL_PATH}" ]]; then
	CONTAINER_ID=$(docker create --rm --tty --privileged --init --env TEST_PROFILE=$TEST_PROFILE --env RETRY_PROFILE=$RETRY_PROFILE -v "$AUGMENT_SQL_PATH":/newz/augment.sql -v "$ACTUAL_HANA_INSTALLATION_PATH":/newz/install -v /area57:/area51 -v /area57:/area57 -v /area51/external_components:/newz/external_components -v /area57/newz/mini/tools:/newz/tools -v "$LOG_PATH":/newz/logs $IMAGE_ID /newz/tools/bootstrap.sh)
elif [[ -z "${AUGMENT_SQL_PATH}" && ! -z "${AUGMENT_SHELL_PATH}" ]]; then
	CONTAINER_ID=$(docker create --rm --tty --privileged --init --env TEST_PROFILE=$TEST_PROFILE --env RETRY_PROFILE=$RETRY_PROFILE -v "$AUGMENT_SHELL_PATH":/newz/augment.sh -v "$ACTUAL_HANA_INSTALLATION_PATH":/newz/install -v /area57:/area51 -v /area57:/area57 -v /area51/external_components:/newz/external_components -v /area57/newz/mini/tools:/newz/tools -v "$LOG_PATH":/newz/logs $IMAGE_ID /newz/tools/bootstrap.sh)
else
	CONTAINER_ID=$(docker create --rm --tty --privileged --init --env TEST_PROFILE=$TEST_PROFILE --env RETRY_PROFILE=$RETRY_PROFILE -v "$ACTUAL_HANA_INSTALLATION_PATH":/newz/install -v /area57:/area51 -v /area57:/area57 -v /area51/external_components:/newz/external_components -v /area57/newz/mini/tools:/newz/tools -v "$LOG_PATH":/newz/logs $IMAGE_ID /newz/tools/bootstrap.sh)
fi

echo "Container ID: ${CONTAINER_ID}"
docker start --attach $CONTAINER_ID