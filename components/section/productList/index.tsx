import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';

import type { IProduct } from '@/utils/interface';
import { ProductCard } from '@/components/section/productCard';

interface ProductListProps {
  products: IProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadFilteredProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, showDiscounted, sortOrder, searchQuery, page]); // Only products and showDiscounted are needed here

  const loadFilteredProducts = () => {
    const filteredProducts = products
      .slice(0, page * 10)
      .filter(
        product =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (showDiscounted ? product.discount && product.discount > 0 : true),
      );

    if (sortOrder) {
      filteredProducts.sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
      );
    }
    setProductsData(filteredProducts);
  };

  const loadMoreProducts = () => {
    if (page * 10 < products.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSortChange = (order: 'asc' | 'desc') => {
    // eslint-disable-next-line no-unused-expressions
    sortOrder === order ? setSortOrder(null) : setSortOrder(order);
  };

  const renderProduct = ({ item }: { item: IProduct }) => <ProductCard product={item} />;

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Search Container */}
      <View className="flex-row items-center mb-4 bg-white rounded-full shadow-sm">
        <Ionicons name="search" size={24} color="gray" style={{ marginLeft: 12 }} />
        <TextInput
          className="flex-1 p-3 pl-2"
          placeholder="Search products"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Options */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          onPress={() => setShowDiscounted(!showDiscounted)}
          className={`flex-row items-center p-2 rounded-full ${showDiscounted ? 'bg-blue-500' : 'bg-gray-300'}`}>
          <Ionicons
            name={showDiscounted ? 'pricetag' : 'pricetag-outline'}
            size={20}
            color={showDiscounted ? 'white' : 'black'}
          />
          <Text className={`ml-2 ${showDiscounted ? 'text-white' : 'text-black'}`}>Discounted</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSortChange('asc')}
          className={`p-2 rounded-full ${sortOrder === 'asc' ? 'bg-blue-500' : 'bg-gray-300'}`}>
          <View className="flex-1 flex-row">
            <Text className={`${sortOrder === 'asc' ? 'text-white' : 'text-black'}`}>
              High to Low
            </Text>
            <Ionicons name="arrow-up" size={20} color={sortOrder === 'asc' ? 'white' : 'black'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSortChange('desc')}
          className={`p-2 rounded-full ${sortOrder === 'desc' ? 'bg-blue-500' : 'bg-gray-300'}`}>
          <View className="flex-1 flex-row">
            <Text className={`${sortOrder === 'desc' ? 'text-white' : 'text-black'}`}>
              High to Low
            </Text>
            <Ionicons
              name="arrow-down"
              size={20}
              color={sortOrder === 'desc' ? 'white' : 'black'}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        numColumns={2}
        data={productsData}
        renderItem={renderProduct}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreProducts}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};
