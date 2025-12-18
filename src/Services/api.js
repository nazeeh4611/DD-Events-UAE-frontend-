import axios from 'axios';
import baseURL from './Base';

const API_URL = baseURL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

export const clientAPI = {
  getAllClients: (params) => api.get('/admin/clients', { params }),
  getClient: (id) => api.get(`/admin/clients/${id}`),
  createClient: (data) => api.post('/admin/clients', data),
  updateClient: (id, data) => api.put(`/admin/clients/${id}`, data),
  deleteClient: (id) => api.delete(`/admin/clients/${id}`),
  getClientStats: () => api.get('/admin/clients/stats'),
  bulkUpdateStatus: (data) => api.put('/admin/clients/bulk/status', data),
  bulkDelete: (data) => api.delete('/admin/clients/bulk', { data }),
  exportClients: () => api.get('/admin/clients/export', { responseType: 'blob' }),
  searchClients: (params) => api.get('/admin/clients/search', { params }),
  getClientEvents: (id) => api.get(`/admin/clients/${id}/events`),
};

export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  verifyToken: () => api.get('/admin/verify'),
  getProfile: () => api.get('/admin/profile'),
  updateProfile: (data) => api.put('/admin/profile', data),
  changePassword: (data) => api.put('/admin/change-password', data),
  getAllAdmins: () => api.get('/admin/all'),
  deleteAdmin: (id) => api.delete(`/admin/${id}`),
};

export const eventAPI = {
  getAllEvents: () => api.get('/admin/events'),
  getEvent: (id) => api.get(`/admin/events/${id}`),
  createEvent: (formData) => api.post('/admin/events', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateEvent: (id, formData) => api.put(`/admin/events/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),
  deleteEventImage: (id, index) => api.delete(`/admin/events/${id}/images/${index}`),
  toggleFeatured: (id) => api.patch(`/admin/events/${id}/featured`),
  updateEventStatus: (id, status) => api.patch(`/admin/events/${id}/status`, { status }),
  getEventsStats: () => api.get('/admin/events/stats/overview'),
  bulkUpdateEvents: (data) => api.post('/admin/events/bulk-update', data),
};

export const dashboardAPI = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
};

export default api;