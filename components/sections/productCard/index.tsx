import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
      style={styles.card}>
      {/* <View style={styles.card}> */}
      {/* Discount Badge */}
      {product.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{product.discount}% OFF</Text>
        </View>
      )}

      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Product Name */}
      <Text style={styles.name}>{product.name}</Text>

      {/* Product Description */}
      <Text style={styles.description}>{product.description}</Text>

      {/* Product Price */}
      <Text style={styles.price}>${product.price}</Text>

      {/* Add to Cart / Out of Stock */}
      {product.quantity > 0 ? (
        <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.outOfStock}>Out of Stock</Text>
      )}
      {/* </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.red,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    objectFit: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: colors.blue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  addToCartText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  outOfStock: {
    fontSize: 14,
    color: colors.red,
    fontWeight: 'bold',
  },
});

export default ProductCard;
