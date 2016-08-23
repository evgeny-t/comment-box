FROM node:4.5

ADD package.json /app/package.json
ADD app.js /app/app.js
ADD auth.js /app/auth.js
ADD db.js /app/db.js

ADD client.min.js /app/src/client.min.js
ADD index.html /app/src/index.html

npm install /app

WORKDIR /app/

CMD ["npm"]
