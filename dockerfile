FROM node:12.18.2-slim

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD [ "npm","run","dev:server" ]
