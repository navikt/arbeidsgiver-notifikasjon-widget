FROM navikt/node-express:16

WORKDIR /usr/src/app
COPY . .

USER root
RUN npm ci
USER apprunner

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
