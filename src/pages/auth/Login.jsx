import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../redux/slices/authSlice.js';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import { getDefaultRoute } from '../../utils/permissions.js';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector(state => state.auth);
  const { register, handleSubmit, formState } = useForm({ mode: 'onTouched' });
  const { errors, isSubmitting } = formState;
  const isLoading = status === 'loading' || isSubmitting;

  // Redirect after successful login
  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('crm_user') || 'null');
        navigate(getDefaultRoute(user), { replace: true });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  const onSubmit = async data => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold">Sign in to CRM</h1>
        <p className="mt-2 text-sm text-text-muted">Manage WhatsApp leads, production workflows, and analytics from one platform.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input 
          label="Email" 
          type="email" 
          placeholder="hello@company.com" 
          disabled={isLoading}
          {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' } })} 
          error={errors.email?.message} 
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="Enter password" 
          disabled={isLoading}
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} 
          error={errors.password?.message} 
        />
        
        {error && (
          <div className="rounded-lg alert-error p-3">
            {error}
          </div>
        )}
        
        {status === 'succeeded' && (
          <div className="rounded-lg alert-success">
            Login successful! Redirecting...
          </div>
        )}
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className={`w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-text-muted">
        <p>
          Forgot your password? <Link to="/auth/forgot-password" className="font-medium text-brand-600 hover:text-brand-500">Reset here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
