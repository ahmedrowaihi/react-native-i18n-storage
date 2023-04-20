import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { isRTL } from '../translation';

export function TextNoWrap({ wrapped }: { wrapped?: boolean }) {
  if (isRTL)
    return (
      <Text style={styles.text}>
        {wrapped ? 'محاط بعنصر عرض' : 'غير محاط بعنصر عرض'}
      </Text>
    );
  return (
    <Text style={styles.text}>
      {wrapped ? 'Wrapped in a View' : 'Not wrapped in a View'}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    writingDirection: isRTL ? 'rtl' : 'ltr',
  },
});
