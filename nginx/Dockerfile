FROM nginx
RUN mkdir /home/static
COPY index.html /home/static/
COPY img.png /home/static/
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout /etc/ssl/private/localhost.key \
	-out /etc/ssl/certs/localhost.crt \
	-subj "/C=RU/ST=Moscow/L=Moscow/O=42/OU=21/CN=localhost"
RUN apt-get update && apt-get install -y nginx-extras
COPY nginx.conf /etc/nginx/nginx.conf
