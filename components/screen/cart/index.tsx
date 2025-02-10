import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ICart } from '@/utils/helper';
import { colors } from '@/theme';
import { fetchAllCart, createCart } from '@/api/cart';
import { useAppSlice } from '@/slices';
import { EmptyCart } from '@/components/section/emptyCart';
import { CartItemsList } from '@/components/section/CartItemsList';
import { Checkout } from '@/components/section/Checkout';

export const Cart = () => {
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const { user } = useAppSlice();

  const {
    data: cartData,
    isLoading,
    isError,
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
    setCartItems([]);
  }, []);

  useEffect(() => {
    setCartItems(!isError && cartData?.cartItems ? cartData?.cartItems : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  const handleQuantityChange = (productItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.productId._id === productItemId ? { ...item, itemAmount: newQuantity } : item,
      ),
    );
    addToCart({ addInCart: { productId: productItemId, itemAmount: newQuantity } });
  };

  const handleDeleteItem = (productItemId: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        onPress: () => {
          addToCart({ productIdToDelete: productItemId });
          setCartItems(prev => prev.filter(item => item.productId._id !== productItemId));
        },
      },
    ]);
  };

  if (isLoading) {
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

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartItemsList
          cartItems={cartItems}
          handleQuantityChange={handleQuantityChange}
          handleDeleteItem={handleDeleteItem}
        />
      )}
      <Checkout cartItems={cartItems} refetch={refetch} />
    </View>
  );
};
