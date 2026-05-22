function Button({ children, className = '', variant = 'primary', disabled = false, ...props }) {
  const base = 'focus-ring inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50';
  const styles = {
    primary: 'bg-brand-600 text-text-on-accent shadow-glow hover:bg-brand-700 disabled:hover:bg-brand-600',
    secondary: 'border border-border-theme bg-secondary text-text-primary shadow-sm hover:bg-hover/70',
    danger: 'bg-rose-600 text-text-on-accent shadow-sm hover:bg-rose-700 disabled:hover:bg-rose-600',
  };
  return (
    <button 
      disabled={disabled}
      className={`${base} ${styles[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
