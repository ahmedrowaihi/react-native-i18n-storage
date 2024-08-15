import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { language } from '../translation';

export function Credits() {
  return (
    <View>
      <Text>
        {language.madeby}{' '}
        <Text
          style={styles.text}
          onPress={() => Linking.openURL('https://github.com/ahmedrowaihi')}
        >
          @ahmedrowaihi
        </Text>
      </Text>
      <Text>
        {language.twitter}:{' '}
        <Text
          style={styles.text}
          onPress={() => Linking.openURL('https://twitter.com/ahmedrowaihi')}
        >
          @ahmedrowaihi
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: 'blue',
  },
});
