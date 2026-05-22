import Card from '../../components/common/Card.jsx';

const machines = [
  { name: 'Press A', status: 'Online', uptime: '99.2%' },
  { name: 'Press B', status: 'Maintenance', uptime: '87.8%' },
  { name: 'Plotter', status: 'Online', uptime: '95.4%' },
];

function MachineStatus() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Machine status</h1>
        <p className="text-sm text-text-muted">Monitor production equipment health and schedule maintenance tasks.</p>
      </div>
      <Card title="Current status">
        <div className="space-y-4">
          {machines.map(machine => (
            <div key={machine.name} className="rounded-3xl border border-border-theme bg-muted/60 p-5 ">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-text-primary">{machine.name}</p>
                <span className={machine.status === 'Online' ? 'badge-success' : 'badge-warning'}>{machine.status}</span>
              </div>
              <p className="mt-3 text-sm text-text-secondary">Uptime: {machine.uptime}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default MachineStatus;
