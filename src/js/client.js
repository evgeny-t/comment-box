import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, 
  browserHistory, IndexRoute } from 'react-router';

import _ from 'lodash';
import moment from 'moment';

import Layout from './components/Layout';
import Topics from './pages/Topics';
import Topic from './pages/Topic';
import NewTopic from './pages/NewTopic';

const Datastore = {
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
      id: 5,
      parent: 2,
      author: 'user1',
      text: '',
      avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
      timestamp: moment().format(),
      temp: true
    },
    {
      id: 1,
      parent: null,
      author: 'user1',
      text: 'Alright, our whole app is in React now. Here\'s what I did plus some react tricks along the way.',
      avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
      timestamp: moment().subtract(7, 'days').format()
    },
    {
      id: 2,
      parent: null,
      author: 'user2',
      text: 'Waiting for flux integration.﻿',
      avatar: 'https://lh3.googleusercontent.com/-V2oIlDbOAnI/AAAAAAAAAAI/AAAAAAAAlnI/rMf6W0edyD4/s60-p-rw-no/photo.jpg',
      timestamp: moment().subtract(3, 'days').format()
    },
    {
      id: 3,
      parent: 2,
      author: 'user2',
      text: 'or something...﻿',
      avatar: 'https://lh3.googleusercontent.com/-V2oIlDbOAnI/AAAAAAAAAAI/AAAAAAAAlnI/rMf6W0edyD4/s60-p-rw-no/photo.jpg',
      timestamp: moment().subtract(1, 'days').format()
    },
    {
      id: 4,
      parent: 3,
      author: 'user1',
      text: 'What happens when someone in a group of math nerds throws in a crazy idea? They start crunching numbers.',
      avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
      timestamp: moment().format()
    },
  ],
};

class App extends React.Component {
  constructor(props) 
{    super(props);
    this.state = {
      topics: Datastore.topics,
      comments: Datastore.comments
    };
  }

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

    this.setState({
      topics: _.cloneDeep(this.state.topics).concat(newTopic),
      comments:  _.cloneDeep(this.state.comments).concat(newComment)
    });

    browserHistory.push(`/`);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute topics={this.state.topics} component={Topics} />
          <Route path='/topics/new' 
            onPost={this.handleNewTopic.bind(this)} component={NewTopic} />
          <Route path='/topics/:topic' component={Topic} />
        </Route>
      </Router>
      );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
