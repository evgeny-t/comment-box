FROM node:4.5

WORKDIR /app/
ENV NODE_ENV production

ADD package.json /app/package.json
RUN npm install

ADD webpack.config.js /app/webpack.config.js

RUN npm run build

ADD app.js /app/app.js
ADD auth.js /app/auth.js
ADD db.js /app/db.js

ADD ./src/client.min.js /app/src/client.min.js
ADD ./src/index.html /app/src/index.html
ADD ./src/favicon.ico /app/src/favicon.ico

CMD ["/app/node_modules/.bin/pm2", "start", "app.js", "--no-daemon"]
