'use strict';

import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import CommentBox from './CommentBox';
import Footer from './Footer';
import Header from './Header';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
      comments: [
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
      ]
    };
  }

  changeTitle(title) {
    this.setState({title});
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
    return commentWrappers;
  }

  render() {
    const commentList = [];
    const commentsTree = this.commentsTree();
    const walk = (node, indent) => {
      commentList.push((
        <CommentBox indent={indent} comment={node.value} />
        ));
      node.children.forEach(node => walk(node, indent + 1));
    };

    commentsTree.forEach(node => walk(node, 0));
    
    return (
      <div>
        <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
        {commentList}
        <Footer />
      </div>
    );
  }
}
