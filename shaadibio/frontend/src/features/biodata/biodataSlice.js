import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import biodataService from './biodataService';

const initialState = {
  biodatas: [],
  currentBiodata: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new biodata
export const createBiodata = createAsyncThunk(
  'biodata/create',
  async (biodataData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await biodataService.createBiodata(biodataData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user biodatas
export const getBiodatas = createAsyncThunk(
  'biodata/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await biodataService.getBiodatas(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get specific biodata
export const getBiodata = createAsyncThunk(
  'biodata/getOne',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await biodataService.getBiodata(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update biodata
export const updateBiodata = createAsyncThunk(
  'biodata/update',
  async ({ id, biodataData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await biodataService.updateBiodata(id, biodataData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const biodataSlice = createSlice({
  name: 'biodata',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    resetCurrentBiodata: (state) => {
       state.currentBiodata = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBiodata.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBiodata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // The API returns { message: "Biodata created successfully" } 
        // We usually don't push that to the array, instead we fetch afterwards.
      })
      .addCase(createBiodata.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBiodatas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBiodatas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.biodatas = action.payload;
      })
      .addCase(getBiodatas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBiodata.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBiodata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentBiodata = action.payload;
      })
      .addCase(getBiodata.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBiodata.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBiodata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateBiodata.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetCurrentBiodata } = biodataSlice.actions;
export default biodataSlice.reducer;
