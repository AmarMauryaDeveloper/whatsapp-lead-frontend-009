export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRules = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
};
