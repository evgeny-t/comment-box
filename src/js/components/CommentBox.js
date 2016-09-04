import React from "react";
import moment from 'moment';
import _ from 'lodash';

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import '../styles'
import { 
  externalBoxStyle,
  actionListStyle,
  itemStyle,
  outterStyle,
  indent,
  avatarStyle,
  authorStyle,
  messageStyle } from '../styles';

class CommentContent extends React.Component {
  handleReply = (...args) => {
    this.props.onReply(...args);
  }

  handleDelete = (...args) => {
    this.props.onDelete(...args);
  }

  render() {
    const bullet = (<li style={itemStyle}>{'\u2022'}</li>);

    const linkStyle = {color: '#707070', cursor: 'pointer'};
    const canRemove = this.props.user && 
      this.props.user.id == this.props.comment.authorId && 
      !(this.props.comment.deleted);

// TODO(ET): move styles to styles.js
    const actions = (
      <span>
        {bullet}
        <li style={itemStyle}>
          <a onClick={this.handleReply} style={linkStyle}>Reply</a>
        </li>
        { canRemove ? bullet : null }
        { canRemove ? 
          (<li style={itemStyle}>
              <a onClick={this.handleDelete} style={linkStyle}>Delete</a>
          </li>) : null }
      </span>
    );

    return (
      <div>
        <div style={authorStyle}>{this.props.comment.author}</div>
        <div style={messageStyle}>{
          this.props.comment.deleted ? 
            'comment removed' : this.props.comment.text
        }</div>
        <ul style={actionListStyle}>
          {this.props.user ? actions : null}
          {bullet}
          <li style={itemStyle}>{
            moment(this.props.comment.timestamp).calendar()
          }</li>
        </ul>
      </div>);
  }
}

class CommentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.comment;
  }

  render() {
    const handleCancel = () => this.props.onCancel(this.state);
    const handleComment = () => {
      this.props.onComment(_.clone(this.state));
      this.setState({ text: '' });
    };
    const handleChange = e => 
      this.setState(_.extend({}, this.state, { text: e.target.value }));
    const editor = (
      <TextField 
        value={this.state.text}
        onChange={handleChange}
        hintText="Your message"
        floatingLabelText="Your message"
        fullWidth={true}
        multiLine={true}
        rows={3}
      />);
    return (
      <div>
        {editor}
        <div>
          <FlatButton onClick={handleComment} label='Comment' />
          { this.props.canCancel ? 
            (<FlatButton onClick={handleCancel} label='Cancel' />) : (<div />) }
        </div>
      </div>
    );
  }
}


export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
  }

// TODO(ET): transfer props
  handleReply = (e) => {
    this.props.onReply(this.props.comment);
  }

  handleDelete = (e) => {
    this.props.onDelete(this.props.comment);
  }

  render() {
    const style = _.extend(
      {}, externalBoxStyle, { 
        marginTop: 5,
        marginBottom: 5,
        marginLeft: this.props.indent * indent + 5 
      });

    const canCancel = 
      this.props.canCancel === undefined ? true : this.props.canCancel;
    const commentBody = this.props.temporary ? 
      (<CommentEditor 
        user={this.props.user}
        comment={this.props.comment} 
        onComment={this.props.onComment}
        onCancel={this.props.onCancel}
        canCancel={canCancel} />) : 
      (<CommentContent 
        user={this.props.user}
        comment={this.props.comment} 
        onDelete={this.handleDelete}
        onReply={this.handleReply} />);

    return (
      <Paper zDepth={1} style={style}>
        <Avatar style={avatarStyle} src={this.props.comment.avatar} />
        <div style={outterStyle}>
          {commentBody}
        </div>
      </Paper>
    );
  }
}
