'use strict';

const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
app.use(bodyParser.json());

require('./auth');

// TODO(ET): pm2

app.get('/api/topics', function (req, res) {
  res.json({ topics });
});

app.get('/api/comments', function (req, res) {
  res.json({ comments });
});

app.post('/api/topics', function (req, res) {
  const topic = _.merge(
    _.pick(req.body, ['author', 'title', 'avatar']), {
      id: _(topics).map('id').max() + 1,
      timestamp: moment().format()
    });
  topics.push(topic);
  
  res.json({topic});
});

app.post('/api/comments', function (req, res) {
  let comment = _.pick(req.body, 
    ['topic','parent','author','text','avatar']);
  comment = _.merge(comment, {
    id: _(comments).map('id').max() + 1,
    timestamp: moment().format()
  })
  comments.push(comment);

  res.json({comment});
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


const topics = [
  {
    id: 3,
    author: 'user1',
    title: 'qqqqqqqqqqqqqqReact and JSX today',
    avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
    timestamp: moment().subtract(4, 'days').format()
  },
  {
    id: 1,
    author: 'user1',
    title: 'React and JSX today',
    avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
    timestamp: moment().format(),
  },
  {
    id: 2,
    author: 'user2',
    title: 'Flux integration',
    avatar: 'https://lh3.googleusercontent.com/-V2oIlDbOAnI/AAAAAAAAAAI/AAAAAAAAlnI/rMf6W0edyD4/s60-p-rw-no/photo.jpg',
    timestamp: moment().subtract(3, 'days').format()
  },
  {
    id: 4,
    author: 'user2',
    title: 'Flux integration=======================',
    avatar: 'https://lh3.googleusercontent.com/-V2oIlDbOAnI/AAAAAAAAAAI/AAAAAAAAlnI/rMf6W0edyD4/s60-p-rw-no/photo.jpg',
    timestamp: moment().subtract(5, 'days').format()
  },
];

const comments = [
  {
    topic: 3,
    id: 5,
    parent: 2,
    author: 'user1',
    text: '',
    avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
    timestamp: moment().format(),
    temp: true
  },
  {
    topic: 3,
    id: 1,
    parent: null,
    author: 'user1',
    text: 'Alright, our whole app is in React now. Here\'s what I did plus some react tricks along the way.',
    avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
    timestamp: moment().subtract(7, 'days').format()
  },
  {
    topic: 3,
    id: 2,
    parent: null,
    author: 'user2',
    text: 'Waiting for flux integration.﻿',
    avatar: 'https://lh3.googleusercontent.com/-V2oIlDbOAnI/AAAAAAAAAAI/AAAAAAAAlnI/rMf6W0edyD4/s60-p-rw-no/photo.jpg',
    timestamp: moment().subtract(3, 'days').format()
  },
  {
    topic: 3,
    id: 3,
    parent: 2,
    author: 'user2',
    text: 'or something...﻿',
    avatar: 'https://lh3.googleusercontent.com/-V2oIlDbOAnI/AAAAAAAAAAI/AAAAAAAAlnI/rMf6W0edyD4/s60-p-rw-no/photo.jpg',
    timestamp: moment().subtract(1, 'days').format()
  },
  {
    topic: 3,
    id: 4,
    parent: 3,
    author: 'user1',
    text: 'What happens when someone in a group of math nerds throws in a crazy idea? They start crunching numbers.',
    avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
    timestamp: moment().format()
  },
];