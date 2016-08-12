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
  constructor(props) {
    super(props);
    this.state = {
      topics: props.route.topics || props.topics
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
