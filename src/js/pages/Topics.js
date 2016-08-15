'use strict';

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import CommentBox from '../components/CommentBox';
import { 
  externalBoxStyle, 
  topics_table,
  topics_table_author, } from '../styles'

/*
<tr style={externalBoxStyle}>
          <td style={topics_table_author}>
            
          </td>
          <td>
            <div>
              <Link style={{ textDecoration: 'none'}} to={`/topics/${this.props.topic.id}`}>
                {this.props.topic.title}
              </Link>
            </div>
            <div>
              
            </div>
          </td>
        </tr>
*/

class TopicItem extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'TopicItem';
    }
    render() {
      return (
        <ListItem 
          leftAvatar={<Avatar src={this.props.topic.avatar} />}
          primaryText={this.props.topic.title}
          secondaryText={
            <div>
            <span>{this.props.topic.author}</span>
            <span>{
              moment(this.props.topic.timestamp).calendar()
            }</span>
            </div>
          }
          >
        </ListItem>
        );
    }
}

const newTopicStyle = {
  right: 0,
  bottom: 0,
  position: 'fixed',
  marginRight: 50,
  marginBottom: 50,
};

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
        <FloatingActionButton href='/topics/new' style={newTopicStyle}>
          <ContentAdd />
        </FloatingActionButton>
        <List>
          {topics}
        </List>
      </div>
    );
  }
}
