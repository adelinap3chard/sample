#!/bin/bash

# Move into the instance directory.
cd ~/../HDB00/

# Setup environment variables.
source ./hdbenv.sh

# Run the augment script.
echo "Running hdbsql command."
hdbsql -i 00 -u SYSTEM -p manager -m -t -T "/newz/logs/augment/sqldbc.trc.log" -f -j -I "/newz/augment.sql"