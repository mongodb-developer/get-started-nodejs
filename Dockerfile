FROM alpine:3.15

LABEL org.opencontainers.image.source=https://github.com/mongodb-developer/get-started-nodejs

ENV DRIVER_VERSION 4.5.0
ENV HOME /home/gsuser
ENV SPACE /workspace

RUN apk add --no-cache nodejs npm
RUN addgroup -S gsgroup && adduser -S gsuser -G gsgroup && \
    chown -R gsuser ${HOME} && chmod -R 750 ${HOME} && \
    mkdir ${SPACE} && chown -R gsuser ${SPACE} && chmod -R 750 ${SPACE}

COPY ./nodejs/package.json ${SPACE}/
RUN cd ${SPACE} && \
    npm config set cache ${SPACE}/.npm --global && \
    npm install mongodb@${DRIVER_VERSION} --save

USER gsuser

ENTRYPOINT ["/bin/sh", "-c"]