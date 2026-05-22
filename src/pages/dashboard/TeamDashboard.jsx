import Card from '../../components/common/Card.jsx';

function TeamDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Team Performance" subtitle="Review active workflows">
          <ul className="space-y-3 text-sm text-text-secondary">
            <li>Lead Managers completed 24 assignments today.</li>
            <li>Design team average turnaround: 4.5 hours.</li>
            <li>Print line efficiency: 91% uptime.</li>
          </ul>
        </Card>
        <Card title="Open Issues" subtitle="Pending blocks">
          <p className="text-sm text-text-secondary">2 delayed deliveries, 1 design revision overdue, and 3 print QC failures remain open.</p>
        </Card>
        <Card title="Team Capacity" subtitle="Resource utilization">
          <div className="space-y-3 text-sm text-text-secondary">
            <p>Design: 72% utilization</p>
            <p>Printing: 82% utilization</p>
            <p>Delivery: 68% utilization</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TeamDashboard;
