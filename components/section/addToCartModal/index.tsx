import type React from 'react';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { View, Text, TouchableOpacity, Modal, Animated, Easing, Image } from 'react-native';

import { createCart } from '@/api/cart';
import type { IProduct } from '@/utils/interface';
import { Button } from '@/components/common/button';

interface IAddToCartModalProps {
  product: IProduct;
  isVisible: boolean;
  onClose: () => void;
}

export const AddToCartModal: React.FC<IAddToCartModalProps> = ({ product, isVisible, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [animation] = useState(new Animated.Value(0));

  const { mutate: addToCart } = useMutation({
    mutationFn: createCart,
  });

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, animation]); // Added animation to dependencies

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, product.quantity));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const handleDone = () => {
    addToCart({
      addInCart: {
        productId: product._id,
        itemAmount: quantity,
      },
    });
    onClose();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Modal visible={isVisible} transparent animationType="none">
      <View className="flex-1 justify-end bg-black/50">
        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="bg-white rounded-t-3xl p-6 shadow-lg">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-800">Add to Cart</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between mb-6">
            <Image source={{ uri: product.productImage }} className="w-20 h-20 rounded-lg" />
            <View className="flex-1 ml-4">
              <Text className="text-xl font-semibold text-gray-800">{product.productName}</Text>
              <Text className="text-sm font-semibold text-gray-500">
                {product.productDescription}
              </Text>
              <Text className="text-blue-500 font-bold mt-1">${product.price.toFixed(2)}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-lg font-semibold text-gray-800">Quantity:</Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={decrementQuantity}
                className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center">
                <Ionicons name="remove" size={24} color="gray" />
              </TouchableOpacity>
              <Text className="mx-4 text-xl font-bold text-gray-800">{quantity}</Text>
              <TouchableOpacity
                onPress={incrementQuantity}
                className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center">
                <Ionicons name="add" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          <Button
            onPress={handleDone}
            buttonText={`Add to Cart $${(quantity * product.price).toFixed(2)}`}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};
