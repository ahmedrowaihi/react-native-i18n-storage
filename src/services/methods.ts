import { Platform } from 'react-native';
import { iosMethods } from './methods.ios';
import { AndroidMethods } from './methods.android';

export const methods = Platform.OS === 'ios' ? iosMethods : AndroidMethods;
