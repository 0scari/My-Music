FROM mongo:4.1

RUN apt-get update -y
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN rm -r node_modules
WORKDIR /usr/src/app

#COPY ../docker_mm_nm/ ./node_modules
#RUN npm install

EXPOSE 3000
EXPOSE 9229

CMD [ "npm", "start" ]
