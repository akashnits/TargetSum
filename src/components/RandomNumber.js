/* @flow */

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class randomNumber extends Component {
  handleClick = () => {
    //TODO: add to numberSelected list
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <Text style={[styles.randomNumber,  (this.props.isSelected && styles.selected)]}>
          { /* {console.log(`isSelected for ${this.props.number}: ${this.props.isSelected}` )} */ }
          {this.props.number}
        </Text>
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
  },
  selected : {
    opacity: 0.3
  }
});
