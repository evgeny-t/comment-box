FROM node:6.4

WORKDIR /app/

ADD package.json /app/package.json
RUN npm install -D

ADD webpack.config.js /app/webpack.config.js
ADD src /app/src

ENV NODE_ENV production
RUN npm run build
RUN rm -rf /app/src/js && rm -rf /app/node_modules

RUN npm install

ADD app.js /app/app.js
ADD auth.js /app/auth.js
ADD db.js /app/db.js

ADD ./src/client.min.js /app/src/client.min.js
ADD ./src/index.html /app/src/index.html
ADD ./src/favicon.ico /app/src/favicon.ico

CMD ["/app/node_modules/.bin/pm2", "start", "app.js", "--no-daemon"]
