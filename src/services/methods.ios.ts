import { Settings } from 'react-native';
import { I18nStorageKey } from '../constants';
export const iosMethods = {
  /**
   * @function Get a value from storage
   * @description Get a value from storage
   * @returns {Promise<string | null>}
   */
  async get(): Promise<string | null> {
    return await new Promise((resolve, reject) => {
      let value = null;
      try {
        value = Settings.get(I18nStorageKey);
        resolve(value);
      } catch (error) {
        console.error(error);
        value = null;
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
