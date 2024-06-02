import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/user/userSlice';
import cateringFilterReducer from './features/user/cateringFilterSlice';
import tiffinFilterReducer from './features/tiffin/tiffinFilterSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedFilterReducer = persistReducer(persistConfig, cateringFilterReducer);
const persistedFilterTiffinReducer = persistReducer(persistConfig, tiffinFilterReducer);

const rootReducer = {
  user: persistedUserReducer,
  cateringFilter: persistedFilterReducer,
  tiffinFilter: persistedFilterTiffinReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
