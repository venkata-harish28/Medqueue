import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const doctorAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  create: (data) => api.post('/doctors', data),
  update: (id, data) => api.put(`/doctors/${id}`, data),
};

export const appointmentAPI = {
  create: (data) => api.post('/appointments', data),
  getMy: () => api.get('/appointments/my'),
  cancel: (id) => api.patch(`/appointments/${id}/cancel`),
};

export const queueAPI = {
  getByDoctor: (doctorId) => api.get(`/queue/doctor/${doctorId}`),
  markSeen: (appointmentId) => api.patch(`/queue/seen/${appointmentId}`),
};

export const voiceAPI = {
  processIntent: (text) => api.post('/voice/intent', { text }),
};

export default api;