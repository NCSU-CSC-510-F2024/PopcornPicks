import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your Flask backend URL

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
  return response.data;
};

export const createUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/createUser`, { username, password });
  return response.data;
};

export const searchMovies = async (term) => {
  const response = await axios.post(`${API_BASE_URL}/search`, { q: term });
  return response.data;
};

export const predictMovies = async (movieList) => {
  const response = await axios.post(`${API_BASE_URL}/predict`, { movie_list: movieList });
  return response.data;
};

export const submitFeedback = async (feedbackData) => {
  const response = await axios.post(`${API_BASE_URL}/feedback`, feedbackData);
  return response.data;
};

export const sendMail = async (email, feedbackData) => {
  const response = await axios.post(`${API_BASE_URL}/sendMail`, { email, ...feedbackData });
  return response.data;
};