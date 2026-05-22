import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, Link } from 'react-router-dom';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import authService from '../../services/authService.js';

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, formState, watch } = useForm({ mode: 'onTouched' });
  const { errors, isSubmitting } = formState;
  const password = watch('password');
  const isLoading = loading || isSubmitting;

  const onSubmit = async data => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = searchParams.get('token');
      if (!token) {
        setError('Invalid or missing reset token');
        return;
      }
      
      await authService.resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold">Password reset successful</h1>
          <p className="mt-2 text-sm text-text-muted">Your password has been updated. You can now login with your new password.</p>
        </div>
        <div className="rounded-lg alert-success mb-6">
          ✓ Password updated successfully
        </div>
        <Link to="/auth" className="block rounded-2xl bg-brand-600 px-4 py-3 text-center font-semibold text-text-on-accent transition hover:bg-brand-700">
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold">Update password</h1>
        <p className="mt-2 text-sm text-text-muted">Create a strong password to get back into your account.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input 
          label="New Password" 
          type="password" 
          placeholder="New password" 
          disabled={isLoading}
          {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters required' } })} 
          error={errors.password?.message} 
        />
        
        <Input 
          label="Confirm Password" 
          type="password" 
          placeholder="Confirm password" 
          disabled={isLoading}
          {...register('confirmPassword', { required: 'Please confirm your password', validate: value => value === password || 'Passwords must match' })} 
          error={errors.confirmPassword?.message} 
        />
        
        {error && (
          <div className="rounded-lg alert-error p-3">
            {error}
          </div>
        )}
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Updating...' : 'Update password'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-text-muted">
        <Link to="/auth" className="font-medium text-brand-600 hover:text-brand-500">Back to login</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
