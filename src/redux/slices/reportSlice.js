import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import reportService from '../../services/reportService.js';

export const fetchLeadReports = createAsyncThunk('report/fetchLeadReports', async (filters, thunkAPI) => {
  try {
    const response = await reportService.getLeadReports(filters);
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load lead reports' });
  }
});

export const fetchRevenueReports = createAsyncThunk('report/fetchRevenueReports', async (filters, thunkAPI) => {
  try {
    const response = await reportService.getRevenueReports(filters);
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load revenue reports' });
  }
});

export const fetchProductivityReports = createAsyncThunk('report/fetchProductivityReports', async (filters, thunkAPI) => {
  try {
    const response = await reportService.getProductivityReports(filters);
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load productivity reports' });
  }
});

const initialState = {
  leadReports: [],
  revenueReports: [],
  productivityReports: [],
  status: 'idle',
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Lead Reports
      .addCase(fetchLeadReports.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchLeadReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leadReports = action.payload;
      })
      .addCase(fetchLeadReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch lead reports';
      })
      // Revenue Reports
      .addCase(fetchRevenueReports.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchRevenueReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.revenueReports = action.payload;
      })
      .addCase(fetchRevenueReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch revenue reports';
      })
      // Productivity Reports
      .addCase(fetchProductivityReports.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductivityReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productivityReports = action.payload;
      })
      .addCase(fetchProductivityReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch productivity reports';
      });
  },
});

export const { clearError } = reportSlice.actions;
export default reportSlice.reducer;
