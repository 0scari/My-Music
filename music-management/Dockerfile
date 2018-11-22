FROM mongo:4.1

RUN apt-get update -y
RUN apt-get install -y git
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

RUN mkdir -p /usr/src
WORKDIR /usr/src
RUN git clone https://github.com/Pozdnako/340CT_CW-music-management.git
WORKDIR /usr/src/340CT_CW-music-management

RUN npm install

EXPOSE $PORT 3000
CMD [ "npm", "start" ]
