#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0" )" && cd .. && pwd )"
SUCCESS='\033[1;36m'
WARN='\033[1;33m'
ERR='\033[1;31m'
NC='\033[0m'

cd $BASE_DIR/
if [[ -f $BASE_DIR/build.zip ]]; then
    echo -e "${WARN}WARN: build.zip exists, removing old copy${NC}"
    rm $BASE_DIR/build.zip
fi
if [[ -f $BASE_DIR/src.zip ]]; then
    echo -e "${WARN}WARN: src.zip exists, removing old copy${NC}"
    rm $BASE_DIR/src.zip
fi

cd $BASE_DIR/build/ && zip -r ../build.zip *
RC_BUILD=$?
if [[ $RC_BUILD -eq 0 ]]; then
    echo -e "${SUCCESS}Successfully zipped build artifacts to $BASE_DIR/build.zip!${NC}"
else
    echo -e "${ERR}ERR: Could not zip build artifacts.${NC}"
    echo -e "Exit code: ${ERR}$RC_BUILD${NC}"
    exit $RC_BUILD
fi

cd $BASE_DIR && zip -r src.zip \
    CONTRIBUTING.md \
    LICENSE.txt \
    README.md \
    config \
    package.json \
    public \
    scripts \
    src \
    tsconfig.json \
    yarn.lock
RC_SRC=$?
if [[ $RC_SRC -eq 0 ]]; then
    echo -e "${SUCCESS}Successfully zipped source code to $BASE_DIR/build.zip!${NC}"
else
    echo -e "${ERR}ERR: Could not zip source code.${NC}"
    echo -e "Exit code: ${ERR}$RC_SRC${NC}"
    exit $RC_SRC
fi
