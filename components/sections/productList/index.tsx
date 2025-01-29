import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { colors } from '@/theme';
import { IProduct } from '@/utils/helper';
import Button from '@/components/common/Button';
import ProductCard from '@/components/sections/productCard';

interface ProductListProps {
  products: IProduct[];
  productsPerPage?: number;
}

const ProductList: React.FC<ProductListProps> = ({ products, productsPerPage = 10 }) => {
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
      .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
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

      <FlatList
        data={productsData}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.productList}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrayPurple,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 8,
    flex: 1,
    marginRight: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productList: {
    paddingBottom: 16,
  },
  productRow: {
    justifyContent: 'space-between',
  },
});

export default ProductList;
