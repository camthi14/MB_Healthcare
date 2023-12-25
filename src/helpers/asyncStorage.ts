import { appActions } from "@/features/app";
import store from "@/stores/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Callback,
  CallbackWithResult,
} from "@react-native-async-storage/async-storage/lib/typescript/types";

const hashKey = (key: string) => `@CoolTeHy:${key}`;
const passKey = (key: string) => key.replace(`@CoolTeHy:`, ``);

class AsyncStorageCommon {
  static setItem = async (key: string, value: string, callback?: Callback | undefined) => {
    store.dispatch(appActions.asyncStoreChange(true));
    await AsyncStorage.setItem(hashKey(key), value, callback);
  };

  static getItem = async (key: string, callback?: CallbackWithResult<string> | undefined) => {
    const response = await AsyncStorage.getItem(hashKey(key), callback);
    return response;
  };

  static removeItem = async (key: string, callback?: Callback | undefined) => {
    await AsyncStorage.removeItem(hashKey(key), callback);
  };

  static clear = async () => {
    await AsyncStorage.clear();
  };

  static getMultiple = async <T>(keys: string[]): Promise<T> => {
    const response = await AsyncStorage.multiGet(keys.map((k) => hashKey(k)));
    return response.reduce((obj, value) => ({ ...obj, [passKey(value[0])]: value[1] }), {}) as T;
  };
}

export default AsyncStorageCommon;
