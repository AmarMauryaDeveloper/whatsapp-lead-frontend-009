import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads } from '../../redux/slices/leadSlice';
import Card from '../../components/common/Card';
import leadService from '../../services/leadService.js';
import { FiPlus } from 'react-icons/fi';

function LeadListing() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    source: 'WhatsApp',
    stage: 'New',
    notes: '',
  });

  const {
    items = [],
    status = 'idle',
    error = null,
  } = useSelector((state) => state.lead || {});

  useEffect(() => {
    dispatch(fetchLeads());
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
      await leadService.createLead(formData);
      alert('Lead created successfully!');
      setFormData({
        customerName: '',
        phone: '',
        source: 'WhatsApp',
        stage: 'New',
        notes: '',
      });
      setShowForm(false);
      dispatch(fetchLeads());
    } catch (err) {
      alert('Error creating lead: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Lead Management
          </h1>

          <p className="text-sm text-text-muted">
            Review and assign incoming WhatsApp leads for production workflow.
          </p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
        >
          <FiPlus className="h-5 w-5" />
          Add New Lead
        </button>
      </div>

      {/* Add Lead Form */}
      {showForm && (
        <Card title="Create New Lead">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="customerName"
                placeholder="Customer Name" 
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <input 
                type="text" 
                name="source"
                placeholder="Source" 
                value={formData.source}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <select 
                name="stage"
                value={formData.stage}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              >
                <option>New</option>
                <option>Qualified</option>
                <option>Won</option>
              </select>
            </div>
            <textarea 
              name="notes"
              placeholder="Notes" 
              rows="3"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-theme rounded-lg outline-none"
            />
            <div className="flex gap-2">
              <button 
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Lead'}
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

      {/* Table Card */}
      <Card
        title="Lead Pipeline"
        subtitle="Latest WhatsApp leads"
      >
        <div className="overflow-x-auto">
          <table className="table-theme">
            {/* Table Head */}
            <thead className="table-head-theme">
              <tr>
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Assigned To</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-border-theme">
              {/* Loading */}
              {status === 'loading' && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-6 text-center text-text-muted"
                  >
                    Loading leads...
                  </td>
                </tr>
              )}

              {/* Error */}
              {status === 'failed' && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-6 text-center status-danger"
                  >
                    {error || 'Failed to fetch leads'}
                  </td>
                </tr>
              )}

              {/* Empty */}
              {status !== 'loading' &&
                Array.isArray(items) &&
                items.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-6 text-center text-text-muted"
                    >
                      No leads available.
                    </td>
                  </tr>
                )}

              {/* Data */}
              {Array.isArray(items) &&
                items.length > 0 &&
                items.map((lead) => (
                  <tr
                    key={lead._id || lead.id}
                    className="transition hover:bg-hover/60 "
                  >
                    {/* Customer Name */}
                    <td className="px-4 py-4 font-medium text-text-primary">
                      {lead.customerName || 'N/A'}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-4 text-text-secondary">
                      {lead.phone || 'N/A'}
                    </td>

                    {/* Source */}
                    <td className="px-4 py-4 text-text-secondary">
                      {lead.source || 'WhatsApp'}
                    </td>

                    {/* Stage */}
                    <td className="px-4 py-4">
                      <span className="badge-info">
                        {lead.stage || 'New'}
                      </span>
                    </td>

                    {/* Assigned To */}
                    <td className="px-4 py-4 text-text-secondary">
                      {lead.assignedTo || 'Unassigned'}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium
                          ${
                            lead.status === 'Completed'
                              ? 'badge-success'
                              : lead.status === 'Pending'
                              ? 'badge-warning'
                              : 'badge-neutral'
                          }
                        `}
                      >
                        {lead.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}

              {/* Invalid Data */}
              {!Array.isArray(items) && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-6 text-center status-danger"
                  >
                    Invalid lead data received from API.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default LeadListing;
