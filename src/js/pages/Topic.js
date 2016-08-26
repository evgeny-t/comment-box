'use strict';

import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import CommentBox from '../components/CommentBox';

export default class Topic extends React.Component {
  initDummy(topicId, user) {
    return {
      id: null,
      parent: null,
      avatar: user ? user.avatar : '',
      timestamp: moment().format(),
      temp: true,
      text: '',
      topic: topicId
    };
  }

  constructor(props) {
    super(props);
    const controller = props.route.controller;
    const topicId = props.params.topic;
    this._controller = controller;

    this.updateComments = this.updateComments.bind(this);
    this.updateUser = this.updateUser.bind(this);
    
    const comments = _.filter(controller.comments, ['topic', topicId]);
    this.state = {
      comments: comments,
      dummy: this.initDummy(topicId, controller.user),
      user: controller.user
    };
  }

  componentDidMount() {
    this._controller.on('comments', this.updateComments);
    this._controller.on('user', this.updateUser);
  }

  componentWillUnmount() {
    this._controller.removeListener('comments', this.updateComments);
    this._controller.removeListener('user', this.updateUser);
  }

  updateComments(comments) {
    let temporary = _.filter(this.state.comments, 'temp');
    let newComments = _.filter(comments, ['topic', this.props.params.topic]);
    this.setState({
      comments: temporary.concat(newComments),
      dummy: this.initDummy(
        this.props.params.topic, this.props.route.controller.user),
      user: this.props.route.controller.user
    });
  }

  updateUser(user) {
    this.setState({
      dummy: this.initDummy(this.props.params.topic, user),
      user: user
    });
  }

  commentsTree() {
    let commentWrappers = [];

    const wrap = comment => {
      return { id: comment.id, value: comment, children: [] };
    };
    commentWrappers = _(this.state.comments)
      .filter(['parent', null])
      .map(wrap)
      .value();

    const recurse = nodes => {
      if (nodes.length === 0) {
        return;
      }

      const frontier = _(this.state.comments)
        .filter(c => _.some(nodes, ['id', c.parent]))
        .map(wrap)
        .value();
      const remapped = _.reduce(nodes, (accum, current) => {
        accum[current.id] = current;
        return accum;
      }, {});
      frontier.forEach(wrapper => {
        remapped[wrapper.value.parent].children
          .push(wrapper);
      });

      recurse(frontier);
    };
    
    recurse(commentWrappers);
    const sortNodes = nodes => {
      nodes.sort((a, b) => 
        b.value.temp || (moment(a.value.timestamp) > moment(a.value.timestamp)));
      nodes.forEach(node => sortNodes(node.children));
    };
    sortNodes(commentWrappers);
    return commentWrappers;
  }

  handleReply(replyTo) {
    // const head = _.last(_(this.state.comments).map('id').value().sort());
    const commentsClone = this.state.comments.slice(0);
    commentsClone.push({
      id: Date.now(),
      topic: replyTo.topic,
      parent: replyTo.id,
      avatar: this.state.dummy.avatar,
      timestamp: moment().format(),
      temp: true
    });

    this.setState({ comments: commentsClone });
  }

  handleComment(comment) {
    if (!comment.id) {
      comment.id = _(this.state.comments).map('id').max() + 1;
    }
    const copy = _.filter(this.state.comments, 
      c => c.id !== comment.id).slice(0);
    copy.push(_.extend({}, comment, { temp: false }));
    this.setState({ comments: copy });
    this._controller.comment(comment);
  }

  handleCancel(comment) {
    this.setState({ 
      comments: _.filter(this.state.comments, 
        c => c.id !== comment.id).slice(0) 
    });
  }

  render() {
    const commentList = [];
    const commentsTree = this.commentsTree();
    const walk = (node, indent) => {
      commentList.push((
        <CommentBox key={node.id} indent={indent} 
          user={this.state.user}
          onComment={this.handleComment.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          onReply={this.handleReply.bind(this)}
          comment={node.value} temporary={node.value.temp} />
        ));
      node.children.forEach(node => walk(node, indent + 1));
    };

    commentsTree.forEach(node => walk(node, 0));
    console.log('render:', this.state.user, new Error().stack);
    return (
      <div>
        {commentList}
        {this.state.user ? (
          <CommentBox key={0} indent={0} 
          temporary={true} comment={this.state.dummy}
          canCancel={false}
          onComment={comment => this.handleComment(comment)}
        />) : (null)}
        
      </div>
    );
  }
}
