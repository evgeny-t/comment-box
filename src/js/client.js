import EventsEmitter from 'events';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, 
  browserHistory, IndexRoute } from 'react-router';

import _ from 'lodash';
import moment from 'moment';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Layout from './components/Layout';
import Topics from './pages/Topics';
import Topic from './pages/Topic';
import NewTopic from './pages/NewTopic';

import request from 'superagent';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// TODO(ET): error flashes

request
  .get('/api')

class AppController extends EventsEmitter {
  constructor() {
    super();

    this._topics = [];
    this._comments = [];
    request
      .get('/api/topics')
      .then(res => this.topics = res.body.topics)
      .then(() => request.get('/api/comments'))
      .then(res => this.comments = res.body.comments);
  }

  get topics() {
    return this._topics;
  }

  set topics(value) {
    this._topics = value;
    this.emit('topics', this._topics);
  }

  get comments() {
    return this._comments;
  }

  set comments(value) {
    this._comments = value;
    this.emit('comments', this._comments);
  }

  handleNewTopic(newMessage) {
    const newTopic = {
      id: 0,
      author: 'user1',
      title: newMessage.title,
      avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
      timestamp: moment().format()
    };

    const newComment = {
      id: 0,
      parent: null,
      author: 'user1',
      text: newMessage.text,
      avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
      timestamp: moment().format()
    };

    request
      .post('/api/topics')
      .set('Content-Type', 'application/json')
      .send(newTopic)
      .then(res => {
        this.topics = this.topics.concat(res.body.topic);
        return res.body.topic; 
      })
      .then(topic => request
        .post('/api/comments')
        .set('Content-Type', 'application/json')
        .send(_.merge(newComment, { topic: topic.id })))
      .then(res => {
        this.comments = this.comments.concat(res.body.comment);
      })
      .catch(err => console.log(err));

    browserHistory.push(`/`);
  }

  comment(c) {
    request
      .post('/api/comments')
      .set('Content-Type', 'application/json')
      .send(c)
      .then(res => {
        this.comments = this.comments.concat(res.body.comment);
      })
      .catch(err => console.log(err));
  }
};

const appController = new AppController;

const app = document.getElementById('app');
ReactDOM.render((
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute controller={appController} 
          topics={() => appController.topics} component={Topics} />
        <Route path='/topics/new' 
          onPost={appController.handleNewTopic.bind(appController)} 
          onCancel={() => browserHistory.goBack()}
          component={NewTopic} />
        <Route path='/topics/:topic' 
          controller={appController} component={Topic} />
      </Route>
    </Router>
  </MuiThemeProvider>
  ), app);
