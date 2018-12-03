FROM ubuntu:xenial

RUN apt-get update -y
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN rm -r node_modules
WORKDIR /usr/src/app

EXPOSE 3000
EXPOSE 9229

CMD ["npm", "start"]


