import { NavLink } from 'react-router-dom';
import { FiBarChart2, FiFileText, FiHome, FiLayers, FiMenu, FiPrinter, FiSettings, FiTruck, FiUsers } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/slices/uiSlice.js';
import useAuth from '../../hooks/useAuth.js';
import { hasAnyPermission, PERMISSIONS } from '../../utils/permissions.js';

const navSections = [
  {
    title: 'MAIN',
    items: [
      { label: 'Dashboard', path: '/app/dashboard/admin', icon: FiHome, permissions: [PERMISSIONS.DASHBOARD_VIEW] },
    ],
  },
  {
    title: 'SALES ORGANIZER',
    items: [
      // { label: 'Pipeline Data', path: '/app/leads', icon: FiUsers, permissions: [PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED] },
      { label: 'Create Call Entry', path: '/app/leads/call-entry', icon: FiFileText, permissions: [PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED] },
      { label: 'Call Entry List', path: '/app/leads', icon: FiFileText, permissions: [PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED] },
      { label: 'Quotation', path: '/app/reports/leads', icon: FiBarChart2, permissions: [PERMISSIONS.REPORTS_VIEW_BASIC] },
    ],
  },
  {
    title: 'LOGISTICS',
    items: [
      { label: 'Printing', path: '/app/printing/queue', icon: FiPrinter, permissions: [PERMISSIONS.PRINT_VIEW, PERMISSIONS.PRINT_VIEW_ASSIGNED] },
      { label: 'Delivery', path: '/app/delivery/tracking', icon: FiTruck, permissions: [PERMISSIONS.DELIVERY_VIEW, PERMISSIONS.DELIVERY_VIEW_ASSIGNED] },
    ],
  },
];

const allNavItems = navSections.flatMap(section => section.items);

function Sidebar({ open }) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const visibleItems = allNavItems.filter(item => hasAnyPermission(user, item.permissions));

  return (
    <aside className={`sidebar-bg hidden border-r transition-all duration-300 ease-in-out md:block ${open ? 'w-72' : 'w-20'}`}>
      <div className="flex h-full flex-col p-4">
        <div className="mb-8 flex items-center justify-between gap-3">
          <span className={`truncate text-lg font-semibold tracking-tight text-text-inverse ${open ? 'opacity-100' : 'opacity-0'} transition-opacity`}>WhatsApp CRM</span>
          <button onClick={() => dispatch(toggleSidebar())} className="focus-ring rounded-full bg-muted p-2 text-text-secondary transition hover:bg-hover/80">
            <span className="sr-only">Toggle sidebar</span>
            <FiMenu className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-hidden">
          {navSections.map(section => {
            const sectionItems = section.items.filter(item => hasAnyPermission(user, item.permissions));
            if (!sectionItems.length) return null;
            return (
              <div key={section.title} className="space-y-3">
                <div className={`text-xs font-semibold uppercase tracking-[0.35em] text-text-muted ${open ? 'opacity-100' : 'opacity-0'} transition-opacity`}>{section.title}</div>
                <div className="space-y-2">
                  {sectionItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path + item.label}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                          `sidebar-item ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}`
                        }
                      >
                        <Icon className="h-5 w-5" />
                        <span className={`${open ? 'inline' : 'hidden'} truncate`}>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const { user } = useAuth();
  const mobileItems = allNavItems.filter(item => hasAnyPermission(user, item.permissions)).slice(0, 5);

  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-3xl border border-border-theme bg-secondary/90 p-2 shadow-theme backdrop-blur-xl md:hidden">
      {mobileItems.map(item => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end
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
