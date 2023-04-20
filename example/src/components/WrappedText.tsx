import React from 'react';
import { View } from 'react-native';
import { TextNoWrap } from './TextNoWrap';

export function WrappedText() {
  return (
    <View>
      <TextNoWrap wrapped />
    </View>
  );
}
