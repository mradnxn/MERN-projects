import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from './paymentService';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Upgrade to Premium
export const upgradeToPremium = createAsyncThunk('payment/upgrade', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await paymentService.upgradeToPremium(token);
  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upgradeToPremium.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeToPremium.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // User update is handled in authSlice!
      })
      .addCase(upgradeToPremium.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
