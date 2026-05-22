import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesignTasks } from '../../redux/slices/designSlice.js';
import Card from '../../components/common/Card.jsx';
import { Link } from 'react-router-dom';
import { FiClock, FiCheckCircle, FiAlertCircle, FiPlus } from 'react-icons/fi';

function DesignTasks() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium',
    dueDate: '',
    assignedTo: '',
    description: '',
  });

  const { tasks, status, error } = useSelector(state => state.design);

  useEffect(() => {
    dispatch(fetchDesignTasks());
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
    alert('Design task creation requires backend API endpoint. Please contact your administrator.');
    setShowForm(false);
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
          <h1 className="text-2xl font-semibold">Design tasks</h1>
          <p className="text-sm text-text-muted">Manage art requests, proofs, and approvals across design workflows.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
        >
          <FiPlus className="h-5 w-5" />
          Add New Task
        </button>
      </div>

      {/* Add Design Task Form */}
      {showForm && (
        <Card title="Create New Design Task">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="title"
                placeholder="Task Title" 
                value={formData.title}
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
                <option>Medium</option>
                <option>High</option>
              </select>
              <input 
                type="date" 
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <input 
                type="text" 
                name="assignedTo"
                placeholder="Assign to Designer" 
                value={formData.assignedTo}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
            </div>
            <textarea 
              name="description"
              placeholder="Task Description" 
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-theme rounded-lg outline-none"
            />
            <div className="flex gap-2">
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create Task
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
      
      <Card title="Active design queue" subtitle="Tasks assigned to graphic designers">
        {status === 'loading' ? (
          <div className="py-8 text-center text-text-muted">Loading design tasks...</div>
        ) : error ? (
          <div className="rounded-lg alert-error">
            Error: {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="py-8 text-center text-text-muted">No design tasks available.</div>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => {
              const Icon = getStatusIcon(task.status);
              return (
                <Link
                  key={task._id}
                  to={`/app/design/${task._id}`}
                  className="flex items-center justify-between rounded-lg border border-border-theme p-4 hover:bg-hover/60  "
                >
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">
                      Task #{task.taskId || task._id.slice(-4).toUpperCase()} — {task.title || 'Design task'}
                    </p>
                    <p className="text-sm text-text-muted">
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${getStatusColor(task.status)}`} />
                    <span className={`text-sm font-medium ${getStatusColor(task.status)}`}>
                      {task.status?.replace('_', ' ').toUpperCase() || 'Pending'}
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

export default DesignTasks;
