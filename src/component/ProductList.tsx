import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productsSlice';
import { AppDispatch, RootState } from '../redux/store';
import ProductCard from './ProductCard';
import { Product } from '../types/product.entities';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, data, isLoading } = useSelector(
    (state: RootState) => state.products,
  );

  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts({ page: String(page), pageSize: '10' }));
  }, [dispatch, page]);

  useEffect(() => {
    if (Array.isArray(data?.data?.data)) {
      const newProducts = data.data.data.map((item: Product) => ({
        ...item,
        images: {
          ...item.images,
          front: item.images?.front,
        },
        original_price: (item as any).original_price ?? 100,
        discounted_price: (item as any).discounted_price ?? 80,
        discount_percent:
          (item as any).discount_percent ??
          Math.round(
            (((item as any).original_price ??
              100 - (item as any).discounted_price ??
              80) /
              ((item as any).original_price ?? 100)) *
              100,
          ),
      }));
      setAllProducts(prev =>
        page === 1 ? newProducts : [...prev, ...newProducts],
      );
    }
  }, [data, page]);

  if (error) return <Text>{error}</Text>;

  if (isLoading && page === 1) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const modifiedData = allProducts;

  const handleLoadMore = () => {
    if (!loadingMore && !isLoading) {
      setLoadingMore(true);
      setPage(prev => prev + 1);
      setTimeout(() => setLoadingMore(false), 1000);
    }
  };

  return (
    <FlatList
      data={modifiedData}
      keyExtractor={(item, index) =>
        item.id ? `${item.id}-${index}` : `${index}`
      }
      contentContainerStyle={{ paddingHorizontal: 10 }}
      renderItem={({ item }: { item: Product }) => (
        <View style={{ flex: 1, margin: 5 }}>
          <ProductCard item={item} />
        </View>
      )}
      numColumns={2}
      ListFooterComponent={
        loadingMore ? (
          <ActivityIndicator size="small" style={{ marginVertical: 16 }} />
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ProductList;
