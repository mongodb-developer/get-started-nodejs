#!/bin/bash
MONGODB_URI=${1}
DOCKER_IMAGE=ghcr.io/mongodb-developer/get-started-nodejs:latest

if [ -z ${MONGODB_URI} ]
then
    read -p "MONGODB URI (Required): " MONGODB_URI
fi

if ! [ -z ${2} ]
then
    COMMAND=${COMMAND}"npm install mongodb@${2} --save;"
fi
COMMAND=${COMMAND}"node ./getstarted.js"

HOME=/workspace
echo "Executing ... "${COMMAND}
docker run --rm -e MONGODB_URI=${MONGODB_URI} \
    -v "$(pwd)":${HOME} \
    -w ${HOME}/nodejs ${DOCKER_IMAGE} \
    "${COMMAND}"