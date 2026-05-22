import { Outlet } from 'react-router-dom';
function DashboardLayout() {
  return (
    <div className="app-shell">
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
