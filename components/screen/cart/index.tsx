import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICart } from '@/utils/helper';
import { colors } from '@/theme';
import { Button } from '@/components/common/Button';
import { createCart, fetchAllCart } from '@/api/cart';
import { useAppSlice } from '@/slices';

export const Cart = () => {
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const { user } = useAppSlice();

  // Fetch cart data from API
  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ['carts'],
    queryFn: fetchAllCart,
  });

  // Mutation to add product to cart
  const { mutate: addToCart } = useMutation({
    mutationFn: createCart,
    onSuccess(data, variables, context) {
      console.log(data, variables, context);
    },
  });

  useEffect(() => {
    if (cartData) {
      setCartItems(cartData.cartItems);
    }
  }, [cartData]);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item?.productId?.price * item.itemAmount, 0);
  };

  // Calculate discount (assuming a flat discount of $5)
  const calculateDiscount = () => {
    return cartItems?.reduce((totalDiscount, item) => {
      const productPrice = item?.productId?.price;
      const itemAmount = item?.itemAmount;
      const productDiscount = item?.productId?.discount || 0; // Default to 0 if no discount

      // Calculate discount for this item
      const itemTotalPrice = productPrice * itemAmount;
      const itemDiscount = (productDiscount / 100) * itemTotalPrice;
      return totalDiscount + itemDiscount;
    }, 0);
  };

  // Calculate final total
  const calculateFinalTotal = () => {
    return calculateTotal() - calculateDiscount();
  };

  // Handle quantity change
  const handleQuantityChange = (productItemId: string, newQuantity: number) => {
    console.log(productItemId, newQuantity);

    // If the new quantity is 0, remove the item from the cart
    if (newQuantity === 0) {
      setCartItems(prevCartItems =>
        prevCartItems.filter(item => item.productId._id !== productItemId),
      );
      addToCart({
        productIdToDelete: productItemId,
      });
    } else {
      // Update the local state immediately if the quantity is not 0
      setCartItems(prevCartItems =>
        prevCartItems.map(item =>
          item.productId._id === productItemId ? { ...item, itemAmount: newQuantity } : item,
        ),
      );
      addToCart({
        addInCart: {
          productId: productItemId,
          itemAmount: newQuantity,
        },
      });
    }
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
        <Text className="text-2xl font-bold text-black">Hello {user?.firstName} 👋</Text>
        <Text className="text-lg text-gray-500 mt-2">
          Your cart is your first step towards something amazing. Make it count!
        </Text>
      </View>

      {/* Product List */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-gray-100 rounded-lg p-4 mb-4 relative">
            {item.productId.discount && (
              <View className="absolute top-2 left-2 bg-red-500 py-1 px-2 rounded-md z-10">
                <Text className="text-white text-xs font-bold">{item.productId.discount}% OFF</Text>
              </View>
            )}

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
                onPress={() => handleQuantityChange(item.productId._id, item.itemAmount - 1)}
                className="bg-gray-200 p-2 rounded-full">
                <Text className="text-lg font-bold">-</Text>
              </TouchableOpacity>
              <Text className="mx-4 text-lg font-bold">{item.itemAmount}</Text>
              <TouchableOpacity
                onPress={() => handleQuantityChange(item.productId._id, item.itemAmount + 1)}
                className="bg-gray-200 p-2 rounded-full">
                <Text className="text-lg font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Summary Section */}
      <View className="mt-2 border-t border-gray-200 pb-6">
        <View className="flex-row justify-between mb-2">
          <Text className="text-lg text-gray-500">Subtotal</Text>
          <Text className="text-lg font-bold text-black">${calculateTotal().toFixed(2)}</Text>
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
