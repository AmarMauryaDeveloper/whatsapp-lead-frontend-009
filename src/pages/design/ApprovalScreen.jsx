import { useForm } from 'react-hook-form';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';

function ApprovalScreen() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    alert('Design approval updated.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Approval screen</h1>
        <p className="text-sm text-text-muted">Approve or request changes for the current art package.</p>
      </div>
      <Card title="Review design">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input label="Approval note" type="text" placeholder="Enter comments" {...register('note')} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" variant="primary">Approve design</Button>
            <Button type="button" variant="secondary">Request revision</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ApprovalScreen;
