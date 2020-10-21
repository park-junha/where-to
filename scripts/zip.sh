#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0" )" && cd .. && pwd )"
SUCCESS='\033[1;36m'
ERR='\033[1;31m'
NC='\033[0m'

zip -r $BASE_DIR/build.zip $BASE_DIR/build
RC_BUILD=$?
if [[ $RC_BUILD -eq 0 ]]; then
    echo -e "${SUCCESS}Successfully zipped build artifacts to $BASE_DIR/build.zip!${NC}"
else
    echo -e "${ERR}ERR: Could not zip build artifacts.${NC}"
    echo -e "Exit code: ${ERR}$RC_BUILD${NC}"
    exit $RC_BUILD
fi

zip -r $BASE_DIR/src.zip \
    $BASE_DIR/CONTRIBUTING.md \
    $BASE_DIR/LICENSE.txt \
    $BASE_DIR/README.md \
    $BASE_DIR/config \
    $BASE_DIR/package.json \
    $BASE_DIR/public \
    $BASE_DIR/scripts \
    $BASE_DIR/src \
    $BASE_DIR/tsconfig.json \
    $BASE_DIR/yarn.lock
RC_SRC=$?
if [[ $RC_SRC -eq 0 ]]; then
    echo -e "${SUCCESS}Successfully zipped source code to $BASE_DIR/build.zip!${NC}"
else
    echo -e "${ERR}ERR: Could not zip source code.${NC}"
    echo -e "Exit code: ${ERR}$RC_SRC${NC}"
    exit $RC_SRC
fi
