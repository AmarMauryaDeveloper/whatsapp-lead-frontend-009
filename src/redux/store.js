import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import leadReducer from './slices/leadSlice.js';
import designReducer from './slices/designSlice.js';
import printReducer from './slices/printSlice.js';
import deliveryReducer from './slices/deliverySlice.js';
import reportReducer from './slices/reportSlice.js';
import notificationReducer from './slices/notificationSlice.js';
import uiReducer from './slices/uiSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    lead: leadReducer,
    design: designReducer,
    print: printReducer,
    delivery: deliveryReducer,
    report: reportReducer,
    notifications: notificationReducer,
    ui: uiReducer,
  },
});

export default store;
