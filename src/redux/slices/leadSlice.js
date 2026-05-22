import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import leadService from '../../services/leadService.js';

export const fetchLeads = createAsyncThunk('lead/fetchLeads', async (_, thunkAPI) => {
  try {
    const response = await leadService.getLeads();
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load leads' });
  }
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLeads.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Lead fetch failed';
      });
  },
});

export default leadSlice.reducer;
