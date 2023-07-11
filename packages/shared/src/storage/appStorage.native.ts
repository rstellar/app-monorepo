import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKVLoader } from 'react-native-mmkv-storage';

// ERROR: (init localStorage in web, but ext background cannot support localStorage)
//    redux-persist failed to create sync storage. falling back to noop storage.
// import storage from 'redux-persist/lib/storage';

import debugLogger from '../logger/debugLogger';

import { createPrintMethod } from './createPrintMethod';
import MockStorage from './MockStorage';

import type { Storage } from 'redux-persist';

const MMKVStorage = new MMKVLoader().initialize();

// const appStorage: AsyncStorageStatic = // iOS/Android AsyncStorage
//   AsyncStorage;

const appStorage: Storage = {
  async getItem(key) {
    try {
      const res = await MMKVStorage.getItem(key);
      if (res) {
        // Using new storage system
        return res;
      }
    } catch {
      // Fail silently
    }

    // Using old storage system, should only happen once
    try {
      const res = await AsyncStorage.getItem(key);
      if (res) {
        // Using old storage system
        return res;
      }
    } catch (error) {
      debugLogger.common.error(error, { message: 'Failed to run migration' });
      throw new Error('Failed async storage storage fetch.');
    }

    return null;
  },
  async setItem(key, value) {
    try {
      return await MMKVStorage.setItem(key, value);
    } catch (error) {
      debugLogger.common.error(error, { message: 'Failed to set item' });
    }
  },
  removeItem(key) {
    try {
      return MMKVStorage.removeItem(key);
    } catch (error) {
      debugLogger.common.error(error, { message: 'Failed to remove item' });
    }
  },
};

export const mockStorage = new MockStorage();

/*
- Extension internal: ExtensionStorage
- Extension injected: AsyncStorage -> window.localStorage
- App: AsyncStorage -> RN AsyncStorage
- Desktop | Web: WebStorage -> IndexedDB
 */

if (process.env.NODE_ENV !== 'production') {
  global.$$appStorage = appStorage;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  global.$$appStorage.print = createPrintMethod({ storage: AsyncStorage });
}

export default appStorage;
