import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/slices/uiSlice.js';

export default function ThemeProvider({ children }) {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = event => {
      if (!window.localStorage.getItem('theme')) {
        dispatch(setTheme(event.matches ? 'dark' : 'light'));
      }
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [dispatch]);

  return children;
}
