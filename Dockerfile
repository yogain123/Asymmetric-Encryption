## Docker command run line by line from top to bottom
FROM node:alpine

WORKDIR /usr/nodeapp

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["node", "index.js"]