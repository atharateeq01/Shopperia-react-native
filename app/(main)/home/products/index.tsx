import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ProductList from '@/components/sections/productList';
import { fetchAllProducts } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '@/theme';
import { router } from 'expo-router';

const Products = () => {
  // Fetch products
  const {
    data: productsData,
    isLoading: isProductLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  if (isProductLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!productsData || productsError) {
    router.back(); // Redirect if product not found
    return null;
  }

  return (
    <View style={styles.container}>
      <ProductList products={productsData ?? []} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default Products;
