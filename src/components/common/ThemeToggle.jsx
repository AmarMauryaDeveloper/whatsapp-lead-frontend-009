import { FiMoon, FiSun } from 'react-icons/fi';

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
      className="focus-ring group relative inline-flex h-10 w-[4.75rem] items-center rounded-full border border-border-theme bg-muted p-1 shadow-sm transition hover:shadow-theme"
    >
      <span
        className={`absolute inset-y-1 grid h-8 w-8 place-items-center rounded-full bg-secondary text-text-primary shadow-theme transition-all duration-300 ${
          isDark ? 'translate-x-9' : 'translate-x-0'
        }`}
      >
        {isDark ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
      </span>
      <span className="grid w-full grid-cols-2 text-text-muted">
        <FiSun className="mx-auto h-4 w-4" />
        <FiMoon className="mx-auto h-4 w-4" />
      </span>
    </button>
  );
}

export default ThemeToggle;
