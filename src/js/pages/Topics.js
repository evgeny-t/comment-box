'use strict';

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { 
  topics_item_author,
  topics_addNew,
} from '../styles'

class TopicItem extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'TopicItem';

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
      this.props.handleTopicItemClick(e, this.props.topic);
    }

    render() {
      return (
        <ListItem
          leftAvatar={<Avatar src={this.props.topic.avatar} />}
          primaryText={this.props.topic.title}
          onClick={this.handleClick}
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

    this.state = {
      user: props.route.controller.user,
      topics: props.route.controller.topics
    };

    this.handleTopicItemClick = this.handleTopicItemClick.bind(this);
    this.handleNewTopic = this.handleNewTopic.bind(this);
    this.updateTopics = this.updateTopics.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.props.route.controller.on('topics', this.updateTopics);
    this.props.route.controller.on('user', this.updateUser);
  }

  componentWillUnmount() {
    this.props.route.controller.removeListener('topics', this.updateTopics);
    this.props.route.controller.removeListener('user', this.updateUser);
  }

  updateTopics(topics) {
    this.setState({ topics });
  }

  updateUser(user) {
    this.setState({ user });
  }

  handleTopicItemClick(e, ...args) {
    this.props.route.controller.navigateTopic(e, ...args);
  }

  handleNewTopic(e) {
    this.props.route.controller.navigateNewTopic(e);
  }

  render() {
    const topics = this.state.topics
      .map(topic => 
        (<TopicItem 
          key={topic.id} topic={topic} 
          handleTopicItemClick={this.handleTopicItemClick}
          />));
    let newTopicButton;
    if (this.state.user) {
      newTopicButton = (
        <FloatingActionButton 
          onClick={this.handleNewTopic}
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
