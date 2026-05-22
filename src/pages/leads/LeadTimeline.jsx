import Card from '../../components/common/Card.jsx';

const events = [
  { date: 'May 20', title: 'Lead received', detail: 'WhatsApp message captured from campaign chat bot.' },
  { date: 'May 21', title: 'Assigned to manager', detail: 'Lead owner assigned to sales team.' },
  { date: 'May 22', title: 'Design requested', detail: 'Creative brief sent to design queue.' },
];

function LeadTimeline() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Lead timeline</h1>
        <p className="text-sm text-text-muted">Trace every update and workflow milestone for the selected lead.</p>
      </div>
      <Card title="Activity timeline">
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.date} className="rounded-3xl border border-border-theme bg-muted/60 p-5 ">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{event.date}</p>
              <h3 className="mt-2 text-lg font-medium text-text-primary">{event.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{event.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default LeadTimeline;
