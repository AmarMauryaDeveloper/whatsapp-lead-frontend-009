import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import printService from '../../services/printService.js';

export const fetchPrintJobs = createAsyncThunk('print/fetchJobs', async (_, thunkAPI) => {
  try {
    const response = await printService.getJobs();
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load print jobs' });
  }
});

export const fetchPrintJobById = createAsyncThunk('print/fetchById', async (id, thunkAPI) => {
  try {
    const response = await printService.getJobById(id);
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load print job details' });
  }
});

export const updatePrintJob = createAsyncThunk('print/updateJob', async ({ id, payload }, thunkAPI) => {
  try {
    const response = await printService.updateJob(id, payload);
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to update print job' });
  }
});

const initialState = {
  jobs: [],
  selectedJob: null,
  status: 'idle',
  error: null,
};

const printSlice = createSlice({
  name: 'print',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch jobs
      .addCase(fetchPrintJobs.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPrintJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchPrintJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch print jobs';
      })
      // Fetch by ID
      .addCase(fetchPrintJobById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPrintJobById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedJob = action.payload;
      })
      .addCase(fetchPrintJobById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch print job';
      })
      // Update job
      .addCase(updatePrintJob.pending, state => {
        state.status = 'updating';
      })
      .addCase(updatePrintJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.jobs.findIndex(j => j._id === action.payload._id);
        if (index > -1) state.jobs[index] = action.payload;
      })
      .addCase(updatePrintJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update print job';
      });
  },
});

export const { clearError } = printSlice.actions;
export default printSlice.reducer;
