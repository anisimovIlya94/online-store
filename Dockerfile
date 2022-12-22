FROM node:14 as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm i --legacy-peer-deps

RUN npm i bootstrap@5.1.0 --legacy-peer-deps

COPY client /app/client

FROM node:16-alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install

RUN npm install bcrypt

COPY server /app

COPY --from=client /app/client/build /app/client

EXPOSE 8080

CMD [ "npm", "start" ]