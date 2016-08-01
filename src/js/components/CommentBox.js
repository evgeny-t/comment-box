import React from "react";

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

    return (
      <div style={externalBoxStyle}>
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
              this.props.comment.timestamp.toLocaleDateString() + ' ' +
                this.props.comment.timestamp.toLocaleTimeString()
            }</li>
          </ul>
        </div>
      </div>
    );
  }
}
