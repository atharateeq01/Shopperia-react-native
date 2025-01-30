import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategoryId } from '@/api';
import { ProductList } from '@/components/section/productList';
import { IProduct } from '@/utils/helper';
import { colors } from '@/theme';

export const ProductsByCategory = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const placeholderImage = require('@/assets/images/notFound.png');
  // Fetch products by category ID
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<IProduct[]>({
    queryKey: ['productsByCategory', id],
    queryFn: () => fetchProductsByCategoryId(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.blue} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-600">Failed to load products. Please try again.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      {products && products.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Image source={placeholderImage} className="w-36 h-36 mb-4" />
          <Text className="text-lg text-gray-600">No products for this category</Text>
        </View>
      ) : (
        <View className="flex-1">
          <ProductList products={products ?? []} />
        </View>
      )}
    </View>
  );
};
