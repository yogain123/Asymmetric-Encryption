# Docker command run line by line from top to bottom
# RUN lets you execute commands inside of your Docker image. ... 
# CMD lets you define a default command to run when your container starts. 
# You could say that CMD is a Docker run-time operation, meaning it's not something that gets executed at build time.
# It happens when you run an image

FROM node:alpine

WORKDIR /usr/nodeapp

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["node", "index.js"]
