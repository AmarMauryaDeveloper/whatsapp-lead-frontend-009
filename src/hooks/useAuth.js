import { useSelector } from 'react-redux';

export default function useAuth() {
  const auth = useSelector(state => state.auth);
  return {
    isAuthenticated: Boolean(auth.token),
    user: auth.user,
    authState: auth,
  };
}
