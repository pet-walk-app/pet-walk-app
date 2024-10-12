#!/bin/bash
SCRIPT_DIR="$(command dirname -- "${0}")"

$SCRIPT_DIR/scripts/create-env.sh
docker-compose -f "${SCRIPT_DIR}/../compose.yaml" up "$@"