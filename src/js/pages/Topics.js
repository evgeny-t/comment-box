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
  topics_item_author,
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
            <span style={topics_item_author}>{this.props.topic.author}</span>
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

    props.route.controller.on('topics', topics => {
      this.setState({ topics });
    });

    props.route.controller.on('user', user => {
      this.setState({ user });
    });

    this.state = {
      user: props.route.controller.user,
      topics: []
    };
  }

  render() {
    const topics = this.state.topics
      .map(topic => 
        (<TopicItem key={topic.id} topic={topic} />));
    let newTopicButton;
    if (this.state.user) {
      newTopicButton = (
        <FloatingActionButton href='/topics/new' 
          zDepth={2}
          style={topics_addNew}>
          <ContentAdd />
        </FloatingActionButton>
      );
    }
    return (
      <div>
        {newTopicButton}
        <List>
          {topics}
        </List>
      </div>
    );
  }
}
