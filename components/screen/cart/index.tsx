import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { ICart, IProduct } from '@/utils/helper';
import { colors } from '@/theme';
import { Button } from '@/components/common/Button';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCart } from '@/api/cart';

// Mock cart data (replace with your actual cart state management logic)
const cartItems: IProduct[] = [];

export const Cart = () => {
  // Fetch categories
  const {
    data: cartData,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryKey: ['carts'],
    queryFn: fetchAllCart,
  });

  // Handle quantity change for a product
  // const handleQuantityChange = (id: string, newQuantity: number) => {
  //   const updatedItems = cartData.cartItems.map((item: ICart) =>
  //     item._id === id ? { ...item, quantity: newQuantity } : item,
  //   );
  // };

  // Calculate total price
  const calculateTotal = () => {
    return 0;
  };

  // Calculate tax (assuming 10% tax)
  const calculateTax = () => {
    return calculateTotal() * 0.1;
  };

  // Calculate discount (assuming a flat discount of $5)
  const calculateDiscount = () => {
    return 5;
  };

  // Calculate final total
  const calculateFinalTotal = () => {
    return 0;
  };

  if (isCartLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={colors.blue} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      {/* Greeting and Quote */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-black">Hello User 👋</Text>
        <Text className="text-lg text-gray-500 mt-2">
          "Your cart is your first step towards something amazing. Make it count!"
        </Text>
      </View>

      {/* Product List */}
      <FlatList
        data={cartData.cartItems}
        keyExtractor={item => item.productId._id}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-gray-100 rounded-lg p-4 mb-4">
            {/* Product Image */}
            <Image
              source={{ uri: item.productId.productImage }}
              className="w-20 h-20 rounded-lg mr-4"
            />

            {/* Product Details */}
            <View className="flex-1">
              <Text className="text-lg font-bold text-black">{item.productId.productName}</Text>
              <Text className="text-sm text-gray-500">{item.productId.productDescription}</Text>
              <Text className="text-sm font-bold text-black mt-2">${item.productId.price}</Text>
            </View>

            {/* Quantity Selector */}
            <View className="flex-row items-center">
              <TouchableOpacity
                // onPress={() => handleQuantityChange(item._id, Math.max(1, item.quantity - 1))}
                className="bg-gray-200 p-2 rounded-full">
                <Text className="text-lg font-bold">-</Text>
              </TouchableOpacity>
              <Text className="mx-4 text-lg font-bold">{item.itemAmount}</Text>
              <TouchableOpacity
                // onPress={() => handleQuantityChange(item._id, item.quantity + 1)}
                className="bg-gray-200 p-2 rounded-full">
                <Text className="text-lg font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Summary Section */}
      <View className="mt-6 border-t border-gray-200 pt-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-lg text-gray-500">Subtotal</Text>
          <Text className="text-lg font-bold text-black">${calculateTotal().toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-lg text-gray-500">Tax (10%)</Text>
          <Text className="text-lg font-bold text-black">${calculateTax().toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg text-gray-500">Discount</Text>
          <Text className="text-lg font-bold text-black">-${calculateDiscount().toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-xl font-bold text-black">Total</Text>
          <Text className="text-xl font-bold text-black">${calculateFinalTotal().toFixed(2)}</Text>
        </View>

        {/* Make Order Button */}
        <Button onPress={() => console.log('Order placed!')} buttonText="Make Order" />
      </View>
    </View>
  );
};
