import React from 'react';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { View, ActivityIndicator, Text } from 'react-native';

import { fetchAllProducts } from '@/api';
import { ProductList } from '@/components/section/productList';

export const Products = () => {
  // Fetch products
  const {
    data: productsData,
    isLoading: isProductLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  if (isProductLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={'#007bff'} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!productsData || productsError) {
    router.push('/+not-found'); // Redirect if product not found
    return null;
  }

  return (
    <View className="flex-1">
      <ProductList products={productsData ?? []} />
    </View>
  );
};
