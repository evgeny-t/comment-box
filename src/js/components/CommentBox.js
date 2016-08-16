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
  handleReply() {
    this.props.onReply.call(null, Array.prototype.slice.call(arguments, 1));
  }

  render() {
    const bullet = (<li style={itemStyle}>{'\u2022'}</li>);
    return (
      <div>
        <div style={authorStyle}>{this.props.comment.author}</div>
        <div style={messageStyle}>{this.props.comment.text}</div>
        <ul style={actionListStyle}>
          {bullet}
          <li style={itemStyle}><a 
            onClick={this.handleReply.bind(this)}
            style={{color: '#707070', cursor: 'pointer'}}>Reply</a></li>
          {bullet}
          <li style={itemStyle}>Delete</li>
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
    const handleComment = () => this.props.onComment(this.state);
    const handleChange = e => 
      this.setState(_.extend({}, this.state, { text: e.target.value }));
    const editor = (
      <TextField 
        onChange={handleChange}
        hintText="Your message"
        floatingLabelText="Your message"
        fullWidth={true}
        multiline={true}
        rows={3}
      />);
    return (
      <div>
        {editor}
        <div>
          <FlatButton onClick={handleComment} label='Comment' />
          <FlatButton onClick={handleCancel} label='Cancel' />
        </div>
      </div>
    );
  }
}


export default class CommentBox extends React.Component {
  handleReply(e) {
    this.props.onReply(this.props.comment);
  }

  render() {
    const style = _.extend(
      {}, externalBoxStyle, { 
        marginTop: 5,
        marginBottom: 5,
        marginLeft: this.props.indent * indent + 5 
      });

    const commentBody = this.props.temporary ? 
      (<CommentEditor comment={this.props.comment} 
        onComment={this.props.onComment}
        onCancel={this.props.onCancel} />) : 
      (<CommentContent comment={this.props.comment} 
          onReply={this.handleReply.bind(this)} />);

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
