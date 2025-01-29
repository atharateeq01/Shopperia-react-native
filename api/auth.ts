import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
    // if (response.data.success) {
    //   const token = response.data.data;
    //   const expirationTime = Date.now() + 360000; // 1 hour from now (3600000 ms)

    //   // Store both the token and expiration time
    //   await AsyncStorage.setItem('token', token);
    //   await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());
    // }
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
      if (Date.now() < parseInt(expirationTime)) {
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
