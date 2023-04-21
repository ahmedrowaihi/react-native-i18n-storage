import { Platform } from 'react-native';

export const I18nStorageKey = 'REACT_NATIVE_I18N_STORAGE_KEY_v1';
export const Device = Platform.OS === 'ios' ? 'ios' : 'android';
