import Sidebar, { MobileNav } from '../components/common/Sidebar.jsx';
import Topbar from '../components/common/Topbar.jsx';
import ToastContainer from '../components/notifications/ToastContainer.jsx';
import { useSelector } from 'react-redux';
import useSocket from '../hooks/useSocket.js';

function AdminLayout({ children }) {
  const { sidebarOpen } = useSelector(state => state.ui);
  useSocket();

  return (
    <div className="app-shell">
      <div className="flex h-screen overflow-hidden">
        <Sidebar open={sidebarOpen} />
        <div className="flex-1 overflow-y-auto">
          <Topbar />
          <main className="mx-auto w-full max-w-screen-2xl p-4 pb-28 sm:p-6 md:pb-6 xl:p-8">{children}</main>
        </div>
      </div>
      <MobileNav />
      <ToastContainer />
    </div>
  );
}

export default AdminLayout;
