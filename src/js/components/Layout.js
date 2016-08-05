'use strict';

import React from 'react';

import _ from 'lodash';
import moment from 'moment';

import Footer from './Footer';
import Header from './Header';

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
        <Header changeTitle={this.changeTitle.bind(this)} 
          title={this.state.title} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
