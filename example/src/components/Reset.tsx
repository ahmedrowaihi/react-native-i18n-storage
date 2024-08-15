import React from 'react';
import { Pressable, Text } from 'react-native';
import { reset, styles } from '../App';
import { language } from '../translation';

export function Reset() {
  return (
    <Pressable onPress={reset} style={styles.box}>
      <Text>{language.reset}</Text>
    </Pressable>
  );
}
