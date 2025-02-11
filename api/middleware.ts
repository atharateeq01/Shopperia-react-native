import axios from 'axios';
import { router } from 'expo-router';
import { API_URL } from '@/utils/constant';
import { getToken } from './auth';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  async config => {
    try {
      // Fetch the token from AsyncStorage
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        router.push('/(auth)/sessionExpired');
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiClient;
