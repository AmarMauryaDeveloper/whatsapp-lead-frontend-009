import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';

function QCChecklist() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">QC checklist</h1>
        <p className="text-sm text-text-muted">Complete quality checks for print production and mark jobs ready for dispatch.</p>
      </div>
      <Card title="Quality review">
        <ul className="space-y-3 text-sm text-text-secondary">
          <li>• Color accuracy verified</li>
          <li>• Material consistency inspected</li>
          <li>• Cut and trim tolerances reviewed</li>
          <li>• Final packaging confirmed</li>
        </ul>
        <div className="mt-5 flex gap-3">
          <Button variant="primary">Approve QC</Button>
          <Button variant="secondary">Send back to design</Button>
        </div>
      </Card>
    </div>
  );
}

export default QCChecklist;
