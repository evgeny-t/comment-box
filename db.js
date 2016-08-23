'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', error => console.error(error));;

db.once('open', () => {
  console.log('ready');
});

function idGetter() {
  return this._id;
}

const topicSchema = mongoose.Schema({
  authorId: String,
  author: String,
  avatar: String,
  title: String,
  timestamp: String
});

const commentSchema = mongoose.Schema({
  topic: String,
  parent: String,
  text: String,

  authorId: String,
  author: String,
  avatar: String,
  timestamp: String,
});

topicSchema.virtual('id').get(idGetter);
topicSchema.set('toJSON', { virtuals: true });

commentSchema.virtual('id').get(idGetter);
commentSchema.set('toJSON', { virtuals: true });

const Topic = mongoose.model('Topic', topicSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  Topic,
  Comment,
};

