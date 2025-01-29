import { categories, products } from '@/utils/data';

// Simulate API delay
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), delay));

export const fetchAllProducts = async () => simulateApiCall(products);

export const fetchAllCategories = async () => simulateApiCall(categories);

export const fetchCategoryById = async (id: string) => {
  const category = categories.find(cat => cat.id === id);
  return simulateApiCall(category || null);
};

export const fetchProductById = async (id: string) => {
  const product = products.find(prod => prod.id === id);
  return simulateApiCall(product || null);
};

export const fetchProductsByCategoryId = async (categoryId: string) => {
  const filteredProducts = products.filter(prod => prod.categoryId === categoryId);
  return simulateApiCall(filteredProducts);
};
