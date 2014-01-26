#!/usr/bin/env bash

MONGO_CMD="/usr/bin/mongo"
DB="team342-site"
DATA_FILES=("awards.json" "mentors.json" "schedule.json" "students.json" "subteams.json")

for data_file in "${DATA_FILES[@]}"
do
	echo "Loading data: ${data_file}"
	"${MONGO_CMD}" "${DB}" < "${data_file}"
done
