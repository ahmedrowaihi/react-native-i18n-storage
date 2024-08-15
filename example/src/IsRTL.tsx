import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { isRTL } from './translation';

export function IsRTL() {
  return <Text style={styles.text}>{`isRTL: ${isRTL}`}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: isRTL ? 'red' : 'blue',
  },
});
