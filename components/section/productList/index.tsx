'use client';

import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';

import type { IProduct } from '@/utils/helper';
import { ProductCard } from '@/components/section/productCard';

interface ProductListProps {
  products: IProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [showDiscounted, setShowDiscounted] = useState(false);

  useEffect(() => {
    loadFilteredProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, showDiscounted, sortOrder, searchQuery]); // Only products and showDiscounted are needed here

  const loadFilteredProducts = () => {
    const filteredProducts = products.filter(
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

        <View className="flex-row">
          <TouchableOpacity
            onPress={() => handleSortChange('asc')}
            className={`p-2 rounded-l-full ${sortOrder === 'asc' ? 'bg-blue-500' : 'bg-gray-300'}`}>
            <View className="flex-1 flex-row">
              <Text className={`${sortOrder === 'asc' ? 'text-white' : 'text-black'}`}>
                High to Low
              </Text>
              <Ionicons name="arrow-up" size={20} color={sortOrder === 'asc' ? 'white' : 'black'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortChange('desc')}
            className={`p-2 rounded-r-full ${sortOrder === 'desc' ? 'bg-blue-500' : 'bg-gray-300'}`}>
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
      </View>

      {/* Product List */}
      <FlatList
        data={productsData}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
