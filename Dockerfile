FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive
ARG DRIVER_VERSION=3.6.3
ARG MONGODB_URI

RUN apt-get update && apt-get install -y sudo \
    vim \
    nano \
    git \
    nodejs \
    npm \
    build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN export uid=1000 gid=1000 && \
    mkdir -p /home/ubuntu && mkdir /workspace && \
    echo "ubuntu:x:${uid}:${gid}:Developer,,,:/home/ubuntu:/bin/bash" >> /etc/passwd && \
    echo "ubuntu:x:${uid}:" >> /etc/group && \
    echo "ubuntu ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/ubuntu && \
    chmod 0440 /etc/sudoers.d/ubuntu && \
    chown ${uid}:${gid} -R /home/ubuntu

ENV HOME /home/ubuntu
ENV WORKSPACE /workspace
ENV DRIVER_VERSION ${DRIVER_VERSION}
ENV MONGODB_URI ${MONGODB_URI}

RUN mkdir ${HOME}/nodejs
COPY ./nodejs/getstarted.js ./nodejs/package.json ${HOME}/nodejs/

RUN chown -R ubuntu ${HOME}/ && chmod -R 750 ${HOME}/nodejs

WORKDIR ${HOME}/nodejs

RUN npm config set cache ${WORKSPACE}/nodejs/.npm --global && npm install mongodb@${DRIVER_VERSION} --save

USER ubuntu

WORKDIR ${WORKSPACE}/nodejs

ENTRYPOINT ["/bin/bash", "-c"]  