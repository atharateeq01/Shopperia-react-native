'use client';

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { ICart } from '@/utils/helper';
import { colors } from '@/theme';
import { Button } from '@/components/common/Button';
import { createCart, fetchAllCart } from '@/api/cart';
import { useAppSlice } from '@/slices';
import { Trash2, Minus, Plus } from 'lucide-react-native';

export const Cart = () => {
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const { user } = useAppSlice();

  const {
    data: cartData,
    isLoading: isCartLoading,
    refetch,
  } = useQuery({
    queryKey: ['carts'],
    queryFn: fetchAllCart,
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: createCart,
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    if (cartData) {
      setCartItems(cartData.cartItems);
    }
  }, [cartData]);

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item?.productId?.price * item.itemAmount, 0);
  };

  const calculateDiscount = () => {
    return cartItems?.reduce((totalDiscount, item) => {
      const productPrice = item?.productId?.price;
      const itemAmount = item?.itemAmount;
      const productDiscount = item?.productId?.discount || 0;
      const itemTotalPrice = productPrice * itemAmount;
      const itemDiscount = (productDiscount / 100) * itemTotalPrice;
      return totalDiscount + itemDiscount;
    }, 0);
  };

  const calculateFinalTotal = () => {
    return calculateTotal() - calculateDiscount();
  };

  const handleQuantityChange = (productItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

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
  };

  const handleDeleteItem = (productItemId: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        onPress: () => {
          addToCart({ productIdToDelete: productItemId });
          setCartItems(prevCartItems =>
            prevCartItems.filter(item => item.productId._id !== productItemId),
          );
        },
      },
    ]);
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
      <View className="mb-6">
        <Text className="text-2xl font-bold text-black">Hello {user?.firstName} 👋</Text>
        <Text className="text-lg text-gray-500 mt-2">
          Your cart is your first step towards something amazing. Make it count!
        </Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 rounded-lg p-4 mb-4 relative">
            {item.productId.discount && (
              <View className="absolute top-2 right-2 bg-red-500 py-1 px-2 rounded-md z-10">
                <Text className="text-white text-xs font-bold">{item.productId.discount}% OFF</Text>
              </View>
            )}

            <View className="flex-row">
              <Image
                source={{ uri: item.productId.productImage }}
                className="w-24 h-24 rounded-lg mr-4"
              />
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">{item.productId.productName}</Text>
                <Text className="text-sm text-gray-500 mb-2">
                  {item.productId.productDescription}
                </Text>
                <Text className="text-lg font-bold text-black">${item.productId.price}</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between mt-4">
              <View className="flex-row items-center bg-white rounded-full overflow-hidden">
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item.productId._id, item.itemAmount - 1)}
                  className="p-2">
                  <Minus size={20} color={colors.blue} />
                </TouchableOpacity>
                <Text className="mx-4 text-lg font-bold">{item.itemAmount}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item.productId._id, item.itemAmount + 1)}
                  className="p-2">
                  <Plus size={20} color={colors.blue} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => handleDeleteItem(item.productId._id)}
                className="p-2 bg-red-500 rounded-full">
                <Trash2 size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View className="mt-4 border-t border-gray-200 pt-4 pb-6">
        <View className="flex-row justify-between mb-2">
          <Text className="text-lg text-gray-500">Subtotal</Text>
          <Text className="text-lg font-bold text-black">${calculateTotal().toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg text-gray-500">Discount</Text>
          <Text className="text-lg font-bold text-green-500">
            -${calculateDiscount().toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-xl font-bold text-black">Total</Text>
          <Text className="text-xl font-bold text-black">${calculateFinalTotal().toFixed(2)}</Text>
        </View>

        <Button onPress={() => console.log('Order placed!')} buttonText="Proceed to Checkout" />
      </View>
    </View>
  );
};
