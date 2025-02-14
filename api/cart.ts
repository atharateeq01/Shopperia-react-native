import { ICreateCart } from '@/utils/interface';
import apiClient from './middleware';
import { API_URL } from '@/utils/constant';

export const createCart = async (data: {
  addInCart?: ICreateCart;
  productIdToDelete?: string;
}): Promise<any> => {
  try {
    const response = await apiClient.post(`${API_URL}/cart`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred while creating the user.' };
  }
};

export const fetchAllCart = async (): Promise<any> => {
  try {
    const response = await apiClient.get(`${API_URL}/cart/user`);
    return response.data.data[0];
  } catch {
    return [];
  }
};

export const fetchCartById = async (cartId: string) => {
  try {
    const response = await apiClient.get(`${API_URL}/cart/cart/${cartId}`);
    return response.data.data;
  } catch {
    return {};
  }
};
