FROM node:4.5

WORKDIR /app/

ADD package.json /app/package.json
RUN npm install
RUN npm run build

ADD app.js /app/app.js
ADD auth.js /app/auth.js
ADD db.js /app/db.js

ADD ./src/client.min.js /app/src/client.min.js
ADD ./src/index.html /app/src/index.html

CMD ["/app/node_modules/.bin/pm2", "start", "app.js", "--no-daemon"]
