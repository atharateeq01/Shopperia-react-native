import React from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategoryId } from '@/api';
import ProductList from '@/components/sections/productList';
import { IProduct } from '@/utils/helper';
import { colors } from '@/theme';

const ProductsByCategory = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const placeholderImage = require('@/assets/images/notFound.png');
  // Fetch products by category ID
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<IProduct[]>({
    queryKey: ['productsByCategory', id],
    queryFn: () => fetchProductsByCategoryId(id as string),
    enabled: !!id,
  });

  // Placeholder image for no products

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load products. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {products && products.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Image source={placeholderImage} style={styles.noProductsImage} />
          <Text style={styles.noProductsText}>No products for this category</Text>
        </View>
      ) : (
        <View style={styles.productContainer}>
          <ProductList products={products ?? []} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  productContainer: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: colors.red },
  noProductsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noProductsImage: { width: 150, height: 150, marginBottom: 16 },
  noProductsText: { fontSize: 18, color: 'gray' },
});

export default ProductsByCategory;
