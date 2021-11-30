FROM navikt/node-express:12.2.0-alpine

WORKDIR /usr/src/app
COPY proxy-server/ .

RUN npm ci

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "node --experimental-modules server.js"]
