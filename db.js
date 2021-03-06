'use strict';

const mongoose = require('mongoose');

const mongoUrl = `mongodb://localhost/test`;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('error', error => {
  console.error(error)
  setTimeout(() => mongoose.connect(`mongodb://mongo/test`), 1000);
});

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

  deleted: Date
});

topicSchema.virtual('id').get(idGetter);
topicSchema.set('toJSON', { virtuals: true });

commentSchema.virtual('id').get(idGetter);
commentSchema.set('toJSON', { virtuals: true });

const Topic = mongoose.model('Topic', topicSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
  mongoose: mongoose,
  Topic,
  Comment,
};

