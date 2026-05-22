import { NavLink } from 'react-router-dom';
import { FiBarChart2, FiFileText, FiHome, FiLayers, FiMenu, FiPrinter, FiSettings, FiTruck, FiUsers } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/slices/uiSlice.js';
import useAuth from '../../hooks/useAuth.js';
import { hasAnyPermission, PERMISSIONS } from '../../utils/permissions.js';

const navItems = [
  { label: 'Dashboard', path: '/app/dashboard/admin', icon: FiHome, permissions: [PERMISSIONS.DASHBOARD_VIEW] },
  { label: 'Leads', path: '/app/leads', icon: FiUsers, permissions: [PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED] },
  { label: 'Design', path: '/app/design/tasks', icon: FiLayers, permissions: [PERMISSIONS.DESIGN_VIEW, PERMISSIONS.DESIGN_VIEW_ASSIGNED] },
  { label: 'Printing', path: '/app/printing/queue', icon: FiPrinter, permissions: [PERMISSIONS.PRINT_VIEW, PERMISSIONS.PRINT_VIEW_ASSIGNED] },
  { label: 'Delivery', path: '/app/delivery/tracking', icon: FiTruck, permissions: [PERMISSIONS.DELIVERY_VIEW, PERMISSIONS.DELIVERY_VIEW_ASSIGNED] },
  { label: 'Reports', path: '/app/reports/leads', icon: FiBarChart2, permissions: [PERMISSIONS.REPORTS_VIEW_BASIC, PERMISSIONS.REPORTS_VIEW_REVENUE] },
  { label: 'Settings', path: '/app/settings', icon: FiSettings, permissions: [PERMISSIONS.SETTINGS_MANAGE] },
  { label: 'Logs', path: '/app/logs', icon: FiFileText, permissions: [PERMISSIONS.ACTIVITY_LOGS_VIEW] },
];

function Sidebar({ open }) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const visibleItems = navItems.filter(item => hasAnyPermission(user, item.permissions));

  return (
    <aside className={`sidebar-bg hidden border-r transition-all duration-300 ease-in-out md:block ${open ? 'w-72' : 'w-20'}`}> 
      <div className="flex h-full flex-col p-4">
        <div className="mb-8 flex items-center justify-between gap-3">
          <span className={`truncate text-lg font-semibold tracking-tight text-text-primary ${open ? 'opacity-100' : 'opacity-0'} transition-opacity`}>WhatsApp CRM</span>
          <button onClick={() => dispatch(toggleSidebar())} className="focus-ring rounded-full bg-muted p-2 text-text-secondary transition hover:bg-hover/80">
            <span className="sr-only">Toggle sidebar</span>
            <FiMenu className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          {visibleItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-3 py-3 transition ${isActive ? 'bg-brand-600 text-text-on-accent shadow-glow' : 'text-text-secondary hover:bg-hover/70 hover:text-text-primary'}`
                }
              >
                <Icon className="h-5 w-5" />
                <span className={`${open ? 'inline' : 'hidden'} truncate`}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const { user } = useAuth();
  const mobileItems = navItems.filter(item => hasAnyPermission(user, item.permissions)).slice(0, 5);

  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-3xl border border-border-theme bg-secondary/90 p-2 shadow-theme backdrop-blur-xl md:hidden">
      {mobileItems.map(item => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `focus-ring flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium transition ${
                isActive ? 'bg-brand-600 text-text-on-accent shadow-glow' : 'text-text-muted hover:bg-hover/70 hover:text-text-primary'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="max-w-full truncate">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default Sidebar;
