'use strict';

import React from 'react';
import { Link } from 'react-router';

import _ from 'lodash';
import moment from 'moment';

import CommentBox from '../components/CommentBox';
import { 
  externalBoxStyle, 
  topics_table,
  topics_table_author, } from '../styles'

class TopicItem extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'TopicItem';
    }
    render() {
      return (
        <tr style={externalBoxStyle}>
          <td style={topics_table_author}>
            <img src={this.props.topic.avatar} />
          </td>
          <td>
            <div>
              <Link style={{ textDecoration: 'none'}} to={`/topics/${this.props.topic.id}`}>
                {this.props.topic.title}
              </Link>
            </div>
            <div>
              <span>{this.props.topic.author}</span>
              <span>{
                moment(this.props.topic.timestamp).calendar()
              }</span>
            </div>
          </td>
        </tr>
        );
    }
}

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: props.route.topics() || props.topics
    };
  }

  render() {
    const topics = this.state.topics
      .map(topic => 
        (<TopicItem key={topic.id} topic={topic} />));
    return (
      <div>
        <Link to='/topics/new'>New</Link>
        <table style={topics_table}>
          <tbody>
            {topics}
          </tbody>
        </table>
      </div>
    );
  }
}
