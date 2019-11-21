# Get-Started Node.JS

Repository to help getting started with MongoDB Node.JS driver connecting to MongoDB Atlas.

## Information

This Get-Started project uses [MongoDB Node.JS driver](https://mongodb.github.io/node-mongodb-native/) version 3.3 by default. Although you can change the driver version, the provided code example was only tested against the default version of MongoDB driver. There is no guarantee that the code sample will work for all possible versions of the driver.

## Pre-requisites 

### Docker 

Have Docker running on your machine. You can download and install from: https://docs.docker.com/install/

### MongoDB Atlas

In order to execute the code example, you need to specify `MONGODB_URI` environment variable to connect to a MongoDB cluster. If you don't have any you can create one by signing up [MongoDB Atlas Free-tier M0](https://docs.atlas.mongodb.com/getting-started/). 

## Build Steps 

1. Build Docker image with a tag name. Within this directory execute: 
   * To use the default driver version and specify `MONGODB_URI`:
      ```
      docker build . -t start-nodejs --build-arg MONGODB_URI="mongodb+srv://usr:pwd@example.mongodb.net/dbname?retryWrites=true"
      ```
   * To use a different driver version and specify `MONGODB_URI`. For example:
      ```
      docker build . -t start-nodejs --build-arg DRIVER_VERSION=3.1 --build-arg MONGODB_URI="mongodb+srv://usr:pwd@example.mongodb.net/dbname?retryWrites=true"
      ```
   This will build a docker image with a tag name `start-nodejs`. 
   As a result of the build, the example code is compiled for the specified driver version and ready to be executed.

2. Run the Docker image by executing:
   ```
   docker run --tty --interactive --hostname nodejs start-nodejs
   ```

   The command above will run a `start-nodejs` tagged Docker image. Sets the hostname as `nodejs`. 

## Execution Steps

1. Run the code example by following below steps:
   * `cd ~/nodejs`
   * `nodejs getstarted.js`

### Change driver version from within the Docker environment

You can change the driver version with `npm`. For example to change the driver version to v3.2.1 use the following: 

```sh 
cd ~/nodejs
npm install mongodb@3.2.1 --save
```

From within the docker environment, you can also change the `MONGODB_URI` by changing the environment variable: 

```sh
export MONGODB_URI="mongodb+srv://usr:pwd@new.mongodb.net/dbname?retryWrites=true"
```

## Tutorials

* [Quickstart Node.JS and MongoDB: How to Connect](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database)
* [MongoDB Node.JS driver: Getting Started](https://mongodb.github.io/node-mongodb-native/3.3/)


## About 

This project is part of the MongoDB Get-Started code examples. Please see [get-started-readme](https://github.com/mongodb-developer/get-started-readme) for more information. 


