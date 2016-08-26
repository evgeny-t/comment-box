'use strict';

import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import CommentBox from '../components/CommentBox';

export default class NewTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    };
  }

  render() {
    return (
      <div>
        <Card style={{ marginRight: 100, marginLeft: 100 }}>
          <CardHeader title="Start a new topic" />
          <TextField
            hintText="Full width"
            floatingLabelText="Title"
            fullWidth={true}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <TextField
            hintText="Full width"
            floatingLabelText="Text"
            fullWidth={true}
            multiLine={true}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <CardActions>
            <FlatButton label="Post"
              onClick={e => this.props.route.onPost(this.state)} />
            <FlatButton label="Cancel" 
              onClick={e => this.props.route.onCancel(this.state)} />
          </CardActions>

        </Card>
      </div>
    );
  }
}
