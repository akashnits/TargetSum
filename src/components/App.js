/* @flow */

import React, { Component } from 'react';
import Game from './Game';

export default class App extends Component {
  render() {
    return (
      <Game randomNumnberCount ={6} initialSeconds = {10}/>
    );
  }
}
