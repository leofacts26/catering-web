import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/user/userSlice';
import cateringFilterReducer from './features/user/cateringFilterSlice';
import tiffinFilterReducer from './features/tiffin/tiffinFilterSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cateringFilter: cateringFilterReducer,
  tiffinFilter: tiffinFilterReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cateringFilter', 'tiffinFilter'], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
