import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiLogOut, FiSearch } from 'react-icons/fi';
import { toggleTheme } from '../../redux/slices/uiSlice.js';
import { logout } from '../../redux/slices/authSlice.js';
import useAuth from '../../hooks/useAuth.js';
import ThemeToggle from './ThemeToggle.jsx';

function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector(state => state.ui);
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <header className="topbar-bg sticky top-0 z-20 border-b px-4 py-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1 basis-64">
          <div className="flex items-center gap-3 rounded-2xl border border-border-theme bg-muted/70 px-3 text-text-muted transition focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
            <FiSearch className="h-5 w-5" />
            <input
              type="search"
              placeholder="Search leads, tasks, reports..."
              className="w-full bg-transparent py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle theme={theme} onToggle={() => dispatch(toggleTheme())} />
          <button className="focus-ring rounded-xl border border-border-theme bg-secondary px-3 py-2 text-text-secondary shadow-sm transition hover:bg-hover/70" aria-label="Open notifications">
            <FiBell className="h-5 w-5" />
          </button>
          <div className="hidden rounded-2xl bg-muted px-4 py-2 text-sm font-medium text-text-secondary sm:block">
            {user?.name || 'Guest'}
          </div>
          <button onClick={handleLogout} className="focus-ring rounded-xl border border-border-theme bg-secondary px-3 py-2 text-text-secondary shadow-sm transition hover:border-rose-400/60 hover:bg-rose-500/10 hover:text-rose-500" title="Logout" aria-label="Logout">
            <FiLogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
