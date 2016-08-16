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
  topics_table_author, 
  topics_addNew,
} from '../styles'

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
          href={`/topics/${this.props.topic.id}`}
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
        <FloatingActionButton href='/topics/new' style={topics_addNew}>
          <ContentAdd />
        </FloatingActionButton>
        <List>
          {topics}
        </List>
      </div>
    );
  }
}
