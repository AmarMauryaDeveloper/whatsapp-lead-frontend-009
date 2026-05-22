import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeliveries } from '../../redux/slices/deliverySlice.js';
import Card from '../../components/common/Card.jsx';
import deliveryService from '../../services/deliveryService.js';
import { Link } from 'react-router-dom';
import { FiTruck, FiCheckCircle, FiAlertCircle, FiPlus } from 'react-icons/fi';

function DeliveryTracking() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    orderId: '',
    destination: '',
    agent: '',
    phone: '',
    notes: '',
  });

  const { deliveries, status, error } = useSelector(state => state.delivery);

  useEffect(() => {
    dispatch(fetchDeliveries());
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
      await deliveryService.createDelivery(formData);
      alert('Delivery created successfully!');
      setFormData({
        orderId: '',
        destination: '',
        agent: '',
        phone: '',
        notes: '',
      });
      setShowForm(false);
      dispatch(fetchDeliveries());
    } catch (err) {
      alert('Error creating delivery: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = status => {
    const statusMap = {
      pending: 'status-warning',
      in_transit: 'status-info',
      delivered: 'status-success',
      failed: 'status-danger',
    };
    return statusMap[status] || 'text-text-secondary';
  };

  const getStatusIcon = status => {
    const iconMap = {
      pending: FiAlertCircle,
      in_transit: FiTruck,
      delivered: FiCheckCircle,
    };
    return iconMap[status] || FiAlertCircle;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Delivery tracking</h1>
          <p className="text-sm text-text-muted">Real-time tracking of outbound deliveries and confirmations from agents.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
        >
          <FiPlus className="h-5 w-5" />
          Add New Delivery
        </button>
      </div>

      {/* Add Delivery Form */}
      {showForm && (
        <Card title="Create New Delivery">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="orderId"
                placeholder="Order ID" 
                value={formData.orderId}
                onChange={handleInputChange}
                required
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <input 
                type="text" 
                name="destination"
                placeholder="Destination" 
                value={formData.destination}
                onChange={handleInputChange}
                required
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <input 
                type="text" 
                name="agent"
                placeholder="Agent Name" 
                value={formData.agent}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleInputChange}
                className="px-3 py-2 border border-border-theme rounded-lg outline-none"
              />
            </div>
            <textarea 
              name="notes"
              placeholder="Delivery Notes" 
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
                {loading ? 'Creating...' : 'Create Delivery'}
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
      
      <Card title="Active dispatches" subtitle="Deliveries in transit and pending">
        {status === 'loading' ? (
          <div className="py-8 text-center text-text-muted">Loading deliveries...</div>
        ) : error ? (
          <div className="rounded-lg alert-error">
            Error: {error}
          </div>
        ) : deliveries.length === 0 ? (
          <div className="py-8 text-center text-text-muted">No active deliveries.</div>
        ) : (
          <div className="space-y-3">
            {deliveries.map(delivery => {
              const Icon = getStatusIcon(delivery.status);
              return (
                <Link
                  key={delivery._id}
                  to={`/app/delivery/${delivery._id}`}
                  className="flex items-center justify-between rounded-lg border border-border-theme p-4 hover:bg-hover/60  "
                >
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">
                      Order #{delivery.orderId || delivery._id.slice(-4).toUpperCase()} — {delivery.destination || 'Delivery'}
                    </p>
                    <p className="text-sm text-text-muted">
                      Agent: {delivery.agent || 'Unassigned'} | ETA: {delivery.eta || 'N/A'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${getStatusColor(delivery.status)}`} />
                    <span className={`text-sm font-medium ${getStatusColor(delivery.status)}`}>
                      {delivery.status?.replace('_', ' ').toUpperCase() || 'Pending'}
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

export default DeliveryTracking;
