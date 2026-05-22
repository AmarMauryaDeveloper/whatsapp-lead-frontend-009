import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, disabled, className = '', ...props }, ref) => {
  return (
    <label className="block text-sm font-medium text-text-secondary">
      <span>{label}</span>
      <input
        ref={ref}
        disabled={disabled}
        {...props}
        className={`input-theme mt-2 block w-full ${className}`}
      />
      {error && <span className="mt-2 block text-xs font-medium text-rose-500">{error}</span>}
    </label>
  );
});

Input.displayName = 'Input';
export default Input;
