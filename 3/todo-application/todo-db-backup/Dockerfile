FROM google/cloud-sdk:496.0.0-alpine

RUN apk --no-cache add postgresql-client

WORKDIR /usr/src/app

COPY . .

RUN chmod +x /usr/src/app/backup.sh

CMD ["/usr/src/app/backup.sh"]