import { ICreateOrder } from '@/utils/helper';
import apiClient from './middleware';
import { API_URL } from '@/utils/constant';

export const createOrder = async (data: ICreateOrder): Promise<any> => {
  try {
    const response = await apiClient.post(`${API_URL}/order`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred while creating the user.' };
  }
};
