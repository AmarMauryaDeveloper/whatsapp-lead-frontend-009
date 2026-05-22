import api from './api.js';

const reportService = {
  // Lead reports
  leadReport: params => api.get('/reports/leads', { params }),
  getLeadReports: params => api.get('/reports/leads', { params }),
  
  // Revenue reports
  revenueReport: params => api.get('/reports/revenue', { params }),
  getRevenueReports: params => api.get('/reports/revenue', { params }),
  
  // Productivity reports
  productivityReport: params => api.get('/reports/productivity', { params }),
  getProductivityReports: params => api.get('/reports/productivity', { params }),
};

export default reportService;
