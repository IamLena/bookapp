FROM mysql:5.7

# All scripts in docker-entrypoint-initdb.d/ are automatically executed during container startup
COPY ./*.sql /docker-entrypoint-initdb.d/
