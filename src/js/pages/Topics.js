'use strict';

import React from 'react';
import { Link } from 'react-router';

import _ from 'lodash';
import moment from 'moment';

import CommentBox from '../components/CommentBox';

class TopicItem extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'TopicItem';
    }
    render() {
        return (
          <tr>
            <td>
              <img src={this.props.topic.avatar} />
            </td>
            <td>
              <div>{this.props.topic.title}</div>
              <div>{
                moment(this.props.topic.timestamp).calendar()
              }</div>
            </td>
          </tr>
          );
    }
}

export default class Topics extends React.Component {
  constructor() {
    super();
    this.state = {
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
      ]
    };
  }

  render() {
    const topics = this.state.topics
      .map(topic => 
        (<TopicItem key={topic.id} topic={topic} />));
    return (
      <div>
        <Link to='/topics/new'>New</Link>
        <table>
          <tbody>
            {topics}
          </tbody>
        </table>
      </div>
    );
  }
}
