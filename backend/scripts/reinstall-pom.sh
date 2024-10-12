#!/bin/sh
SCRIPT_DIR="$(command dirname -- "${0}")"

docker-compose -f "${SCRIPT_DIR}/../../compose.yaml" exec backend sh -c "./mvnw clean install"