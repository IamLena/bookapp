service php7.3-fpm start
service nginx start
service mysql start
mysql < /createdb/createdb.sql
mysql < /createdb/bookappdb_users.sql
sleep 10000
