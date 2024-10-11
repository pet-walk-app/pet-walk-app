#!/bin/sh

docker-compose -f "../../compose.yaml" exec backend sh -c "./mvnw clean install"
