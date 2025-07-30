import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CartRouteProp = RouteProp<RootStackParamList, 'Cart'>;

const Cart = () => {
  const route = useRoute<CartRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { selectedProduct, fallbackImage: routeFallbackImage } = route.params;

  const totalPrice = (
    selectedProduct.discounted_price * selectedProduct.quantity
  ).toFixed(2);

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
  const fallbackImage =
    routeFallbackImage ||
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Your Selected Item</Text> */}
      <View style={styles.card}>
        <Image
          source={
            selectedProduct?.images?.front
              ? { uri: selectedProduct.images.front }
              : fallbackImage
          }
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{selectedProduct.name}</Text>
          <Text style={styles.quantity}>
            Quantity: {selectedProduct.quantity}
          </Text>
          <Text style={styles.price}>Total: ₹{totalPrice}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => {
          Toast.show({
            type: 'success',
            text1: 'Product added successfully',
            position: 'top',
            visibilityTime: 1000,
          });

          setTimeout(() => {
            navigation.navigate('ProductList');
          }, 2000);
        }}
      >
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    elevation: 3,
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantity: {
    marginTop: 4,
    color: '#555',
  },
  price: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  checkoutBtn: {
    marginTop: 'auto',
    backgroundColor: '#388e3c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
