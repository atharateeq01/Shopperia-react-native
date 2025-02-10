import { configureStore } from '@reduxjs/toolkit';
import app from '@/slices/app.slice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    app,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: true,
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
