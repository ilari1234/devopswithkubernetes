#!/usr/bin/env bash
set -e

URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DATABASE"


if [ $URL ]; then
  TIMESTAMP=$(date +"%Y%m%d%H%M%S")
  pg_dump -v $URL > /usr/src/app/backup.sql

  gcloud auth activate-service-account --key-file="/etc/secret-volume/dwk-bucket-credentials.json" --project=$GKE_PROJECT
  gcloud storage cp /usr/src/app/backup.sql gs://$DWK_BUCKET/backup_$TIMESTAMP.sql
fi