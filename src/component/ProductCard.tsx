import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BarcodeGenerator } from './BarcodeGenerator';

const ProductCard = ({ item }: { item: any }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const gtin = item?.variants?.[0]?.inventorySync?.gtin;

  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => setQuantity(q => q + 1);
  const handleRemove = () => setQuantity(q => (q > 0 ? q - 1 : 0));

  const handlecard = () => {
    navigation.navigate('Cart', {
      selectedProduct: { ...item, quantity },
      fallbackImage: fallbackImageRef.current,
    });
  };

  const fallbackImages = [
    require('../assets/carrrot.png'),
    require('../assets/emptyProduct.png'),
    require('../assets/fruit.png'),
    require('../assets/cabbage.png'),
    require('../assets/transparent.png'),
    require('../assets/tomato.png'),
    require('../assets/brocoli.png'),
    require('../assets/eggplant.png'),
    require('../assets/corn.png'),
  ];
  const fallbackImageRef = useRef(
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)],
  );
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetails', {
          product: item,
          fallbackImageRef,
        })
      }
      style={styles.card}
    >
      <View style={styles.discountTag}>
        <Text style={styles.discountText}>
          {typeof item.discount_percent === 'number' &&
          !isNaN(item.discount_percent)
            ? item.discount_percent
            : 50}
          % OFF
        </Text>
      </View>
      <Image
        source={
          item?.images?.front
            ? { uri: item.images.front }
            : fallbackImageRef.current
        }
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.main_category}</Text>

      <Text style={styles.prices}>
        ₹{item.discounted_price}{' '}
        <Text style={styles.originalPrice}>₹{item.original_price}</Text>
      </Text>
      {gtin && <BarcodeGenerator gtin={gtin} />}
      <View style={styles.actions}>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={handleRemove}>
              <Text style={styles.qtyBtn}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={handleAdd}>
              <Text style={styles.qtyBtn}>＋</Text>
            </TouchableOpacity>

            {/* ✅ New Add to Cart Button */}
            <TouchableOpacity style={styles.cartBtn} onPress={handlecard}>
              <Text style={styles.cartText}>Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    elevation: 2,
  },
  discountTag: {
    backgroundColor: '#4CAF50',
    padding: 4,
    borderRadius: 4,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    top: 1,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  image: {
    height: 80,
    width: '100%',
    marginVertical: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  category: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  prices: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 12,
    color: '#888',
  },
  actions: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartBtn: {
    marginLeft: 12,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  cartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ProductCard;
