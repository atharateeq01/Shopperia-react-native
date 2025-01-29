import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';
import { useAppSlice } from '@/slices';
import ShoppingBanners from '@/components/sections/banner';
import ProductCard from '@/components/sections/productCard';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories, fetchAllProducts } from '@/api';

const Home = () => {
  const router = useRouter();
  const { user } = useAppSlice();

  // Fetch categories
  const {
    data: categoryData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
  });

  // Fetch products
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  return (
    <View style={styles.root}>
      {/* Greeting */}
      <Text style={styles.greeting}>Hello {user?.firstName} 👋</Text>
      <Text style={styles.subtext}>Let's start shopping!</Text>

      {/* Shopping Banners */}
      <ShoppingBanners />

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Categories</Text>
        <TouchableOpacity
          disabled={!!categoriesLoading}
          onPress={() => router.push('(main)/home/categories')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {categoriesLoading ? (
        <ActivityIndicator size="large" color={colors.lightDarkPurple} />
      ) : categoriesError ? (
        <Text>Failed to load categories</Text>
      ) : (
        <FlatList
          horizontal
          data={categoryData}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => router.push(`(main)/home/productsByCategory/${item.id}`)}>
              <Image source={{ uri: item.image }} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Products */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <TouchableOpacity
          disabled={!!productsLoading}
          onPress={() => router.push('(main)/home/products')}>
          <Text style={styles.seeAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {productsLoading ? (
        <ActivityIndicator size="large" color={colors.lightDarkPurple} />
      ) : productsError ? (
        <Text>Failed to load categories</Text>
      ) : (
        <FlatList
          data={productsData}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productListContainer}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, backgroundColor: colors.white },
  greeting: { fontSize: 24, fontWeight: 'bold', color: colors.black },
  subtext: { fontSize: 16, color: colors.gray, marginBottom: 20 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20, // Increased spacing
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: colors.blue },

  // Category Styles
  categoryContainer: { height: 200 },
  categoryButton: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  categoryIcon: { width: 50, height: 50, borderRadius: 25 },
  categoryText: { marginTop: 5, fontSize: 12, color: colors.black },

  // Product List
  productRow: { justifyContent: 'space-between' },
  productListContainer: { paddingBottom: 20 },
  productCard: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    position: 'relative',
  },
  imageContainer: { position: 'relative', width: '100%', alignItems: 'center' },
  productImage: { width: 120, height: 100, borderRadius: 8 },

  // Discount Badge
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.red,
    color: colors.white,
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 4,
  },

  // Product Details
  productName: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 5 },
  productPrice: { fontSize: 14, color: colors.black, marginTop: 5 },

  // Add to Cart Button
  addToCartButton: {
    backgroundColor: colors.blue,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  addToCartText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },

  // Out of Stock Label
  outOfStock: { fontSize: 12, color: colors.red, fontWeight: 'bold', marginTop: 8 },
});

export default Home;
