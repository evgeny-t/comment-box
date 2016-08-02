import React from "react";
import moment from 'moment';
import _ from 'lodash';

const externalBoxStyle = {
  borderTopWidth: 1, 
  borderTopColor: '#ccc',
  borderTopStyle: 'solid'
};

const actionListStyle = { 
  listStyleType: 'none', 
  float: 'left',
  padding: 5,
  paddingLeft: 10,
  paddingBottom: 0,
  fontWeight: 'lighter'
};

const itemStyle = { 
  float: 'left',
  marginLeft: 6
};

const outterStyle = { display: 'inline-block' };

const avatarStyle = {
  height: 42,
  width: 42,
  verticalAlign: 'top',
  marginTop: 5
};

const authorStyle = {
  padding: 5,
  paddingLeft: 10,
  paddingBottom: 0,
  fontWeight: 'bolder'
};

const messageStyle = {
  padding: 5,
  paddingLeft: 10,
  paddingBottom: 0,
};

export default class CommentBox extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  render() {
    const bullet = (<li style={itemStyle}>{'\u2022'}</li>);
    const style = _.extend(
      {}, externalBoxStyle, { marginLeft: this.props.indent * 42 });

    return (
      <div style={style}>
        <img style={avatarStyle} src={this.props.comment.avatar} /> 
        <div style={outterStyle}>
          <div style={authorStyle}>{this.props.comment.author}</div>
          <div style={messageStyle}>{this.props.comment.text}</div>
          <ul style={actionListStyle}>
            {bullet}
            <li style={itemStyle}>Reply</li>
            {bullet}
            <li style={itemStyle}>Delete</li>
            {bullet}
            <li style={itemStyle}>{
              moment(this.props.comment.timestamp).calendar()
            }</li>
          </ul>
        </div>
      </div>
    );
  }
}
