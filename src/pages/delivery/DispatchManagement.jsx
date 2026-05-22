import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';

function DispatchManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dispatch management</h1>
        <p className="text-sm text-text-muted">Coordinate shipping assignments and dispatch schedules for delivery agents.</p>
      </div>
      <Card title="Dispatch tasks">
        <div className="space-y-4 text-sm text-text-secondary">
          <p>Dispatch #88 — Assigned to Rajesh</p>
          <p>Dispatch #89 — Assigned to Priya</p>
          <p>Dispatch #90 — Pending route planning</p>
        </div>
        <div className="mt-5">
          <Button variant="primary">Create new dispatch</Button>
        </div>
      </Card>
    </div>
  );
}

export default DispatchManagement;
