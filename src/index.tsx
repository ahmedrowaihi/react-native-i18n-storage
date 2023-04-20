/**
 * @file I18nStorage.ts
 * @description I18nStorage class
 * @author @ahmedrowaihi
 * @license MIT
 * @version 1.0.0
 */
import { NativeModules, Platform } from 'react-native';
import { methods } from './services/methods';
import Restart from 'react-native-restart';
const LINKING_ERROR =
  `The package 'react-native-i18n-storage' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const I18nStorage = NativeModules.I18nStorage
  ? NativeModules.I18nStorage
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
/**
 * @function ChangeNativeLocale
 * @description Change the native locale of the device and restart the app
 * @param forceRTL {boolean}
 * @param locale {string}
 * @param callback {() => void | Promise<void>}
 * @returns
 */
export async function ChangeNativeLocale(
  forceRTL: boolean,
  locale: string,
  callback?: () => void | Promise<void>
): Promise<void> {
  if (typeof forceRTL !== 'boolean' || typeof locale !== 'string')
    throw new Error(
      'ChangeNativeLocale requires a boolean and a string, ie: ChangeNativeLocale(false, "en-US")'
    );

  await I18nStorage.ChangeNativeLocale(forceRTL, locale);
  await callback?.();
  Restart.Restart();
}

/**
 * @function GetNativeLocale
 * @description Get the native locale of the device
 * @returns {Promise<string | null>}
 */
export async function GetNativeLocale(): Promise<string | null> {
  return await methods.get();
}

/**
 * @function SetNativeLocale
 * @description Set the native locale of the device
 * @param locale {string}
 * @param callback {() => void | Promise<void>}
 * @returns {Promise<void>}
 */
export async function SetNativeLocale(
  locale: string,
  callback?: () => void | Promise<void>
): Promise<void> {
  if (typeof locale !== 'string')
    throw new Error(
      'SetNativeLocale requires a string, ie: SetNativeLocale("en-US")'
    );

  try {
    await methods.set(locale);
    await callback?.();
  } catch (error) {
    console.log(error);
  }
}

/**
 * @function ResetNativeLocale
 * @description Reset the native locale of the device
 * @param callback {() => void | Promise<void>}
 * @returns {Promise<void>}
 */
export async function ResetNativeLocale(
  callback?: () => void | Promise<void>
): Promise<void> {
  try {
    await methods.reset();
    await callback?.();
  } catch (error) {
    console.log(error);
  }
}
