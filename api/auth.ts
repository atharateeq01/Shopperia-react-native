import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/utils/constant';
import moment from 'moment';

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred during login.' };
  }
};

export const getToken = async () => {
  try {
    // Store both the token and expiration time
    const token = await AsyncStorage.getItem('token');
    const expirationTime = await AsyncStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      // Check if the current time is before the expiration time
      const isExpired = moment().isBefore(moment(expirationTime));
      if (isExpired) {
        return token; // Token is still valid
      } else {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('tokenExpiration');
        return null;
      }
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};
