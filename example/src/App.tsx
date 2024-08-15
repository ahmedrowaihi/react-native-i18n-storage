import React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  resetI18nStorage,
  setI18nStorage,
} from '@ahmedrowaihi/react-native-i18n-storage';
import { IsRTL as IsRTLText } from './IsRTL';
import { Credits, Input, TextNoWrap, Toggle, WrappedText } from './components';
import { isRTL } from './translation';
import { Reset } from './components/Reset';
console.log('initial isRTL:', isRTL);

const props = isRTL
  ? {
      forceRTL: false,
      allowRTL: false,
      doLeftAndRightSwapInRTL: false,
      locale: 'en',
    }
  : {
      forceRTL: true,
      allowRTL: true,
      doLeftAndRightSwapInRTL: true,
      locale: 'ar',
    };

export const toggle = async () => await setI18nStorage(props);
export const reset = async () => await resetI18nStorage();

export default function App() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <IsRTLText />
        <TextNoWrap />
        <WrappedText />
        <Input />
        <Toggle />
        <Reset />
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
