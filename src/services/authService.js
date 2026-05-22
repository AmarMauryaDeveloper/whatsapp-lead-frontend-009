import api from './api.js';

const authService = {
  login: credentials => api.post('/auth/login', credentials),
  forgotPassword: email => api.post('/auth/forgot-password', { email }),
  resetPassword: data => api.post('/auth/reset-password', data),
};

export default authService;
