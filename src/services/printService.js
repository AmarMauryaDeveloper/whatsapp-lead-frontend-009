import api from './api.js';

const printService = {
  // Get all print jobs
  getQueue: () => api.get('/print/queue'),
  getJobs: () => api.get('/print/queue'),
  
  // Get single print job
  getJobById: id => api.get(`/print/jobs/${id}`),
  
  // Job operations
  createJob: payload => api.post('/print', payload),
  submitQc: payload => api.post('/print/qc', payload),
  updateJob: (id, payload) => api.put(`/print/jobs/${id}`, payload),
  
  // Machine operations
  getMachineStatus: () => api.get('/print/machines'),
};

export default printService;
