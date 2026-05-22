import api from './api.js';

const deliveryService = {
  // Get all deliveries
  getTracking: () => api.get('/delivery/tracking'),
  getDeliveries: () => api.get('/delivery/tracking'),
  
  // Get single delivery
  getDeliveryById: id => api.get(`/delivery/${id}`),
  
  // Delivery operations
  createDelivery: payload => api.post('/delivery', payload),
  dispatchOrder: payload => api.post('/delivery/dispatch', payload),
  uploadProof: payload => api.post('/delivery/proof', payload),
  updateDelivery: (id, payload) => api.put(`/delivery/${id}`, payload),
};

export default deliveryService;
