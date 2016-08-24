FROM node:4.5

WORKDIR /app/

ADD package.json /app/package.json
ADD app.js /app/app.js
ADD auth.js /app/auth.js
ADD db.js /app/db.js

ADD ./src/client.min.js /app/src/client.min.js
ADD ./src/index.html /app/src/index.html

RUN npm install

CMD ["npm", "start"]
