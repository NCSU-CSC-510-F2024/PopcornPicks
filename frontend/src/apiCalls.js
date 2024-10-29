import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 
// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If the token exists, add it to the request's Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (username, password) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const createUser = async (username, password) => {
  const response = await api.post('/createUser', { username, password });
  return response.data;
};

export const searchMovies = async (term) => {
  const response = await api.post('/search', { q: term });
  return response.data;
};

export const predictMovies = async (movieList) => {
  const response = await api.post('/predict', { movie_list: movieList });
  return response.data;
};

export const submitFeedback = async (feedbackData) => {
  const response = await api.post('/feedback', feedbackData);
  return response.data;
};

export const sendMail = async (email, feedbackData) => {
  const response = await api.post('/sendMail', { email, ...feedbackData });
  return response.data;
};

export default api;