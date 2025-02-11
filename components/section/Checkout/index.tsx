import { View, Text, Alert, Modal } from 'react-native';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/common/Button';
import { createOrder } from '@/api/order';
import { ICart } from '@/utils/interface';
import { router } from 'expo-router';
import { InputField } from '@/components/common/InputField';

interface CheckoutProps {
  cartItems: ICart[];
  refetch: any;
}

export const Checkout = ({ cartItems, refetch }: CheckoutProps) => {
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { mutate: makeOrder } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      setModalVisible(false);
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

  const handleProceed = () => {
    if (cartItems.length === 0) return;
    setModalVisible(true);
  };

  const handleOrder = () => {
    if (!address || !phoneNumber) {
      Alert.alert('Missing Information', 'Please provide a valid address and phone number.');
      return;
    }

    const products = cartItems.map(cart => ({
      productId: cart.productId._id,
      productPrice: cart.productId.price,
      discountApplied: cart.productId.discount,
      itemAmount: cart.itemAmount,
    }));

    makeOrder({
      orderAmount: parseInt(calculateFinalTotal().toFixed(2)),
      products,
      receiverAddress: address,
      receiverPhoneNumber: phoneNumber,
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

      {cartItems.length > 0 && <Button onPress={handleProceed} buttonText="Proceed to Checkout" />}

      {/* Modal for Address & Phone Input */}
      <Modal visible={modalVisible} transparent animationType="none">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-lg font-bold mb-4">Enter Delivery Details</Text>
            <InputField
              label={'Delivery Address'}
              type={'text'}
              placeholder={'Enter your address'}
              value={address}
              onChange={e => setAddress(e)}
            />
            <InputField
              label={'Phone Number'}
              type={'phonenumber'}
              placeholder={'Enter your  phone number'}
              value={phoneNumber}
              onChange={e => setPhoneNumber(e)}
            />

            <View className="flex-row justify-between mt-4">
              <Button onPress={() => setModalVisible(false)} buttonText="Cancel" />
              <Button onPress={handleOrder} buttonText="Confirm Order" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
