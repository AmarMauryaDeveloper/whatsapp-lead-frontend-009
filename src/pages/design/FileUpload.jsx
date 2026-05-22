import { useForm } from 'react-hook-form';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';

function FileUpload() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    alert('File upload submitted.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">File upload</h1>
        <p className="text-sm text-text-muted">Upload design assets and attach proofs to your projects.</p>
      </div>
      <Card title="Upload artwork">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input label="Project name" type="text" placeholder="Campaign design pack" {...register('projectName', { required: true })} />
          <div>
            <label className="block text-sm font-medium text-text-secondary">Upload files</label>
            <input type="file" {...register('files')} className="mt-2 block w-full text-sm text-text-secondary" multiple />
          </div>
          <Button type="submit">Submit files</Button>
        </form>
      </Card>
    </div>
  );
}

export default FileUpload;
