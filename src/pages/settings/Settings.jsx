import { useState } from 'react';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import { FiPlus } from 'react-icons/fi';

function Settings() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    settingName: '',
    type: 'Text',
    value: '',
    category: 'General',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Setting saved: ' + formData.settingName);
    setFormData({
      settingName: '',
      type: 'Text',
      value: '',
      category: 'General',
      description: '',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-text-muted">Configure application preferences, access control, and workflow defaults.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
        >
          <FiPlus className="h-5 w-5" />
          Add New Setting
        </button>
      </div>

      {/* Add New Setting Form */}
      {showForm && (
        <Card title="Create New Setting">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="settingName"
                placeholder="Setting Name" 
                value={formData.settingName}
                onChange={handleInputChange}
                required
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <select 
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              >
                <option>Text</option>
                <option>Number</option>
                <option>Toggle</option>
                <option>Select</option>
              </select>
              <input 
                type="text" 
                name="value"
                placeholder="Setting Value" 
                value={formData.value}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              >
                <option>General</option>
                <option>Notifications</option>
                <option>Permissions</option>
                <option>Workflow</option>
              </select>
            </div>
            <textarea 
              name="description"
              placeholder="Description" 
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
                Create Setting
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

      <Card title="System preferences">
        <div className="space-y-4 text-sm text-text-secondary">
          <p>Notification settings, role permissions, and pipeline defaults are managed centrally.</p>
        </div>
        <div className="mt-5">
          <Button variant="primary">Update settings</Button>
        </div>
      </Card>
    </div>
  );
}

export default Settings;
