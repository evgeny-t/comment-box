'use strict';

import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import AppBar from 'material-ui/AppBar';

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
    return (
      <div>
        <AppBar title={this.state.title} />
        
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
