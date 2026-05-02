import axios from 'axios'
import { useAuthStore } from '../store/index'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth services
export const authService = {
  signup: (email, password, name) =>
    api.post('/auth/signup', { email, password, name }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  verifyToken: () => api.get('/auth/verify'),
}

// User services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getCareerProfile: () => api.get('/users/career-profile'),
  updateCareerProfile: (data) => api.put('/users/career-profile', data),
  getProfileCenter: () => api.get('/users/profile-center'),
  updateProfileCenter: (data) => api.put('/users/profile-center', data),
  getDocuments: () => api.get('/users/documents'),
  saveDocument: (data) => api.post('/users/documents', data),
}

// Financial services
export const financialService = {
  calculateEMI: (principal, rate, tenure) =>
    api.post('/financial/calculate-emi', { principal, rate, tenure }),
  getLoanData: (userId) => api.get(`/financial/loans/${userId}`),
  createLoan: (loanData) => api.post('/financial/loans', loanData),
}

// AI services (mocked or real OpenAI)
export const aiService = {
  getCareerRecommendations: (profile) =>
    api.post('/ai/career-recommendations', profile),
  getRepaymentStrategy: (loanData) =>
    api.post('/ai/repayment-strategy', loanData),
  getChatResponse: (message, context) =>
    api.post('/ai/chat', { message, context }),
}

export default api
