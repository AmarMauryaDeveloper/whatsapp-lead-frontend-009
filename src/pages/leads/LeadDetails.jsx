import { useParams } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';

function LeadDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Lead details</h1>
          <p className="text-sm text-text-muted">View full customer profile and production requirements for lead #{id}.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Customer profile">
          <p className="text-sm text-text-secondary">Name: Abhi Kumar</p>
          <p className="mt-2 text-sm text-text-secondary">Phone: +91 98765 43210</p>
          <p className="mt-2 text-sm text-text-secondary">WhatsApp: Active</p>
        </Card>
        <Card title="Design brief">
          <p className="text-sm text-text-secondary">Project: Poster and social share assets for launch campaign.</p>
          <p className="mt-2 text-sm text-text-secondary">Due date: 2026-05-30</p>
        </Card>
        <Card title="Production status">
          <p className="text-sm text-text-secondary">Stage: Design approval pending</p>
          <p className="mt-2 text-sm text-text-secondary">Assigned: Riya Sharma</p>
        </Card>
      </div>
    </div>
  );
}

export default LeadDetails;
