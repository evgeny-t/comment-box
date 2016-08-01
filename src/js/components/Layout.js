'use strict';

import React from 'react';

import CommentBox from './CommentBox';
import Footer from './Footer';
import Header from './Header';
import _ from 'lodash';

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
          timestamp: new Date()
        },
        {
          id: 2,
          parent: null,
          author: 'user2',
          text: 'Waiting for flux integration.﻿',
          avatar: 'https://lh3.googleusercontent.com/-V2oIlDbOAnI/AAAAAAAAAAI/AAAAAAAAlnI/rMf6W0edyD4/s60-p-rw-no/photo.jpg',
          timestamp: new Date()
        },
        {
          id: 3,
          parent: 2,
          author: 'user2',
          text: 'or something...﻿',
          avatar: 'https://lh3.googleusercontent.com/-V2oIlDbOAnI/AAAAAAAAAAI/AAAAAAAAlnI/rMf6W0edyD4/s60-p-rw-no/photo.jpg',
          timestamp: new Date()
        },
      ]
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

// TODO(ET): make a tree of comments

  // commentsTree() {
  //   let commentWrappers = [];

  //   commentWrappers = _(this.state.comments)
  //     .filter(['parent', null])
  //     .map(c => { return { id: c.id, value: c, children: []} })
  //     .value();

  //   const recurse = nodes => {
  //     _(this.state.comments)
  //       .filter(c => _.some())
  //   };
    
  //   console.log(commentWrappers);
  //   // let orphaned = _.filter(this.state.comments, );
  // }

  render() {
    const commentList = _.map(this.state.comments, 
      comment => (<CommentBox comment={comment} />));
    // this.commentsTree();
    
    return (
      <div>
        <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
        {commentList}
        <Footer />
      </div>
    );
  }
}
