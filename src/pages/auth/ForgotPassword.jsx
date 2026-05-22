import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import authService from '../../services/authService.js';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState } = useForm({ mode: 'onTouched' });
  const { errors, isSubmitting } = formState;
  const isLoading = loading || isSubmitting;

  const onSubmit = async data => {
    setLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(data.email);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to request password reset. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold">Check your email</h1>
          <p className="mt-2 text-sm text-text-muted">If an account exists with that email, you'll receive a password reset link shortly.</p>
        </div>
        <div className="rounded-lg alert-success mb-6">
          ✓ Reset link sent successfully
        </div>
        <Link to="/auth" className="block text-center text-sm text-brand-600 hover:text-brand-500">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold">Reset your password</h1>
        <p className="mt-2 text-sm text-text-muted">Enter your account email and we'll send a recovery link.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input 
          label="Email" 
          type="email" 
          placeholder="email@domain.com" 
          disabled={isLoading}
          {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' } })} 
          error={errors.email?.message} 
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
          {isLoading ? 'Sending...' : 'Send reset link'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-text-muted">
        <Link to="/auth" className="font-medium text-brand-600 hover:text-brand-500">Back to login</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
