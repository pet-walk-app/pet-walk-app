#!/bin/bash

./scripts/create-env.sh

docker-compose -f "../compose.yaml" up "$@"