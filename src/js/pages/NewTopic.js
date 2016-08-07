'use strict';

import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import CommentBox from '../components/CommentBox';

export default class NewTopic extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      text: '',
    };
  }

  render() {
    return (
      <div>
        <span>Start a new topic</span>
        <div>
          <div>
            <span>Title:</span>
            <input placeholder='Topic title' 
              onChange={e => this.setState({ title: e.target.value })}>
            </input>
          </div>
          <div>
            <span>Message:</span>
            <textarea placeholder='Your message' 
              onChange={e => this.setState({ text: e.target.value })}>
            </textarea>
          </div>
        </div>
        <button onClick={e => this.props.onPost(this.state)}>Post</button>
      </div>
    );
  }
}
