import Card from '../../components/common/Card.jsx';

const logs = [
  { time: '08:42', message: 'Lead #102 assigned to Rahul.' },
  { time: '09:15', message: 'Design task #88 moved to review.' },
  { time: '10:05', message: 'Print job #77 passed QC.' },
];

function ActivityLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Activity logs</h1>
        <p className="text-sm text-text-muted">Audit trail for CRM actions, team updates, and event history.</p>
      </div>
      <Card title="Recent activity">
        <ul className="space-y-4 text-sm text-text-secondary">
          {logs.map(log => (
            <li key={log.time} className="rounded-3xl border border-border-theme bg-muted/60 p-4 ">
              <p className="font-medium text-text-primary">{log.time}</p>
              <p className="mt-1">{log.message}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default ActivityLogs;
