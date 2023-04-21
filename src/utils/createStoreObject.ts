import type { I18nStorageSchema } from '../types';
export const createStoreObject = ({
  locale,
  forceRTL,
  allowRTL,
  doLeftAndRightSwapInRTL = false,
}: I18nStorageSchema) => {
  if (typeof locale !== 'string') {
    throw new Error('Locale must be a string');
  }
  if (typeof forceRTL !== 'boolean') {
    throw new Error('forceRTL must be a boolean');
  }
  if (typeof allowRTL !== 'boolean') {
    throw new Error('allowRTL must be a boolean');
  }
  if (typeof doLeftAndRightSwapInRTL !== 'boolean') {
    throw new Error('doLeftAndRightSwapInRTL must be a boolean');
  }
  return JSON.stringify({
    locale,
    forceRTL,
    allowRTL,
    doLeftAndRightSwapInRTL,
  });
};
