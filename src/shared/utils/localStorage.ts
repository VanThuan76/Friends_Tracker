import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist/es/types';
import { decryptData, encryptData } from './encryption';

interface StorageType extends Storage {
    setItem(key: string, value: unknown, isEncrypted?: boolean): Promise<boolean>;

    getItem(key: string, isDecrypted?: boolean): Promise<unknown>;

    removeItem(key: string): Promise<boolean>;

    clearData(): Promise<boolean>;
}

export const storage = new MMKV();

export const LocalStorage: StorageType = {
    setItem: async (key: string, value: unknown, isEncrypted?: boolean): Promise<boolean> => {
        try {
            const dataToStore = isEncrypted === false ? JSON.stringify(value) : encryptData(value);
            storage.set(key, dataToStore);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.resolve(false);
        }
    },
    getItem: async (key: string, isDecrypted?: boolean): Promise<unknown> => {
        try {
            const value = storage.getString(key);
            if (value) {
                return Promise.resolve(isDecrypted === false ? JSON.parse(value) : decryptData(value));
            }
            return Promise.resolve(value);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    removeItem: async (key: string): Promise<boolean> => {
        try {
            storage.delete(key);
            return Promise.resolve(true);
        } catch (error) {
            return Promise.resolve(false);
        }
    },
    clearData: async (): Promise<boolean> => {
        try {
            storage.clearAll();
            return Promise.resolve(true);
        } catch (error) {
            return Promise.resolve(false);
        }
    },
};
