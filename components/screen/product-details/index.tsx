import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/api';
import { IProduct } from '@/utils/helper';
import { colors } from '@/theme';
import { AddToCartModal } from '@/components/section/addToCartModal';

export const ProductDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch product data
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery<IProduct | null>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id, // Only fetch if id exists
  });

  if (isProductLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={colors.blue} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product || productError) {
    router.back(); // Redirect if product not found
    return null;
  }

  return (
    <ScrollView className="p-5 bg-white">
      {/* Product Name */}
      <Text className="text-2xl font-bold text-black mb-2">{product.productName}</Text>

      {/* Product Description */}
      <Text className="text-lg text-gray-600 mb-5">{product.productDescription}</Text>

      {/* Product Image */}
      <Image source={{ uri: product.productImage }} className="w-full h-72 object-cover mb-5" />

      {/* Category Info */}
      <View className="flex-col mb-5">
        <View className="flex-row items-center">
          <Image
            source={{ uri: product.categoryId.categoryImage }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <Text className="text-xl font-bold text-black">{product.categoryId.categoryName}</Text>
        </View>
        {product.categoryId.categoryDescription && (
          <Text className="text-lg text-gray-600 ml-12">
            {product.categoryId.categoryDescription}
          </Text>
        )}
      </View>

      {/* Product Price */}
      <View className="flex-row items-center mb-5">
        <Text className="text-2xl font-bold text-blue-500 mr-2">Pre unit: ${product.price}</Text>
        {product.discount && (
          <Text className="text-lg text-red-500 font-semibold">{product.discount}% OFF</Text>
        )}
      </View>

      {/* Add to Cart / Out of Stock */}
      {product.quantity > 0 ? (
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg items-center"
          onPress={() => setIsModalVisible(true)}>
          <Text className="text-white text-lg font-bold">Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-red-500 text-lg font-bold text-center">Out of Stock</Text>
      )}
      {/* Quantity Modal */}
      <AddToCartModal
        product={product}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </ScrollView>
  );
};
