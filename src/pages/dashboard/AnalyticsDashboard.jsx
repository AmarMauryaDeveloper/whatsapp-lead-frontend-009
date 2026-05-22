import Card from '../../components/common/Card.jsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', revenue: 4200 },
  { name: 'Tue', revenue: 5300 },
  { name: 'Wed', revenue: 6200 },
  { name: 'Thu', revenue: 7100 },
  { name: 'Fri', revenue: 8600 },
  { name: 'Sat', revenue: 9200 },
];

function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Weekly Revenue" subtitle="WhatsApp acquisition growth">
          <p className="mt-3 text-3xl font-semibold text-text-primary">$46.1k</p>
        </Card>
        <Card title="Conversion Rate" subtitle="Leads to production">
          <p className="mt-3 text-3xl font-semibold text-text-primary">28.4%</p>
        </Card>
        <Card title="Average Response" subtitle="Team response time">
          <p className="mt-3 text-3xl font-semibold text-text-primary">1.2h</p>
        </Card>
      </div>

      <Card title="Revenue by Day" subtitle="Performance across the week">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="rgb(var(--color-chart-muted))" />
              <YAxis stroke="rgb(var(--color-chart-muted))" />
              <Tooltip contentStyle={{ background: 'rgb(var(--color-bg-elevated))', border: '1px solid rgb(var(--color-border))', borderRadius: 16, color: 'rgb(var(--color-text-primary))' }} />
              <Bar dataKey="revenue" fill="rgb(var(--color-chart-primary))" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

export default AnalyticsDashboard;
