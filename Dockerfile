FROM mhart/alpine-node:16.4.2
RUN apk update
RUN apk add socat
COPY run.js util.js /opt/app/
WORKDIR /opt/app
ENTRYPOINT ["node"]
CMD ["run.js"]
