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
    request
      .get('/api/topics')
      .then(res => this.topics = res.body.topics);

    request
      .get('/api/me')
      .then(data => {
        this.user = _.merge({}, {
          name: data.body.displayName,
          avatar: data.body.photos[0].value,
          id: data.body.id 
        });
      })
      .catch(error => console.error(error));
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

  comments(topicId) {
    return request
      .get(`/api/topics/${topicId}/comments`)
      .then(res => res.body.comments);
  }

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
        .send(_.merge(newComment, { topic: topic.id })))
      .then(res => {
        this.comments = this.comments.concat(res.body.comment);
      })
      .catch(err => console.error(err));

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
      .catch(err => console.error(err));
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
