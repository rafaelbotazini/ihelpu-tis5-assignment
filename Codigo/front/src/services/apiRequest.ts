import axios from 'axios';
import { getToken } from './auth';

const apiRequest = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? '/api' : process.env.REACT_APP_API_URL,
});

apiRequest.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiRequest;
