FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY *.js* ./

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]