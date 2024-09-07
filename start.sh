#!/bin/bash

DEFAULT_ENV_FILE_CONTENT="DATABASE_LOGIN=locallogin
DATABASE_PASS=localpass
DATABASE_ROOT_PASS=rootpass"

if [ ! -f ".env" ]; then
  echo ".env file not found. Creating a default .env file..."
  echo "$DEFAULT_ENV_FILE_CONTENT" > .env
  echo "Default .env file created with the following content:"
  cat .env
fi

export $(grep -v '^#' .env | xargs)

if [[ -z "$DATABASE_ROOT_PASS" || -z "$DATABASE_LOGIN" || -z "$DATABASE_PASS" ]]; then
  echo "Error: Required environment variables are not set."
  echo "Please set DATABASE_ROOT_PASS, DATABASE_LOGIN, and DATABASE_PASS before running this script."
  exit 1
fi

docker-compose up