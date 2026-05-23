import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx';
import RoleBasedRoute from './routes/RoleBasedRoute.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import PageLoader from './components/loaders/PageLoader.jsx';
import { getDefaultRoute, PERMISSIONS } from './utils/permissions.js';
import useAuth from './hooks/useAuth.js';

const Login = lazy(() => import('./pages/auth/Login.jsx'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword.jsx'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard.jsx'));
const TeamDashboard = lazy(() => import('./pages/dashboard/TeamDashboard.jsx'));
const AnalyticsDashboard = lazy(() => import('./pages/dashboard/AnalyticsDashboard.jsx'));
const LeadListing = lazy(() => import('./pages/leads/LeadListing.jsx'));
const LeadDetails = lazy(() => import('./pages/leads/LeadDetails.jsx'));
const LeadTimeline = lazy(() => import('./pages/leads/LeadTimeline.jsx'));
const CreateCallEntry = lazy(() => import('./pages/leads/CreateCallEntry.jsx'));
const AssignmentPanel = lazy(() => import('./pages/leads/AssignmentPanel.jsx'));
const DesignTasks = lazy(() => import('./pages/design/DesignTasks.jsx'));
const FileUpload = lazy(() => import('./pages/design/FileUpload.jsx'));
const RevisionHistory = lazy(() => import('./pages/design/RevisionHistory.jsx'));
const ApprovalScreen = lazy(() => import('./pages/design/ApprovalScreen.jsx'));
const PrintQueue = lazy(() => import('./pages/printing/PrintQueue.jsx'));
const QCChecklist = lazy(() => import('./pages/printing/QCChecklist.jsx'));
const MachineStatus = lazy(() => import('./pages/printing/MachineStatus.jsx'));
const DeliveryTracking = lazy(() => import('./pages/delivery/DeliveryTracking.jsx'));
const DispatchManagement = lazy(() => import('./pages/delivery/DispatchManagement.jsx'));
const ProofUpload = lazy(() => import('./pages/delivery/ProofUpload.jsx'));
const LeadReports = lazy(() => import('./pages/reports/LeadReports.jsx'));
const RevenueReports = lazy(() => import('./pages/reports/RevenueReports.jsx'));
const ProductivityReports = lazy(() => import('./pages/reports/ProductivityReports.jsx'));
const Settings = lazy(() => import('./pages/settings/Settings.jsx'));
const ActivityLogs = lazy(() => import('./pages/logs/ActivityLogs.jsx'));

function App() {
  const { user } = useAuth();
  const ProtectedPage = ({ permissions, children }) => (
    <RoleBasedRoute permissions={permissions}>
      <AdminLayout>{children}</AdminLayout>
    </RoleBasedRoute>
  );

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/app" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<Navigate to={getDefaultRoute(user).replace('/app/', '')} replace />} />
          <Route path="dashboard/admin" element={<ProtectedPage permissions={[PERMISSIONS.DASHBOARD_VIEW]}><AdminDashboard /></ProtectedPage>} />
          <Route path="dashboard/team" element={<ProtectedPage permissions={[PERMISSIONS.WORKFLOW_MONITOR]}><TeamDashboard /></ProtectedPage>} />
          <Route path="dashboard/analytics" element={<ProtectedPage permissions={[PERMISSIONS.REPORTS_VIEW_REVENUE]}><AnalyticsDashboard /></ProtectedPage>} />

          <Route path="leads" element={<ProtectedPage permissions={[PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED]}><LeadListing /></ProtectedPage>} />
          <Route path="leads/call-entry" element={<ProtectedPage permissions={[PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED]}><CreateCallEntry /></ProtectedPage>} />
          <Route path="leads/call-entry-list" element={<ProtectedPage permissions={[PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED]}><LeadListing /></ProtectedPage>} />
          <Route path="leads/:id" element={<ProtectedPage permissions={[PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED]}><LeadDetails /></ProtectedPage>} />
          <Route path="leads/:id/timeline" element={<ProtectedPage permissions={[PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED]}><LeadTimeline /></ProtectedPage>} />
          <Route path="leads/assignment" element={<ProtectedPage permissions={[PERMISSIONS.LEADS_ASSIGN]}><AssignmentPanel /></ProtectedPage>} />

          <Route path="design/tasks" element={<ProtectedPage permissions={[PERMISSIONS.DESIGN_VIEW, PERMISSIONS.DESIGN_VIEW_ASSIGNED]}><DesignTasks /></ProtectedPage>} />
          <Route path="design/upload" element={<ProtectedPage permissions={[PERMISSIONS.DESIGN_UPLOAD]}><FileUpload /></ProtectedPage>} />
          <Route path="design/revisions" element={<ProtectedPage permissions={[PERMISSIONS.DESIGN_VIEW, PERMISSIONS.DESIGN_VIEW_ASSIGNED]}><RevisionHistory /></ProtectedPage>} />
          <Route path="design/approval" element={<ProtectedPage permissions={[PERMISSIONS.DESIGN_UPDATE]}><ApprovalScreen /></ProtectedPage>} />

          <Route path="printing/queue" element={<ProtectedPage permissions={[PERMISSIONS.PRINT_VIEW, PERMISSIONS.PRINT_VIEW_ASSIGNED]}><PrintQueue /></ProtectedPage>} />
          <Route path="printing/qc" element={<ProtectedPage permissions={[PERMISSIONS.PRINT_QC]}><QCChecklist /></ProtectedPage>} />
          <Route path="printing/machines" element={<ProtectedPage permissions={[PERMISSIONS.PRINT_VIEW, PERMISSIONS.PRINT_VIEW_ASSIGNED]}><MachineStatus /></ProtectedPage>} />

          <Route path="delivery/tracking" element={<ProtectedPage permissions={[PERMISSIONS.DELIVERY_VIEW, PERMISSIONS.DELIVERY_VIEW_ASSIGNED]}><DeliveryTracking /></ProtectedPage>} />
          <Route path="delivery/dispatch" element={<ProtectedPage permissions={[PERMISSIONS.WORKFLOW_MONITOR]}><DispatchManagement /></ProtectedPage>} />
          <Route path="delivery/proof" element={<ProtectedPage permissions={[PERMISSIONS.DELIVERY_UPLOAD_PROOF]}><ProofUpload /></ProtectedPage>} />

          <Route path="reports/leads" element={<ProtectedPage permissions={[PERMISSIONS.REPORTS_VIEW_BASIC]}><LeadReports /></ProtectedPage>} />
          <Route path="reports/revenue" element={<ProtectedPage permissions={[PERMISSIONS.REPORTS_VIEW_REVENUE]}><RevenueReports /></ProtectedPage>} />
          <Route path="reports/productivity" element={<ProtectedPage permissions={[PERMISSIONS.REPORTS_VIEW_BASIC]}><ProductivityReports /></ProtectedPage>} />

          <Route path="settings" element={<ProtectedPage permissions={[PERMISSIONS.SETTINGS_MANAGE]}><Settings /></ProtectedPage>} />
          <Route path="logs" element={<ProtectedPage permissions={[PERMISSIONS.ACTIVITY_LOGS_VIEW]}><ActivityLogs /></ProtectedPage>} />
        </Route>

        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
