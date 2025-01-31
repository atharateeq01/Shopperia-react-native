import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { IProduct } from '@/utils/helper';
import { Button } from '@/components/common/Button';
import { ProductCard } from '@/components/section/productCard';

interface ProductListProps {
  products: IProduct[];
  productsPerPage?: number;
}

export const ProductList: React.FC<ProductListProps> = ({ products, productsPerPage = 10 }) => {
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadFilteredProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortOrder, page, products]);

  const loadFilteredProducts = () => {
    let filteredProducts = products
      .slice(0, page * productsPerPage)
      .filter(product => product.productName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (sortOrder) {
      filteredProducts.sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
      );
    }
    setProductsData(filteredProducts);
  };

  const loadMoreProducts = () => {
    if (page * productsPerPage < products.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderProduct = ({ item }: { item: IProduct }) => <ProductCard product={item} />;

  return (
    <View className="flex-1 bg-lightGrayPurple p-4">
      {/* Search Container */}
      <View className="flex-row mb-4">
        <TextInput
          style={{ flex: 1 }}
          className="border border-gray-300 rounded-lg p-2 mr-2"
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Sort Filter Buttons */}
      <View className="flex-row justify-between mb-4">
        <Button
          buttonText="Low to High"
          onPress={() => setSortOrder('asc')}
          variant={sortOrder === 'asc' ? 'primary' : 'clear'}
        />
        <Button
          buttonText="High to Low"
          onPress={() => setSortOrder('desc')}
          variant={sortOrder === 'desc' ? 'primary' : 'clear'}
        />
      </View>
      {/* Product List */}
      <FlatList
        data={productsData}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 4 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};
