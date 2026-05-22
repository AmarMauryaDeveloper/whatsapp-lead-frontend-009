import { useMemo } from 'react';
import useAuth from './useAuth.js';
import { hasAnyPermission, hasPermission } from '../utils/permissions.js';

export default function usePermissions() {
  const { user } = useAuth();
  return useMemo(() => {
    return {
      can: permission => hasPermission(user, permission),
      canAny: permissions => hasAnyPermission(user, permissions),
      role: user?.role || 'Guest',
      permissions: user?.permissions || [],
    };
  }, [user]);
}
