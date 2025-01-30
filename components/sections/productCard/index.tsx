import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { IProduct } from '@/utils/helper';
import { colors } from '@/theme';
import { router } from 'expo-router';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const onAddToCart = () => {
    console.log('product', product.id, ' ', product.name);
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`(main)/home/product-details/${product.id}`)}
      className="bg-white rounded-lg p-4 items-center w-1/2 mb-4 relative">
      {/* Discount Badge */}
      {product.discount && (
        <View className="absolute top-2 left-2 bg-red-500 py-1 px-2 rounded-md z-10">
          <Text className="text-white text-xs font-bold">{product.discount}% OFF</Text>
        </View>
      )}

      {/* Product Image */}
      <Image source={{ uri: product.image }} className="w-full h-32 rounded-lg mb-4" />

      {/* Product Name */}
      <Text className="text-lg font-bold text-center mb-2">{product.name}</Text>

      {/* Product Description */}
      <Text className="text-sm text-gray-500 text-center mb-2">{product.description}</Text>

      {/* Product Price */}
      <Text className="text-sm font-bold text-black mb-4">${product.price}</Text>

      {/* Add to Cart / Out of Stock */}
      {product.quantity > 0 ? (
        <TouchableOpacity
          style={{ backgroundColor: colors.blue }}
          className="py-2 px-4 rounded-md"
          onPress={onAddToCart}>
          <Text className="text-white text-sm font-bold">Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-red-500 text-sm font-bold">Out of Stock</Text>
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;
