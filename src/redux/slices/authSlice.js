import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/authService.js';

const token = localStorage.getItem('crm_token');
const user = localStorage.getItem('crm_user');

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await authService.login(credentials);
    // Handle both nested (data.data) and direct (data) response formats
    const data = response.data?.data || response.data;
    if (!data || !data.token) {
      throw new Error('Invalid login response from server');
    }
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    return thunkAPI.rejectWithValue({ message });
  }
});

const initialState = {
  token: token || null,
  user: (user && user !== 'undefined') ? JSON.parse(user) : null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('crm_token');
      localStorage.removeItem('crm_user');
    },
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = 'idle';
      state.error = null;
      localStorage.setItem('crm_token', action.payload.token);
      localStorage.setItem('crm_user', JSON.stringify(action.payload.user));
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem('crm_token', action.payload.token);
        localStorage.setItem('crm_user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Unable to login';
        state.token = null;
        state.user = null;
      });
  },
});

export const { logout, setCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;
