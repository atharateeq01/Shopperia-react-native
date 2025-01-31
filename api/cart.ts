import { ICreateCart } from '@/utils/helper';
import apiClient from './middleware';

const API_URL = 'http://localhost:5000/api/cart';

export const createCart = async (data: {
  addInCart?: ICreateCart;
  productIdToDelete?: string;
}): Promise<any> => {
  try {
    const response = await apiClient.post(API_URL, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred while creating the user.' };
  }
};

export const fetchAllCart = async (): Promise<any> => {
  try {
    const response = await apiClient.get(`${API_URL}`);
    return response.data.data[0];
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred while fetching the user.' };
  }
};

export const fetchCartById = async (cartId: string) => {
  try {
    const response = await apiClient.get(`${API_URL}/cart/${cartId}`);
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred while fetching the user.' };
  }
};
