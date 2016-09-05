'use strict';

const fs = require('fs');

const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const ssePusher = require('sse-pusher');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(express.static('src/public/'));

require('./auth')(app);
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

function ensureApiCallIsAuthorized(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

console.log(process.env.NODE_ENV);

const pushers = {};
pushers.topics = ssePusher();
pushers.comments = ssePusher();

app.use(pushers.topics.handler('/sse/topics'));
app.use(pushers.comments.handler('/sse/comments'));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/api/topics', function (req, res) {
  db.Topic.find()
    .exec((err, topics) => {
      if (err) {
        console.error(err);
        res.json(err);
      } else {
        db.Comment.aggregate([
          {
            $match: {
              deleted: null
            }
          },
          {
            $group: {
              _id: { topic: '$topic' },
              count: { $sum: 1 }
            }
          }
        ]).exec().then(result => {
          return _.reduce(result,
            (prev, cur) => {
              prev[cur._id.topic] = cur.count;
              return prev;
            }, {});
        })
        .then(counts => {
          topics = topics.map(
            topic => _.extend({}, topic.toJSON(), { count: counts[topic.id] }));
          res.json({ topics });
        })
        .catch(err => {
          console.error(err);
          res.json(err);
        });
      }
    });
});

app.get('/api/topics/:id/comments', function (req, res) {
  db.Comment
    .find({ topic: req.params.id })
    .exec((err, comments) => {
      if (err) {
        console.error(err);
        res.json(err);
      } else {
        res.json({ comments });
      }
    });
});

app.get('/api/me', ensureApiCallIsAuthorized, function (req, res) {
  res.json(req.user);
});

app.post('/api/topics', ensureApiCallIsAuthorized, function (req, res) {
  const topic = {
    title: req.body.title,
    authorId: req.user.id,
    author: req.user.displayName,
    avatar: req.user.photos[0].value,
    timestamp: moment().format()
  };
  
  db.Topic.create(topic, (err, topic) => {
    if (err) {
      console.error(err);
      res.json(err);
    } else {
      setTimeout(() => pushers.topics({}), 0);
      res.json({topic});
    }
  });
});

app.post('/api/comments', ensureApiCallIsAuthorized, function (req, res) {
  let comment = _.pick(req.body, 
    ['topic', 'parent', 'text']);
  
  comment = _.merge(comment, {
    authorId: req.user.id,
    author: req.user.displayName,
    avatar: req.user.photos[0].value,
    timestamp: moment().format()
  });

  db.Comment.create(comment, (err, comment) => {
    if (err) {
      console.error(err);
      res.json(err);
    } else {
      setTimeout(() => pushers.topics({}), 0);
      setTimeout(() => pushers.comments(comment.topic, { id: req.user.id }), 0);
      
      res.json({ comment: comment.toJSON() });
    }
  });
});

app.delete('/api/comments/:id', ensureApiCallIsAuthorized, function (req, res) {
  db.Comment
    .findOneAndUpdate({
      _id: db.mongoose.Types.ObjectId(req.params.id),
      authorId: req.user.id,
    }, {
      deleted: new Date()
    })
    .exec((error, comment, result) => {
      if (error || !comment) {
        console.error(error);
        res.json(error);
      } else {
        setTimeout(() => pushers.comments(comment.topic, { id: req.user.id }), 0);
        res.json(comment);
      }
    });
});

const build = fs.readFileSync('./.build').toString();
const index = fs.readFileSync('./src/index.html')
  .toString().replace('{build}', build);
app.get('/*', function (req, res) {
  res.send(index);
});

app.listen(3000, function () {
});
