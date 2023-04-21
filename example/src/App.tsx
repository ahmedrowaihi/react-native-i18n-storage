import React from 'react';

import { Platform, Settings, StyleSheet, View } from 'react-native';

import {
  ChangeNativeLocale,
  I18nStorageKey,
} from '@ahmedrowaihi/react-native-i18n-storage';

import { Credits, Input, TextNoWrap, Toggle, WrappedText } from './components';
import { isRTL } from './translation';
import { IsRTL as IsRTLText } from './IsRTL';
import AsyncStorage from '@react-native-async-storage/async-storage';
console.log('initial isRTL:', isRTL);

const args: [boolean, string] = isRTL ? [false, 'en'] : [true, 'ar'];

export const onPress = async () => {
  await ChangeNativeLocale(...args, () => {
    if (Platform.OS === 'ios')
      Settings.set({
        [I18nStorageKey]: args[1],
      });
    else AsyncStorage.setItem(I18nStorageKey, args[1]);
  });
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
