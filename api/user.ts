import axios from 'axios';
import apiClient from './middleware';
import { IUser, IUserData } from '@/utils/helper';
import { getToken } from './auth';

const API_URL = 'http://localhost:5000/api/user';

export const createUser = async (userData: IUserData): Promise<any> => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred while creating the user.' };
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred while fetching the user.' };
  }
};

export const getUserInfo = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/info`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred during login.' };
    // throw error.response?.data || { message: 'An error occurred while fetching the user.' };
  }
};
export const updateUser = async (userId: string, user: IUser) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/user/${userId}`);

    // const response = await apiClient.put(`${API_URL}/${userId}`, user);

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred while fetching the user.' };
  }
};
