/* @flow */

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class randomNumber extends Component {
  handleClick = () => {
    // add to numberSelected list
    if(this.props.isDisabled) { return;}
    this.props.onPress(this.props.id);
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <Text style={[styles.randomNumber,  (this.props.isDisabled && styles.disabled)]}>
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
  disabled : {
    opacity: 0.3
  }
});
