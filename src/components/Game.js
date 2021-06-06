/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

export default class Game extends Component {

  state = {
    selectedNumberIndices: [],
    remainingSeconds : this.props.initialSeconds,
  };

  gameStatus = 'PLAYING'

  isNumberSelected = (numberIndex) => {
    return (this.state.selectedNumberIndices.indexOf(numberIndex) >= 0);
  };
  randomNumbers = Array.from({ length : this.props.randomNumnberCount})
    .map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumbers.slice(0, this.props.randomNumnberCount- 2)
    .reduce((acc, curr) => acc + curr, 0);

  shuffledRandomNumbers = shuffle(this.randomNumbers)
  selectNumber = (index) => {
    this.setState((prevState) => ({
      selectedNumberIndices: [...prevState.selectedNumberIndices, index],
    }));
  }

  calcGameStatus = (nextState) => {
    if(nextState.remainingSeconds === 0){
      return 'LOST';
    }
    // Can be 'Playing', 'Won', 'Lost'
    const sumSelected = nextState.selectedNumberIndices.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);

    if( sumSelected === this.target ){
      clearInterval(this.intervalId);
      return 'WON';
    }else if(sumSelected < this.target){
      return 'PLAYING';
    }
    clearInterval(this.intervalId);
    return 'LOST';
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.selectedNumberIndices !== this.state.selectedNumberIndices ||
    nextState.remainingSeconds === 0){
      this.gameStatus = this.calcGameStatus(nextState);
      if(this.gameStatus !== 'PLAYING'){
        clearInterval(this.intervalId);
      }
    }
  }

  componentDidMount(){
    this.intervalId = setInterval(() => {
      //decrement remainingSeconds
      this.setState((prevState) => {
        return {remainingSeconds: prevState.remainingSeconds - 1};
      }, () => {
        if(this.state.remainingSeconds === 0){
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  }

  componentDidUnmount(){
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.target , styles[`STATUS_${this.gameStatus}`]]}> {this.target} </Text>
        <View style={styles.randomNumberContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) =>
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={this.isNumberSelected(index) || this.gameStatus !== 'PLAYING'}
              onPress={this.selectNumber}/>
          )}
        </View>
        <Text> {this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  target: {
    marginTop: 80,
    backgroundColor: 'gray',
    fontSize: 40,
    textAlign: 'center',
    marginHorizontal: 50
  },
  randomNumberContainer : {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 20
  },
  STATUS_PLAYING: {
    backgroundColor: 'gray'
  },
  STATUS_WON: {
    backgroundColor: 'green'
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  }
});
