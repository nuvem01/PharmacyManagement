// store.js
import { configureStore } from '@reduxjs/toolkit';
import pharmacyReducer from './pharmacySlice';

const store = configureStore({
  reducer: {
    pharmacy: pharmacyReducer,
  }
});

export default store;
