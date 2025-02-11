import { ICreateOrder } from '@/utils/interface';
import apiClient from './middleware';
import { API_URL } from '@/utils/constant';

export const createOrder = async (data: ICreateOrder): Promise<any> => {
  try {
    const response = await apiClient.post(`${API_URL}/order`, data);
    return response.data;
  } catch {
    return [];
  }
};

export const fetchAllOrder = async (): Promise<any> => {
  try {
    const response = await apiClient.get(`${API_URL}/order/user`);
    return response.data.data;
  } catch {
    return [];
  }
};
