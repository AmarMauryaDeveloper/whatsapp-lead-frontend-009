import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';

function AssignmentPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Assignment panel</h1>
        <p className="text-sm text-text-muted">Assign leads to the right teams and review workload distribution.</p>
      </div>
      <Card title="Lead assignments">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border-theme bg-muted/60 p-5 ">
            <h3 className="text-lg font-semibold text-text-primary">Pending assignments</h3>
            <p className="mt-3 text-sm text-text-secondary">4 leads require review by managers before production routing.</p>
          </div>
          <div className="rounded-3xl border border-border-theme bg-muted/60 p-5 ">
            <h3 className="text-lg font-semibold text-text-primary">Quick actions</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Button variant="secondary">Bulk assign leads</Button>
              <Button variant="secondary">Export workload</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AssignmentPanel;
