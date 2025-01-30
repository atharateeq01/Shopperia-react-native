import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';
import { useAppSlice } from '@/slices';
import { ShoppingBanners } from '@/components/section/banner';
import { ProductCard } from '@/components/section/productCard';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories, fetchAllProducts } from '@/api';
import { ICategory } from '@/utils/helper';

export const Home = () => {
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
    <View className="flex-1 p-4 bg-white">
      {/* Greeting */}
      <Text className="text-2xl font-bold text-black">Hello {user?.firstName} 👋</Text>
      <Text className="text-lg text-gray-500 mb-5">Let's start shopping!</Text>

      {/* Shopping Banners */}
      <ShoppingBanners />

      {/* Categories */}
      <View className="flex-row justify-between items-center mb-4 mt-5">
        <Text className="text-xl font-bold">Top Categories</Text>
        <TouchableOpacity
          disabled={!!categoriesLoading}
          onPress={() => router.push('(main)/home/categories')}>
          <Text className="text-blue-500">See All</Text>
        </TouchableOpacity>
      </View>
      {categoriesLoading ? (
        <ActivityIndicator size="large" color={colors.lightDarkPurple} />
      ) : categoriesError ? (
        <Text>Failed to load categories</Text>
      ) : (
        <View className={'h-fit py-3'}>
          <FlatList
            horizontal
            data={categoryData}
            keyExtractor={(item: ICategory) => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-3 items-center"
                onPress={() => router.push(`(main)/home/productsByCategory/${item._id}`)}>
                <Image source={{ uri: item.categoryImage }} className="w-12 h-12 rounded-full" />
                <Text className="mt-2 text-sm text-black">{item.categoryName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Products */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Featured Products</Text>
        <TouchableOpacity
          disabled={!!productsLoading}
          onPress={() => router.push('(main)/home/products')}>
          <Text className="text-blue-500">View All</Text>
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
          keyExtractor={item => item._id}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 5 }}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      )}
    </View>
  );
};
