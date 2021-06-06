/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import RandomNumber from './RandomNumber';

export default class Game extends Component {

  state = {
    selectedNumbers: []
  };
  isNumberSelected = (numberIndex) => {
    return (this.state.selectedNumbers.indexOf(numberIndex) >= 0);
  };
  randomNumbers = Array.from({ length : this.props.randomNumnberCount})
    .map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumbers.slice(0, this.props.randomNumnberCount- (10 * Math.random()))
    .reduce((acc, curr) => acc + curr, 0);

  selectNumber = (index) => {
    this.setState((prevState) => ({
      selectedNumbers: [...prevState.selectedNumbers, index],
    }));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}> {this.target} </Text>
        <View style={styles.randomNumberContainer}>
          {this.randomNumbers.map((randomNumber, index) =>
            (<RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={this.isNumberSelected(index)}
              onPress={this.selectNumber}/>
            ))}
        </View>
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
    backgroundColor: 'green',
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
});
