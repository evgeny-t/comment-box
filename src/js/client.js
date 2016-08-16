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

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const AppController = {
  topics: [
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
  ],

  comments: [
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
  ],

  handleNewTopic(newMessage) {
    // this.setState();
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

    this.topics.push(newTopic);
    this.comments.push(newComment);
    browserHistory.push(`/`);
  }
};


const app = document.getElementById('app');
ReactDOM.render((
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute topics={() => AppController.topics} component={Topics} />
        <Route path='/topics/new' 
          onPost={AppController.handleNewTopic.bind(AppController)} 
          onCancel={() => browserHistory.goBack()}
          component={NewTopic} />
        <Route path='/topics/:topic' appController={AppController} component={Topic} />
      </Route>
    </Router>
  </MuiThemeProvider>
  ), app);
