import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';

const store = configureStore({
  reducer: {
    dashboards: dashboardReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
