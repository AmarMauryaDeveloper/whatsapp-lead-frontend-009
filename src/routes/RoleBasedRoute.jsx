import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { getDefaultRoute, hasAnyPermission } from '../utils/permissions.js';

function RoleBasedRoute({ allowedRoles = [], permissions = [], children }) {
  const { user } = useAuth();
  const roleAllowed = !allowedRoles.length || allowedRoles.includes(user?.role);
  const permissionAllowed = hasAnyPermission(user, permissions);

  if (!user || !roleAllowed || !permissionAllowed) {
    return <Navigate to={getDefaultRoute(user)} replace />;
  }
  return children;
}

export default RoleBasedRoute;
