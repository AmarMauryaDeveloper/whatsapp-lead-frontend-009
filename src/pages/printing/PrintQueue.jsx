import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrintJobs } from '../../redux/slices/printSlice.js';
import Card from '../../components/common/Card.jsx';
import printService from '../../services/printService.js';
import { Link } from 'react-router-dom';
import { FiClock, FiCheckCircle, FiAlertCircle, FiPlus } from 'react-icons/fi';

function PrintQueue() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    priority: 'Normal',
    machine: '',
    description: '',
  });

  const { jobs, status, error } = useSelector(state => state.print);

  useEffect(() => {
    dispatch(fetchPrintJobs());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await printService.createJob(formData);
      alert('Print job created successfully!');
      setFormData({
        title: '',
        quantity: '',
        priority: 'Normal',
        machine: '',
        description: '',
      });
      setShowForm(false);
      dispatch(fetchPrintJobs());
    } catch (err) {
      alert('Error creating print job: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = status => {
    const statusMap = {
      pending: 'status-warning',
      in_progress: 'status-info',
      completed: 'status-success',
      rejected: 'status-danger',
    };
    return statusMap[status] || 'text-text-secondary';
  };

  const getStatusIcon = status => {
    const iconMap = {
      pending: FiAlertCircle,
      in_progress: FiClock,
      completed: FiCheckCircle,
    };
    return iconMap[status] || FiAlertCircle;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Print queue</h1>
          <p className="text-sm text-text-muted">Manage print jobs and prioritize urgent production runs.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
        >
          <FiPlus className="h-5 w-5" />
          Add New Job
        </button>
      </div>

      {/* Add Print Job Form */}
      {showForm && (
        <Card title="Create New Print Job">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="title"
                placeholder="Job Title" 
                value={formData.title}
                onChange={handleInputChange}
                required
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <input 
                type="number" 
                name="quantity"
                placeholder="Quantity" 
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <select 
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              >
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
              <input 
                type="text" 
                name="machine"
                placeholder="Machine" 
                value={formData.machine}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
            </div>
            <textarea 
              name="description"
              placeholder="Job Description / Notes" 
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-theme rounded-lg outline-none"
            />
            <div className="flex gap-2">
              <button 
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Job'}
              </button>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-border-theme rounded-lg hover:bg-hover transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}
      
      <Card title="Current queue" subtitle="Active print jobs">
        {status === 'loading' ? (
          <div className="py-8 text-center text-text-muted">Loading print jobs...</div>
        ) : error ? (
          <div className="rounded-lg alert-error">
            Error: {error}
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-8 text-center text-text-muted">No print jobs in queue.</div>
        ) : (
          <div className="space-y-3">
            {jobs.map(job => {
              const Icon = getStatusIcon(job.status);
              return (
                <Link
                  key={job._id}
                  to={`/app/printing/${job._id}`}
                  className="flex items-center justify-between rounded-lg border border-border-theme p-4 hover:bg-hover/60  "
                >
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">
                      Job #{job.jobId || job._id.slice(-4).toUpperCase()}: {job.title || job.description || 'Print job'}
                    </p>
                    <p className="text-sm text-text-muted">
                      Quantity: {job.quantity || 'N/A'} | Priority: {job.priority || 'Normal'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${getStatusColor(job.status)}`} />
                    <span className={`text-sm font-medium ${getStatusColor(job.status)}`}>
                      {job.status?.replace('_', ' ').toUpperCase() || 'Pending'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

export default PrintQueue;
