#!/bin/sh

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo
echo -e "${YELLOW}Changes detected: running maven compile${NC}"
echo

if ./mvnw compile > /dev/null 2>&1; then
    echo
    echo -e "${GREEN}Maven compilation finished - SUCCESS${NC}"
    echo
else
    echo
    echo -e "${RED}Maven compilation finished - FAILURE${NC}"
    echo
    echo -e "${RED}Error output:${NC}"
    ./mvnw compile
fi