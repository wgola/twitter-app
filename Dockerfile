FROM node:21.6.0-alpine3.19 AS builder

WORKDIR /client
COPY client/package.json .
RUN npm i
COPY client/ .
RUN npm run build

FROM node:21.6.0-alpine3.19
WORKDIR /app
COPY server/package.json .
RUN npm i
COPY server/ .
COPY --from=builder /client/dist/ /app/src/views/
EXPOSE 8080

ENTRYPOINT [ "npm", "run", "prod" ]