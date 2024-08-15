import { NativeModules, Platform } from 'react-native';
import type { I18nStorageModule } from './types';

const LINKING_ERROR =
  `The package 'react-native-i18n-storage' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';
const PLATFORM_ERROR = 'Platform' + Platform.OS + 'is not supported';

export const I18nStorage: I18nStorageModule =
  Platform.OS !== 'ios' && Platform.OS !== 'android'
    ? new Proxy(
        {},
        {
          get() {
            throw new Error(PLATFORM_ERROR);
          },
        }
      )
    : NativeModules.I18nStorage
    ? NativeModules.I18nStorage
    : new Proxy(
        {},
        {
          get() {
            throw new Error(LINKING_ERROR);
          },
        }
      );
