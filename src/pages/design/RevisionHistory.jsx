import Card from '../../components/common/Card.jsx';

const revisions = [
  { version: 'v1.0', date: 'May 19', note: 'Initial mockup sent to client.' },
  { version: 'v1.1', date: 'May 21', note: 'Client requested updated color palette.' },
  { version: 'v1.2', date: 'May 22', note: 'Final revisions submitted for approval.' },
];

function RevisionHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Revision history</h1>
        <p className="text-sm text-text-muted">Track every design revision and approval cycle.</p>
      </div>
      <Card title="Revision log">
        <ul className="space-y-4 text-sm text-text-secondary">
          {revisions.map(revision => (
            <li key={revision.version} className="rounded-3xl border border-border-theme bg-muted/60 p-5 ">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text-primary">{revision.version}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-text-muted">{revision.date}</span>
              </div>
              <p className="mt-2">{revision.note}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default RevisionHistory;
