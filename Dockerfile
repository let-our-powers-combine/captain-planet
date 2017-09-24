FROM node:8-slim

COPY . /home
COPY package.json /home/package.json
COPY .env.example /home/.env.example

WORKDIR /home

ENV NODE_ENV production
RUN npm install --production

CMD ["npm","start"]

EXPOSE 8888
