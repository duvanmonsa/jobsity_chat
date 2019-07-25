FROM node:10.15.3-alpine
RUN apk add --no-cache --virtual .gyp python make g++
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 5000 9229
CMD [ "node", "bin/www" ]