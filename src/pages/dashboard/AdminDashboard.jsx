import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads } from '../../redux/slices/leadSlice.js';
import { fetchDesignTasks } from '../../redux/slices/designSlice.js';
import { fetchPrintJobs } from '../../redux/slices/printSlice.js';
import { fetchDeliveries } from '../../redux/slices/deliverySlice.js';
import { FiArrowUpRight, FiBarChart2, FiUsers, FiTruck } from 'react-icons/fi';
import Card from '../../components/common/Card.jsx';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import usePermissions from '../../hooks/usePermissions.js';
import { PERMISSIONS } from '../../utils/permissions.js';

const analytics = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 780 },
  { name: 'Mar', value: 620 },
  { name: 'Apr', value: 900 },
  { name: 'May', value: 1100 },
];

function AdminDashboard() {
  const dispatch = useDispatch();
  const { can, canAny, role } = usePermissions();
  const leads = useSelector(state => state.lead.items);
  const designTasks = useSelector(state => state.design.tasks);
  const printJobs = useSelector(state => state.print.jobs);
  const deliveries = useSelector(state => state.delivery.deliveries);

  useEffect(() => {
    if (canAny([PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED])) dispatch(fetchLeads());
    if (canAny([PERMISSIONS.DESIGN_VIEW, PERMISSIONS.DESIGN_VIEW_ASSIGNED])) dispatch(fetchDesignTasks());
    if (canAny([PERMISSIONS.PRINT_VIEW, PERMISSIONS.PRINT_VIEW_ASSIGNED])) dispatch(fetchPrintJobs());
    if (canAny([PERMISSIONS.DELIVERY_VIEW, PERMISSIONS.DELIVERY_VIEW_ASSIGNED])) dispatch(fetchDeliveries());
  }, [canAny, dispatch]);

  const summary = [
    { label: 'Leads', value: leads.length || '0', icon: FiUsers, path: '/app/leads', permissions: [PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED] },
    { label: 'Design Tasks', value: designTasks.length || '0', icon: FiBarChart2, path: '/app/design/tasks', permissions: [PERMISSIONS.DESIGN_VIEW, PERMISSIONS.DESIGN_VIEW_ASSIGNED] },
    { label: 'Print Jobs', value: printJobs.length || '0', icon: FiTruck, path: '/app/printing/queue', permissions: [PERMISSIONS.PRINT_VIEW, PERMISSIONS.PRINT_VIEW_ASSIGNED] },
    { label: 'Deliveries', value: deliveries.length || '0', icon: FiArrowUpRight, path: '/app/delivery/tracking', permissions: [PERMISSIONS.DELIVERY_VIEW, PERMISSIONS.DELIVERY_VIEW_ASSIGNED] },
  ].filter(item => canAny(item.permissions));

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summary.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="card-bg block rounded-3xl p-6 hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-text-muted">{item.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-text-primary">{item.value}</p>
                </div>
                <div className="rounded-2xl bg-brand-500/10 p-3 text-brand-600">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {can(PERMISSIONS.REPORTS_VIEW_REVENUE) && (
        <Card title="Production Overview" subtitle="Track workflow conversion and throughput">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics} margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(var(--color-chart-primary))" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="rgb(var(--color-chart-primary))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'rgb(var(--color-bg-elevated))', border: '1px solid rgb(var(--color-border))', borderRadius: 16, color: 'rgb(var(--color-text-primary))' }} />
                <Area type="monotone" dataKey="value" stroke="rgb(var(--color-chart-primary))" fill="url(#gradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        )}

        <Card title={`${role} Workspace`} subtitle="Your active CRM access">
          <div className="space-y-4 text-sm text-text-secondary">
            {canAny([PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_VIEW_ASSIGNED]) && <p>Leads: {leads.length || 0} visible records</p>}
            {canAny([PERMISSIONS.DESIGN_VIEW, PERMISSIONS.DESIGN_VIEW_ASSIGNED]) && <p>Designs: {designTasks.length || 0} assigned tasks</p>}
            {canAny([PERMISSIONS.PRINT_VIEW, PERMISSIONS.PRINT_VIEW_ASSIGNED]) && <p>Print jobs: {printJobs.length || 0} queued jobs</p>}
            {canAny([PERMISSIONS.DELIVERY_VIEW, PERMISSIONS.DELIVERY_VIEW_ASSIGNED]) && <p>Deliveries: {deliveries.length || 0} active dispatches</p>}
          </div>
        </Card>

        <Card title="Latest Alerts" subtitle="Actionable notifications">
          <ul className="space-y-3 text-sm text-text-secondary">
            <li>✓ System connected to all modules</li>
            <li>✓ Data syncing from backend API</li>
            <li>✓ Real-time updates enabled via WebSocket</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
