import api from './api.js';

const designService = {
  // Get all design tasks
  getTasks: () => api.get('/design/tasks'),
  getJobs: () => api.get('/design/tasks'), // alias for consistency
  
  // Get single design task
  getTaskById: id => api.get(`/design/tasks/${id}`),
  getJobById: id => api.get(`/design/tasks/${id}`), // alias for consistency
  
  // File operations
  uploadFile: payload => api.post('/design/upload', payload),
  getRevisions: leadId => api.get(`/design/${leadId}/revisions`),
  
  // Approval operations
  approveDesign: (designId, data) => api.post(`/design/${designId}/approve`, data),
  updateTask: (id, payload) => api.put(`/design/tasks/${id}`, payload),
};

export default designService;
