import { iosMethods as ios } from './ios';
import { AndroidMethods as android } from './android';
import { Device } from '../constants';
export const methods = Device === 'ios' ? ios : android;
