/* @flow */

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class randomNumber extends Component {
  handleClick = () => {
    console.log(this.props.number);
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <Text style={styles.randomNumber}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  randomNumber : {
    fontSize: 40,
    backgroundColor: 'gray',
    marginVertical: 25,
    marginHorizontal: 15,
    width: 100,
    textAlign:'center'
  }
});
