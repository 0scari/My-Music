FROM mongo:4.1

RUN apt-get update -y
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
