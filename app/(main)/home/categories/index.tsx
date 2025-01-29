import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ICategory } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories } from '@/api';
import { colors } from '@/theme';

const Categories = () => {
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
    router.push(`(main)/home/productsByCategory/${categoryId}`);
  };

  return (
    <View style={styles.container}>
      {categoriesLoading ? (
        <ActivityIndicator size="large" color={colors.lightDarkPurple} />
      ) : categoriesError ? (
        <Text>Failed to load categories</Text>
      ) : (
        <FlatList
          data={categoryData}
          numColumns={2}
          keyExtractor={(item: ICategory) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(item.id)}>
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categoryDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  listContainer: { paddingBottom: 20 },
  categoryCard: {
    width: '48%',
    margin: '1%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  categoryImage: { width: 100, height: 100, borderRadius: 50 },
  categoryName: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  categoryDescription: { fontSize: 12, color: 'gray', marginTop: 4, textAlign: 'center' },
});

export default Categories;
