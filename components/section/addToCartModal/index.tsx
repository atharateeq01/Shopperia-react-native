import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { IProduct } from '@/utils/helper';
import { Button } from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons'; // For the X icon
import { useMutation } from '@tanstack/react-query';
import { createCart } from '@/api/cart';

interface IAddToCartModalProps {
  product: IProduct;
  isVisible: boolean;
  onClose: () => void;
}

export const AddToCartModal: React.FC<IAddToCartModalProps> = ({ product, isVisible, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  // Mutation to add product to cart
  const { mutate: addToCart } = useMutation({
    mutationFn: createCart,
    onSuccess(data, variables, context) {
      console.log(data, variables, context);
    },
  });
  // Handle incrementing quantity
  const incrementQuantity = () => {
    setQuantity((prev: number) => prev + 1);
  };

  // Handle decrementing quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev: number) => prev - 1);
    }
  };

  const handleDone = (quantity: number) => {
    addToCart({
      addInCart: {
        productId: product._id,
        itemAmount: quantity,
      },
    });
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      {/* Overlay */}
      <View className="flex-1 justify-center items-center bg-black/50">
        {/* Modal Content */}
        <View className="w-80 bg-white rounded-lg p-6 shadow-lg">
          {/* Modal Header with X Button */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Select Quantity</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Horizontal Line */}
          <View className="h-px bg-gray-200 mb-6" />

          {/* Product Name */}
          <Text className="text-lg font-semibold text-center mb-6">{product.productName}</Text>

          {/* Quantity Selector */}
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity
              onPress={decrementQuantity}
              className="bg-gray-200 w-12 h-12 rounded-full items-center justify-center">
              <Text className="text-2xl font-bold text-gray-700">-</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">{quantity}</Text>
            <TouchableOpacity
              onPress={incrementQuantity}
              className="bg-gray-200 w-12 h-12 rounded-full items-center justify-center">
              <Text className="text-2xl font-bold text-gray-700">+</Text>
            </TouchableOpacity>
          </View>

          {/* Done Button */}
          <Button
            onPress={() => {
              handleDone(quantity);
              onClose();
            }}
            buttonText="Done"
          />
        </View>
      </View>
    </Modal>
  );
};
