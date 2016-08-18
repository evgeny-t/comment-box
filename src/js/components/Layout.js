'use strict';

import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import Footer from './Footer';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    const signInButton = (
      <RaisedButton 
        label='Sign in' 
        href='/auth/google'
        secondary={true}
        style={{
          marginTop: 5,
          marginRight: 5
        }}
      />);
    return (
      <div>
        <AppBar 
          title={this.state.title} 
          iconElementRight={signInButton}
          />
        
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
