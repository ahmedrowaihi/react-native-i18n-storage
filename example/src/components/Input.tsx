import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { language } from '../translation';

export const Input = (props: TextInputProps) => {
  return (
    <TextInput style={styles.input} placeholder={language.input} {...props} />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
});
