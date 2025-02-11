import type React from 'react';
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import type { IProduct } from '@/utils/interface';
import { AddToCartModal } from '@/components/section/addToCartModal';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onAddToCart = () => {
    setModalVisible(true);
  };

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push(`(main)/home/product-details/${product._id}`)}
        className="bg-white rounded-xl p-3 mb-4 w-[48%] shadow-md shadow-black/10">
        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-lg z-10">
            <Text className="text-white text-xs font-bold">{product.discount}% OFF</Text>
          </View>
        )}

        {/* Product Image */}
        <Image
          source={{ uri: product.productImage }}
          className="w-full h-36 rounded-lg mb-2"
          resizeMode="cover"
        />

        {/* Product Details */}
        <View className="flex-1">
          <Text className="text-lg font-bold mb-1" numberOfLines={1}>
            {product.productName}
          </Text>
          <Text className="text-xs text-gray-500 mb-2 h-10" numberOfLines={2}>
            {product.productDescription}
          </Text>

          {/* Price */}
          <View className="flex-row items-center mb-2">
            <Text className="text-lg font-bold text-blue-500">${discountedPrice.toFixed(2)}</Text>
            {product.discount && product.discount > 0 && (
              <Text className="text-sm text-gray-400 line-through ml-2">
                ${product.price.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Add to Cart / Out of Stock */}
          {product.quantity > 0 ? (
            <TouchableOpacity
              className="bg-blue-500 flex-row items-center justify-center py-2 rounded-lg"
              onPress={e => {
                e.stopPropagation();
                onAddToCart();
              }}>
              <Ionicons name="cart-outline" size={20} color="white" />
              <Text className="text-white text-sm font-bold ml-1">Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center justify-center">
              <Ionicons name="alert-circle-outline" size={20} className="text-red-500" />
              <Text className="text-red-500 text-sm font-bold ml-1">Out of Stock</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <AddToCartModal
        product={product}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};
