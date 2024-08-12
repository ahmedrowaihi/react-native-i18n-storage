import sharedprefernces from 'react-native-shared-preferences';
import { I18nStorageKey } from '../constants';
import { I18nStorageSchema } from 'src/types';
export const AndroidMethods = {
  /**
   * @function Get a value from storage
   * @description Get a value from storage
   * @returns {Promise<I18nStorageSchema | undefined>}
   */
  async get(): Promise<I18nStorageSchema | undefined> {
    try {
      const i18nAsyncStorage = await new Promise<string | null>((resolve) => {
        sharedprefernces.getItem(I18nStorageKey, (value) => resolve(value));
      });
      if (!i18nAsyncStorage) return undefined;
      return JSON.parse(i18nAsyncStorage);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  /**
   * @function Set a value to storage
   * @param value {string}
   * @returns {Promise<void>}
   * @description Set a value to storage
   */
  async set(value: string): Promise<void> {
    try {
      const i18nStorage = JSON.stringify(value);
      await new Promise<void>((resolve) => {
        sharedprefernces.setItem(I18nStorageKey, i18nStorage);
        resolve();
      });
      return;
    } catch (error) {
      console.error(error);
    }
  },
  /**
   * @function Reset storage
   * @description Reset storage
   * @returns {Promise<boolean>}
   * @description Reset storage
   */
  async reset(): Promise<boolean> {
    try {
      await sharedprefernces.removeItem(I18nStorageKey);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
