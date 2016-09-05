# COMMENT BOX #

A toy app aiming to learn React. It allows you to sign in using your Google id, create a topic, leave a comment in any of them. [Demo](http://commentbox.cf).

### Prerequisites ###

In order to run this, make sure you have following things installed:

* Docker  
* Node.js v6.5  
* Docker Compose [optional]  


### How do I get set up? ###

```
npm install -D

export GOOGLE_CONSUMER_KEY=<client id>
export GOOGLE_CONSUMER_SECRET=<client secrect>

./start-mongo
```

and finally 

```
npm start
```

or 

```
npm run dev
```

or

```
docker-compose up
```
