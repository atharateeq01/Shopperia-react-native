'use client';

import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/api';
import type { IProduct } from '@/utils/interface';
import { colors } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { AddToCartModal } from '@/components/section/addToCartModal';

export const ProductDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery<IProduct | null>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id,
  });

  if (isProductLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={colors.blue} />
        <Text className="mt-4 text-gray-600">Loading product details...</Text>
      </View>
    );
  }

  if (!product || productError) {
    router.back();
    return null;
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View className="flex-1 bg-white">
      <Animated.View
        style={{ opacity: headerOpacity }}
        className="absolute top-0 left-0 right-0 z-10 bg-white py-4 px-5 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.blue} />
        </TouchableOpacity>
        <Text numberOfLines={1} className="text-lg font-semibold flex-1 mx-4">
          {product.productName}
        </Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color={colors.blue} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}>
        <Image
          source={{ uri: product.productImage }}
          className="w-full h-[500px]"
          resizeMode="cover"
        />

        <View className="p-5">
          <Text className="text-3xl font-bold text-gray-800 mb-2">{product.productName}</Text>

          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-blue-500 mr-2">
                ${product.price.toFixed(2)}
              </Text>
              {product.discount && (
                <View className="bg-red-500 px-2 py-1 rounded">
                  <Text className="text-white font-semibold">{product.discount}% OFF</Text>
                </View>
              )}
            </View>
            <View className="flex-row items-center">
              <Ionicons name="star" size={18} color={colors.yellow} />
              <Text className="ml-1 text-gray-600">4.5 (120 reviews)</Text>
            </View>
          </View>

          <Text className="text-lg text-gray-600 mb-6">{product.productDescription}</Text>

          <View className="flex-row items-center mb-6">
            <Image
              source={{ uri: product.categoryId.categoryImage }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View>
              <Text className="text-lg font-semibold text-gray-800">
                {product.categoryId.categoryName}
              </Text>
              {product.categoryId.categoryDescription && (
                <Text className="text-sm text-gray-600">
                  {product.categoryId.categoryDescription}
                </Text>
              )}
            </View>
          </View>

          {product.quantity > 0 ? (
            <TouchableOpacity
              className="bg-blue-500 p-4 rounded-lg flex-row items-center justify-center"
              onPress={() => setIsModalVisible(true)}>
              <Ionicons name="cart-outline" size={24} color="white" />
              <Text className="text-white text-lg font-bold ml-2">Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View className="bg-gray-200 p-4 rounded-lg items-center">
              <Text className="text-gray-600 text-lg font-bold">Out of Stock</Text>
            </View>
          )}
        </View>
      </Animated.ScrollView>

      <AddToCartModal
        product={product}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};
