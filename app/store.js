import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/user/userSlice';
import cateringFilterReducer from './features/user/cateringFilterSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const rootReducer = {
  user: persistedUserReducer,
  cateringFilter: cateringFilterReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
