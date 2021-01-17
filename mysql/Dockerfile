FROM mysql

ENV MYSQL_DATABASE bookappdb
ENV MYSQL_ROOT_PASSWORD root

COPY init_db.sql /docker-entrypoint-initdb.d/
