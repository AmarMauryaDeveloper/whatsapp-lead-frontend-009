import api from './api.js';

const leadService = {
  getLeads: () => api.get('/leads'),
  getLeadById: id => api.get(`/leads/${id}`),
  createLead: payload => api.post('/leads', payload),
  assignLead: (id, payload) => api.put(`/leads/${id}/assign`, payload),
  updateLeadStatus: (id, payload) => api.put(`/leads/${id}/status`, payload),
};

export default leadService;
