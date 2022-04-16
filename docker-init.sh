#!/bin/bash

declare containerId
declare -i op=0

until [ $op -eq 3 ]
	do
	echo "--------------MENU----------------"
	echo "----------------------------------"
	echo "1-Up database && Up databaseAdmin"
	echo "2-Down database && Down databaseAdmin"
	echo "3-Exit"
	read -p "Insert a option: " op
	echo
	case $op in
		1) 
				echo "Up the postgres db"
				docker-compose up -d postgres
				echo "Up the db manager"
				docker-compose up -d pgadmin
				echo "Watch the process running"
				docker-compose ps
				containerId=$(docker ps | grep postgres | cut -f1 -d " ")
				echo "Info about database: "
				docker inspect $containerId | grep -w "IPAddress" | tail -1
				docker inspect $containerId | grep -w "POSTGRES_USER" 
				docker inspect $containerId | grep -w "POSTGRES_PASSWORD"
				docker inspect $containerId | grep -w "POSTGRES_DB"
				;;
		2)
				docker-compose down
				;;
		3)	echo "Bye"
				;;
		*)	echo "Error"
				;;
	esac
done

