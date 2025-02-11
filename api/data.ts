import { API_URL } from '@/utils/constant';
import apiClient from './middleware';

export const fetchAllProducts = async (): Promise<any> => {
  try {
    const response = await apiClient.get(`${API_URL}/product`);
    return response.data.data;
  } catch {
    return [];
  }
};

export const fetchAllCategories = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/category`);
    return response.data.data;
  } catch {
    return [];
  }
};

export const fetchCategoryById = async (id: string) => {
  try {
    const response = await apiClient.get(`${API_URL}/category/${id}`);
    return response.data.data;
  } catch {
    return {};
  }
};

export const fetchProductById = async (productId: string) => {
  try {
    const response = await apiClient.get(`${API_URL}/product/${productId}`);
    return response.data.data;
  } catch {
    return {};
  }
};

export const fetchProductsByCategoryId = async (categoryId: string) => {
  try {
    const response = await apiClient.get(`${API_URL}/product/category/${categoryId}`);
    return response.data.data;
  } catch {
    return [];
  }
};
