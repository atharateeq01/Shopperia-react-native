import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById, fetchCategoryById } from '@/api';
import { IProduct, ICategory } from '@/utils/helper';
import { colors } from '@/theme';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Fetch product data
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery<IProduct | null>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id, // Only fetch if id exists
  });

  // Fetch category data once product is available
  const { data: category, isLoading: isCategoryLoading } = useQuery<ICategory | null>({
    queryKey: ['category', product?.categoryId],
    queryFn: () => fetchCategoryById(product?.categoryId as string),
    enabled: !!product?.categoryId, // Only fetch if product exists
  });

  if (isProductLoading || isCategoryLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product || productError) {
    router.back(); // Redirect if product not found
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Product Name */}
      <Text style={styles.productName}>{product.name}</Text>

      {/* Product Description */}
      <Text style={styles.productDescription}>{product.description}</Text>

      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.productImage} />

      {/* Category Info */}
      {category && (
        <View style={styles.categoryBlock}>
          <View style={styles.categoryContainer}>
            <Image source={{ uri: category.image }} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
      )}

      {/* Product Price */}
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>Pre unit: ${product.price}</Text>
        {product.discount && <Text style={styles.discountText}>{product.discount}% OFF</Text>}
      </View>

      {/* Add to Cart / Out of Stock */}
      {product.quantity > 0 ? (
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.outOfStock}>Out of Stock</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 24,
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBlock: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  },
  categoryDescription: {
    fontSize: 16,
    marginLeft: 50,
    color: colors.gray,
    lineHeight: 24,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blue,
    marginRight: 10,
  },
  discountText: {
    fontSize: 16,
    color: colors.red,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: colors.blue,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  outOfStock: {
    fontSize: 18,
    color: colors.red,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetails;
