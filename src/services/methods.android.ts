import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nStorageKey } from '../constants';
export const AndroidMethods = {
  /**
   * @function Get a value from storage
   * @description Get a value from storage
   * @returns {Promise<string | null>}
   */
  async get(): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(I18nStorageKey);
      return value || null;
    } catch (error) {
      console.error(error);
      return null;
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
      return await AsyncStorage.setItem(I18nStorageKey, value);
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
      await AsyncStorage.removeItem(I18nStorageKey);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
