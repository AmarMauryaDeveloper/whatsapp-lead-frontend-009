import { useForm } from 'react-hook-form';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';

function ProofUpload() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    alert('Delivery proof uploaded successfully.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Proof upload</h1>
        <p className="text-sm text-text-muted">Submit delivery confirmation images and customer signatures for completed orders.</p>
      </div>
      <Card title="Upload delivery proof">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-secondary">Order reference</label>
            <input type="text" {...register('orderRef')} className="mt-2 block w-full rounded-2xl border border-border-theme bg-secondary px-4 py-3 text-text-primary outline-none " />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Proof image</label>
            <input type="file" {...register('proof')} className="mt-2 block w-full text-sm text-text-secondary" />
          </div>
          <Button type="submit">Upload proof</Button>
        </form>
      </Card>
    </div>
  );
}

export default ProofUpload;
