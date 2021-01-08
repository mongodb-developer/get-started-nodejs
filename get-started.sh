#!/bin/bash
MONGODB_URI=${1}
if [ -z ${MONGODB_URI} ]
then
    read -p "MONGODB URI (Required): " MONGODB_URI
fi 

DRIVER_VERSION=${2:-3.6.3}
echo "Executing ... "
docker run --rm -e MONGODB_URI=${MONGODB_URI} \
    -v "$(pwd)":/workspace \
    -w /workspace/nodejs start-nodejs \
    "npm config set cache /workspace/nodejs/.npm; \
    npm install mongodb@${DRIVER_VERSION} --save; \
    nodejs ./getstarted.js"