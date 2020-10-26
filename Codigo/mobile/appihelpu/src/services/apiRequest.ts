import axios from 'axios';
import { getToken } from './auth';

/** Endereços para cada emulador/simulador:
 * Genymotion:              http://10.0.3.2:3333/
 * Emulador Android Studio: http://10.0.2.2:3333/
 * Simulador IOS:           http://localhost:3333/
 **/

const apiRequest = axios.create({
  baseURL: 'http://10.0.2.2:9000/api/',
});

apiRequest.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiRequest;
