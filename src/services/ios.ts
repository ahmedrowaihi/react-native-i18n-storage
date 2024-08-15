import { Settings } from 'react-native';
import { I18nStorageKey } from '../constants';
import { I18nStorageSchema } from 'src/types';
export const iosMethods = {
  /**
   * @function Get a value from storage
   * @description Get a value from storage
   * @returns {Promise<I18nStorageSchema | undefined>}
   */
  async get(): Promise<I18nStorageSchema | undefined> {
    return await new Promise((resolve, reject) => {
      let value;
      try {
        const i18nSettings = Settings.get(JSON.parse(I18nStorageKey));
        value = i18nSettings ? i18nSettings : undefined;
        resolve(value);
      } catch (error) {
        console.error(error);
        value = undefined;
        reject(value);
      }
    });
  },
  /**
   * @function Set a value to storage
   * @param value {string}
   * @returns {Promise<void>}
   */
  async set(value: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      try {
        Settings.set({ [I18nStorageKey]: value });
        resolve();
      } catch (error) {
        console.error(error);
        reject();
      }
    });
  },
  /**
   * @function Reset storage
   * @returns {Promise<void>}
   * @description Reset storage
   * @returns {Promise<boolean>}
   */
  async reset(): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      try {
        Settings.set({ [I18nStorageKey]: null });
        resolve(true);
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  },
};
