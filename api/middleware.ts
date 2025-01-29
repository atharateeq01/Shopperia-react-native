import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  async config => {
    try {
      // Fetch the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        router.push('/authScreen');
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
