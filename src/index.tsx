/**
 * @author @ahmedrowaihi
 * @license MIT
 */
import Restart from 'react-native-restart';
import { I18nStorage } from './module';
import { methods } from './services';
import { I18nStorageSchema } from './types';
import { createStoreObject } from './utils';
export * from './constants';

/**
 * @function setI18nStorage
 * @description Set the I18nStorage and restart the app
 * @param locale {string}
 * @param forceRTL {boolean}
 * @param allowRTL {boolean}
 * @param beforeRestart {() => void | Promise<void>}
 * @param restart {boolean}
 * @returns {Promise<void> | void}
 */
export async function setI18nStorage(
  props: I18nStorageSchema,
  beforeRestart?: () => void | Promise<void>,
  restart: boolean = true
): Promise<void> {
  const payload = createStoreObject(props);
  await I18nStorage.setI18nStorage(payload);
  await methods.set(payload);
  await beforeRestart?.();
  if (restart) Restart.Restart();
}

/**
 * @function getI18nStorage
 * @description Get the I18nStorage
 * @returns {Promise<string | null>}
 */
export async function getI18nStorage(): Promise<I18nStorageSchema | undefined> {
  return await methods.get();
}

/**
 * @function resetI18nStorage
 * @description Reset the native locale of the device
 * @param callback {() => void | Promise<void>}
 * @returns {Promise<void>}
 */
export async function resetI18nStorage(
  beforeRestart?: () => void | Promise<void>,
  restart: boolean = true
): Promise<void> {
  try {
    await I18nStorage.setI18nStorage('{}');
    await methods.reset();
    await beforeRestart?.();
    if (restart) Restart.Restart();
  } catch (error) {
    console.log(error);
  }
}
