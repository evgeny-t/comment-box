'use strict';

import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import CommentBox from '../components/CommentBox';

export default class NewTopic extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
      comment: {
        id: null,
        parent: 2,
        author: 'user1',
        text: '',
        avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
        timestamp: moment().format(),
        temp: true
      },
      topic: {
        id: null,
        author: 'user1',
        title: 'qqqqqqqqqqqqqqReact and JSX today',
        avatar: 'https://lh3.googleusercontent.com/-tSwgnMyi5xc/AAAAAAAAAAI/AAAAAAAAGzY/53dp1gT3RPU/s60-p-rw-no/photo.jpg',
        timestamp: moment().subtract(4, 'days').format()
      }
    };
  }

  handlePost(e) {
    this.props.onPost(comment);
  }

  render() {
    return (
      <div>
        <span>Start a new topic</span>
        <div>
          <div>
            <span>Title:</span>
            <input placeholder='Title'></input>
          </div>
          <div>
            <span>Your message:</span>
            <textarea placeholder='Your message'></textarea>
          </div>
        </div>
        <button onClick={this.handlePost.bind(this)}>Post</button>
      </div>
    );
  }
}
