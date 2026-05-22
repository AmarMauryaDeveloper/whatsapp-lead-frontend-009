import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import deliveryService from '../../services/deliveryService.js';

export const fetchDeliveries = createAsyncThunk('delivery/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await deliveryService.getDeliveries();
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load deliveries' });
  }
});

export const fetchDeliveryById = createAsyncThunk('delivery/fetchById', async (id, thunkAPI) => {
  try {
    const response = await deliveryService.getDeliveryById(id);
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load delivery details' });
  }
});

export const updateDelivery = createAsyncThunk('delivery/updateDelivery', async ({ id, payload }, thunkAPI) => {
  try {
    const response = await deliveryService.updateDelivery(id, payload);
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to update delivery' });
  }
});

const initialState = {
  deliveries: [],
  selectedDelivery: null,
  status: 'idle',
  error: null,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch all
      .addCase(fetchDeliveries.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch deliveries';
      })
      // Fetch by ID
      .addCase(fetchDeliveryById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDeliveryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedDelivery = action.payload;
      })
      .addCase(fetchDeliveryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch delivery';
      })
      // Update delivery
      .addCase(updateDelivery.pending, state => {
        state.status = 'updating';
      })
      .addCase(updateDelivery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.deliveries.findIndex(d => d._id === action.payload._id);
        if (index > -1) state.deliveries[index] = action.payload;
      })
      .addCase(updateDelivery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update delivery';
      });
  },
});

export const { clearError } = deliverySlice.actions;
export default deliverySlice.reducer;
