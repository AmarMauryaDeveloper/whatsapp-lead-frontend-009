import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import designService from '../../services/designService.js';

export const fetchDesignTasks = createAsyncThunk('design/fetchTasks', async (_, thunkAPI) => {
  try {
    const response = await designService.getTasks();
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load design tasks' });
  }
});

export const fetchDesignById = createAsyncThunk('design/fetchById', async (id, thunkAPI) => {
  try {
    const response = await designService.getTaskById(id);
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to load design details' });
  }
});

export const updateDesignTask = createAsyncThunk('design/updateTask', async ({ id, payload }, thunkAPI) => {
  try {
    const response = await designService.updateTask(id, payload);
    return response.data?.data || response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || { message: 'Unable to update design task' });
  }
});

const initialState = {
  tasks: [],
  selectedTask: null,
  status: 'idle',
  error: null,
};

const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch tasks
      .addCase(fetchDesignTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDesignTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchDesignTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch design tasks';
      })
      // Fetch by ID
      .addCase(fetchDesignById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDesignById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedTask = action.payload;
      })
      .addCase(fetchDesignById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch design task';
      })
      // Update task
      .addCase(updateDesignTask.pending, state => {
        state.status = 'updating';
      })
      .addCase(updateDesignTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex(t => t._id === action.payload._id);
        if (index > -1) state.tasks[index] = action.payload;
      })
      .addCase(updateDesignTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to update design task';
      });
  },
});

export const { clearError } = designSlice.actions;
export default designSlice.reducer;
