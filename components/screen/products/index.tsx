import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { ProductList } from '@/components/section/productList';
import { fetchAllProducts } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '@/theme';
import { router } from 'expo-router';

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
        <ActivityIndicator size="large" color={colors.blue} />
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
