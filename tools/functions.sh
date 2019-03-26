#!/bin/bash

set_temporary_environment() {
	if [[ ! -d $1 ]]; then
		mkdir -p $1
		chmod -R 777 $1
	fi

	export TEMP=$1
	export TMP=$1
}

prepare_logs() {
	echo "Preparing data for archival."
	python /newz/tools/clean_logs.py
	chmod -R 777 "/newz/logs"
}