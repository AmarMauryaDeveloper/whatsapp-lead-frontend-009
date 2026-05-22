export const PERMISSIONS = {
  DASHBOARD_VIEW: 'dashboard:view',
  DASHBOARD_ADMIN: 'dashboard:admin',
  USERS_MANAGE: 'users:manage',
  ROLES_MANAGE: 'roles:manage',
  PERMISSIONS_MANAGE: 'permissions:manage',
  LEADS_VIEW: 'leads:view',
  LEADS_VIEW_ASSIGNED: 'leads:view_assigned',
  LEADS_CREATE: 'leads:create',
  LEADS_ASSIGN: 'leads:assign',
  LEADS_UPDATE_STATUS: 'leads:update_status',
  LEADS_COMMUNICATE: 'leads:communicate',
  WORKFLOW_MONITOR: 'workflow:monitor',
  WORKFLOW_OVERRIDE: 'workflow:override',
  DESIGN_VIEW: 'design:view',
  DESIGN_VIEW_ASSIGNED: 'design:view_assigned',
  DESIGN_UPDATE: 'design:update',
  DESIGN_UPLOAD: 'design:upload',
  PRINT_VIEW: 'print:view',
  PRINT_VIEW_ASSIGNED: 'print:view_assigned',
  PRINT_UPDATE: 'print:update',
  PRINT_QC: 'print:qc',
  DELIVERY_VIEW: 'delivery:view',
  DELIVERY_VIEW_ASSIGNED: 'delivery:view_assigned',
  DELIVERY_UPDATE: 'delivery:update',
  DELIVERY_UPLOAD_PROOF: 'delivery:upload_proof',
  REPORTS_VIEW_BASIC: 'reports:view_basic',
  REPORTS_VIEW_REVENUE: 'reports:view_revenue',
  REPORTS_EXPORT: 'reports:export',
  ACTIVITY_LOGS_VIEW: 'activity_logs:view',
  NOTIFICATIONS_VIEW: 'notifications:view',
  NOTIFICATIONS_MANAGE: 'notifications:manage',
  FILES_VIEW: 'files:view',
  FILES_UPLOAD: 'files:upload',
  SETTINGS_MANAGE: 'settings:manage',
  INTEGRATIONS_MANAGE: 'integrations:manage',
  RECORDS_DELETE: 'records:delete',
  DATA_VIEW_ALL: 'data:view_all',
};

export const hasPermission = (user, permission) => {
  if (!permission) return true;
  return user?.permissions?.includes(permission) ?? false;
};

export const hasAnyPermission = (user, permissions = []) => {
  if (!permissions.length) return true;
  return permissions.some(permission => hasPermission(user, permission));
};

export const routePermissions = {
  '/app/dashboard/admin': [PERMISSIONS.DASHBOARD_VIEW],
  '/app/dashboard/team': [PERMISSIONS.WORKFLOW_MONITOR],
  '/app/dashboard/analytics': [PERMISSIONS.REPORTS_VIEW_REVENUE],
  '/app/leads': [PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED],
  '/app/leads/assignment': [PERMISSIONS.LEADS_ASSIGN],
  '/app/design/tasks': [PERMISSIONS.DESIGN_VIEW, PERMISSIONS.DESIGN_VIEW_ASSIGNED],
  '/app/design/upload': [PERMISSIONS.DESIGN_UPLOAD],
  '/app/design/revisions': [PERMISSIONS.DESIGN_VIEW, PERMISSIONS.DESIGN_VIEW_ASSIGNED],
  '/app/design/approval': [PERMISSIONS.DESIGN_UPDATE],
  '/app/printing/queue': [PERMISSIONS.PRINT_VIEW, PERMISSIONS.PRINT_VIEW_ASSIGNED],
  '/app/printing/qc': [PERMISSIONS.PRINT_QC],
  '/app/printing/machines': [PERMISSIONS.PRINT_VIEW, PERMISSIONS.PRINT_VIEW_ASSIGNED],
  '/app/delivery/tracking': [PERMISSIONS.DELIVERY_VIEW, PERMISSIONS.DELIVERY_VIEW_ASSIGNED],
  '/app/delivery/dispatch': [PERMISSIONS.WORKFLOW_MONITOR],
  '/app/delivery/proof': [PERMISSIONS.DELIVERY_UPLOAD_PROOF],
  '/app/reports/leads': [PERMISSIONS.REPORTS_VIEW_BASIC],
  '/app/reports/revenue': [PERMISSIONS.REPORTS_VIEW_REVENUE],
  '/app/reports/productivity': [PERMISSIONS.REPORTS_VIEW_BASIC],
  '/app/settings': [PERMISSIONS.SETTINGS_MANAGE],
  '/app/logs': [PERMISSIONS.ACTIVITY_LOGS_VIEW],
};

export const getDefaultRoute = user => {
  const orderedRoutes = [
    '/app/dashboard/admin',
    '/app/leads',
    '/app/design/tasks',
    '/app/printing/queue',
    '/app/delivery/tracking',
  ];

  return orderedRoutes.find(path => hasAnyPermission(user, routePermissions[path])) || '/auth';
};
