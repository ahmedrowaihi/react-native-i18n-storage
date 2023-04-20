import React from 'react';

import { StyleSheet, View } from 'react-native';

import { ChangeNativeLocale } from 'react-native-i18n-storage';
import Restart from 'react-native-restart';
import { Credits, Input, TextNoWrap, Toggle, WrappedText } from './components';
import { isRTL } from './translation';
import { IsRTL as IsRTLText } from './IsRTL';

console.log('initial isRTL:', isRTL);

const args: [boolean, string] = isRTL ? [false, 'en'] : [true, 'ar'];

export const onPress = async () => {
  await ChangeNativeLocale(...args);
  Restart.Restart();
};

export default function App() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <IsRTLText />
        <TextNoWrap />
        <WrappedText />
        <Input />
        <Toggle />
      </View>
      <Credits />
    </View>
  );
}

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    height: 40,
    width: 200,
    padding: 10,
    backgroundColor: 'lightblue',
    borderWidth: 1,
    marginVertical: 20,
  },
});
