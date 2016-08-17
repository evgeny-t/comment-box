'use strict';

import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import CommentBox from '../components/CommentBox';

export default class Topic extends React.Component {
  initDummy() {
    return {
      id: null,
      parent: null,
      avatar: '',
      timestamp: moment().format(),
      temp: true,
      text: ''
    };
  }

  constructor(props) {
    super(props);
    const controller = props.route.controller;
    const topicId = parseInt(props.params.topic);

    controller.on('comments', comments => {
      this.setState({
        comments: _.filter(comments, ['topic', topicId]),
        dummy: this.initDummy()
      });
    });

    const comments = _.filter(controller.comments, ['topic', topicId]);
    this.state = {
      comments: comments,
      dummy: this.initDummy()
    };
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
    const head = _.last(_(this.state.comments).map('id').value().sort());
    const commentsClone = this.state.comments.slice(0);
    commentsClone.push({
      id: head + 1,
      parent: replyTo.id,
      avatar: replyTo.avatar,
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
          onComment={this.handleComment.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          onReply={this.handleReply.bind(this)}
          comment={node.value} temporary={node.value.temp} />
        ));
      node.children.forEach(node => walk(node, indent + 1));
    };

    commentsTree.forEach(node => walk(node, 0));
    
    return (
      <div>
        {commentList}
        <CommentBox key={0} indent={0} 
          temporary={true} comment={this.state.dummy}
          canCancel={false}
          onComment={comment => this.handleComment(comment)}
        />
      </div>
    );
  }
}
