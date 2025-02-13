import React from 'react';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { fetchAllCategories } from '@/api';
import { ICategory } from '@/utils/interface';

export const Categories = () => {
  const router = useRouter();

  // Fetch categories
  const {
    data: categoryData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchAllCategories,
  });

  const handleCategoryPress = (categoryId: string) => {
    router.push({ pathname: '(main)/(home)/productsByCategory', params: { id: categoryId } });
  };

  return (
    <View className="flex-1 bg-white px-4 py-4">
      {categoriesLoading ? (
        <ActivityIndicator size="large" color={'#f7f7fb'} />
      ) : categoriesError ? (
        <Text className="text-center text-red-500">Failed to load categories</Text>
      ) : (
        <View className="justify-between items-center">
          <FlatList
            data={categoryData}
            numColumns={2}
            keyExtractor={(item: ICategory) => item._id}
            className="pb-5"
            renderItem={({ item }) => (
              <TouchableOpacity
                className="w-48 m-2 p-4 bg-gray-100 rounded-lg items-center"
                onPress={() => handleCategoryPress(item._id)}>
                <Image source={{ uri: item.categoryImage }} className="w-40 h-28 rounded-xl" />
                <Text className="font-semibold text-base mt-3">{item.categoryName}</Text>
                {item.categoryDescription && (
                  <Text className="text-xs text-gray-500 mt-2 text-center">
                    {item.categoryDescription}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};
