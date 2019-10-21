FROM ubuntu:18.04

ARG DRIVER_VERSION=3.3.0
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
    mkdir -p /home/ubuntu && \
    echo "ubuntu:x:${uid}:${gid}:Developer,,,:/home/ubuntu:/bin/bash" >> /etc/passwd && \
    echo "ubuntu:x:${uid}:" >> /etc/group && \
    echo "ubuntu ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/ubuntu && \
    chmod 0440 /etc/sudoers.d/ubuntu && \
    chown ${uid}:${gid} -R /home/ubuntu

ENV HOME /home/ubuntu
ENV DRIVER_VERSION ${DRIVER_VERSION}
ENV MONGODB_URI=${MONGODB_URI}


RUN mkdir ${HOME}/nodejs
COPY ./nodejs/quickstart.js ./nodejs/package.json ${HOME}/nodejs/

RUN chown -R ubuntu ${HOME}/nodejs && chmod -R 750 ${HOME}/nodejs

USER ubuntu
WORKDIR ${HOME}
RUN npm install mongodb@${DRIVER_VERSION} --save

CMD ["/bin/bash"]  