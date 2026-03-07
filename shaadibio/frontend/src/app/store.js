import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import biodataReducer from '../features/biodata/biodataSlice';
import paymentReducer from '../features/payment/paymentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    biodata: biodataReducer,
    payment: paymentReducer,
  },
});
