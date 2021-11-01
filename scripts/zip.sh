#!/bin/bash
REPO_ROOT_DIR="$(cd "$(dirname "$0" )" && cd .. && pwd )"
TARGET_DIR=$REPO_ROOT_DIR/artifacts
SUCCESS='\033[1;36m'
WARN='\033[1;33m'
ERR='\033[1;31m'
NC='\033[0m'

cd $REPO_ROOT_DIR/

if [[ ! -d $TARGET_DIR ]]; then
    echo -e "${WARN}WARN: $TARGET_DIR does not exist, creating directory${NC}"
    mkdir $TARGET_DIR
fi

cd $TARGET_DIR/
if [[ -f $TARGET_DIR/build.zip ]]; then
    echo -e "${WARN}WARN: build.zip exists, removing old copy${NC}"
    rm $TARGET_DIR/build.zip
fi
if [[ -f $TARGET_DIR/src.zip ]]; then
    echo -e "${WARN}WARN: src.zip exists, removing old copy${NC}"
    rm $TARGET_DIR/src.zip
fi

cd $REPO_ROOT_DIR/build/ && zip -r $TARGET_DIR/build.zip *
RC_BUILD=$?
if [[ $RC_BUILD -eq 0 ]]; then
    echo -e "${SUCCESS}Successfully zipped build artifacts to $TARGET_DIR/build.zip!${NC}"
else
    echo -e "${ERR}ERR: Could not zip build artifacts.${NC}"
    echo -e "Exit code: ${ERR}$RC_BUILD${NC}"
    exit $RC_BUILD
fi

cd $REPO_ROOT_DIR/ && zip -r $TARGET_DIR/src.zip \
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
    echo -e "${SUCCESS}Successfully zipped source code to $TARGET_DIR/src.zip!${NC}"
else
    echo -e "${ERR}ERR: Could not zip source code.${NC}"
    echo -e "Exit code: ${ERR}$RC_SRC${NC}"
    exit $RC_SRC
fi
