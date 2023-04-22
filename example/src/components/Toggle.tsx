import React from 'react';
import { Pressable, Text } from 'react-native';
import { language } from '../translation';
import { styles, toggle } from '../App';

export function Toggle() {
  return (
    <Pressable style={styles.box} onPress={toggle}>
      <Text>{language.change}</Text>
    </Pressable>
  );
}
