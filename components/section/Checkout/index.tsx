import { View, Text } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/common/Button';
import { createOrder } from '@/api/order';
import { ICart } from '@/utils/helper';
import { router } from 'expo-router';

interface CheckoutProps {
  cartItems: ICart[];
  refetch: any;
}

export const Checkout = ({ cartItems, refetch }: CheckoutProps) => {
  const { mutate: makeOrder } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      refetch();
      router.back();
    },
  });

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.productId.price * item.itemAmount, 0);
  const calculateDiscount = () =>
    cartItems.reduce((totalDiscount, item) => {
      const itemTotal = item.productId.price * item.itemAmount;
      return totalDiscount + ((item.productId.discount || 0) / 100) * itemTotal;
    }, 0);
  const calculateFinalTotal = () => calculateTotal() - calculateDiscount();

  const handleOrder = () => {
    const products = cartItems.map(cart => ({
      productId: cart.productId._id,
      productPrice: cart.productId.price,
      discountApplied: cart.productId.discount,
      itemAmount: cart.itemAmount,
    }));
    makeOrder({
      orderAmount: parseInt(calculateFinalTotal().toFixed(2)),
      products,
      receiverAddress: 'KRK, kasure',
      receiverPhoneNumber: '+94 - 3244424',
    });
  };

  return (
    <View className="mt-4 border-t border-gray-200 pt-4 pb-6">
      <View className="flex-row justify-between mb-2">
        <Text className="text-lg text-gray-500">Subtotal</Text>
        <Text className="text-lg font-bold text-black">${calculateTotal().toFixed(2)}</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg text-gray-500">Discount</Text>
        <Text className="text-lg font-bold text-green-500">-${calculateDiscount().toFixed(2)}</Text>
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-xl font-bold text-black">Total</Text>
        <Text className="text-xl font-bold text-black">${calculateFinalTotal().toFixed(2)}</Text>
      </View>
      <Button onPress={handleOrder} buttonText="Proceed to Checkout" />
    </View>
  );
};
