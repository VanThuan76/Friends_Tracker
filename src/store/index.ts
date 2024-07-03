import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import { persistStore, persistReducer } from 'redux-persist'
import { Persistor } from 'redux-persist/es/types'
import logger from 'redux-logger'

import { LocalStorage } from '@/shared/utils/localStorage';
import appSlice from './appSlice';

enableMapSet();

const persistConfig = {
    key: 'root',
    storage: LocalStorage
};

const persistedReducer = persistReducer(persistConfig, appSlice);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor: Persistor = persistStore(store)
