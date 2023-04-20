import React from 'react';
import { Pressable, Text } from 'react-native';
import { language } from '../translation';
import { styles, onPress } from '../App';

export function Toggle() {
  return (
    <Pressable style={styles.box} onPress={onPress}>
      <Text>{language.change}</Text>
    </Pressable>
  );
}
