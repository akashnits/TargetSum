/* @flow */

import React, { Component } from 'react';
import Game from './Game';

export default class App extends Component {
  state = {
    gameId: 1
  }

  resetGame = () => {
    this.setState((prevState) => {
      return {gameId : prevState.gameId +1};
    });
  };
  render() {
    return (
      <Game
        key={this.state.gameId}
        randomNumnberCount ={6}
        initialSeconds = {10}
        onPlayAgain = {this.resetGame}/>
    );
  }
}
