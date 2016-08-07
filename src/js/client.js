import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, 
  hashHistory, IndexRoute } from 'react-router';

import Layout from './components/Layout';
import Topics from './pages/Topics';
import Topic from './pages/Topic';
import NewTopic from './pages/NewTopic';

const app = document.getElementById('app');
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Topics} />
      <Route path='/topics/new' component={NewTopic} />
      <Route path='/topics/:topic' component={Topic} />
    </Route>
  </Router>
  ), app);
