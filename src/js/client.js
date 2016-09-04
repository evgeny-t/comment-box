import EventEmitter from 'events';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, 
  browserHistory, IndexRoute } from 'react-router';

import _ from 'lodash';
import moment from 'moment';

import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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

const muiTheme = getMuiTheme({
  // palette: {
  //   accent1Color: deepOrange500,
  // },
});

// TODO(ET): error flashes

class AppController extends EventEmitter {
  constructor() {
    super();

    this._user = null;
    this._topics = [];
    this._eventSources = {};
    this._eventSources.topics = new EventSource('/sse/topics');
    this._eventSources.comments = new EventSource('/sse/comments');
    this._requestTopicsThrottled = 
      _.throttle(this._requestTopics.bind(this), 3000);

    this._requestTopics();

    request
      .get('/api/me')
      .then(data => {
        this.user = _.merge({}, {
          name: data.body.displayName,
          avatar: data.body.photos[0].value,
          id: data.body.id 
        });
      }, error => console.error(error));
  }

  _requestTopics() {
    return request
      .get('/api/topics')
      .then(res => this.topics = res.body.topics);
  }

  turnTopicsSSE(on) {
    if (on) {
      this._eventSources.topics.onmessage = event => {
        this._requestTopicsThrottled();
      };
    } else {
      this._eventSources.topics.onmessage = null;
    }
  }

  turnCommentsSSE(topic, cb, on) {
    if (on) {
      this._eventSources.comments.addEventListener(topic, cb);
    } else {
      this._eventSources.comments.removeEventListener(topic, cb);
    }
  }

  set user(value) {
    this._user = value;
    this.emit('user', this._user);
  }

  get user() {
    return this._user;
  }

  get topics() {
    return this._topics;
  }

  set topics(value) {
    this._topics = value;
    this.emit('topics', this._topics);
  }

  comments = _.throttle(
    topicId => {
      return request
        .get(`/api/topics/${topicId}/comments`)
        .then(res => res.body.comments);
    }, 1000);

  navigateNewTopic(e) {
    e.preventDefault();
    browserHistory.push('/topics/new');
  }

  navigateTopic(e, topic) {
    e.preventDefault();
    browserHistory.push(`/topics/${topic.id}`);
  }

  topicNavigateBack(e) {
    e.preventDefault();
    browserHistory.goBack();
  }

  handleNewTopic(newMessage) {
    const newTopic = {
      title: newMessage.title,
    };

    const newComment = {
      parent: null,
      text: newMessage.text,
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
        .send(_.merge(newComment, { topic: topic.id })),
      err => console.error(err))

    browserHistory.push(`/`);
  }

  comment(c) {
    return new Promise(resolve => {
      request
        .post('/api/comments')
        .set('Content-Type', 'application/json')
        .send(c)
        .then(response => {
          resolve(response.body.comment)
        }, err => console.error(err));
    });
  }

  deleteComment(c) {
    request('DELETE', `/api/comments/${c.id}`)
      .then(comment => comment, 
        error => console.error(error));
  }

  signOut() {
    window.location = '/auth/bye';
  }
};

const appController = new AppController;

const app = document.getElementById('app');
ReactDOM.render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      <Route path='/' controller={appController} component={Layout}>
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
