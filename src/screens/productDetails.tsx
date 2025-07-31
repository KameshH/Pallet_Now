import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { AppDispatch } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetails = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, fallbackImage: routeFallbackImage } = route.params;
  const [quantity, setQuantity] = useState(product.initialQuantity || 0);
  const [selectedWeight] = useState('1 kg');

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
    routeFallbackImage ||
      fallbackImages[Math.floor(Math.random() * fallbackImages.length)],
  );
  const fallbackImage = fallbackImageRef.current;

  const handleAdd = () => setQuantity((q: number) => q + 1);
  const handleRemove = () => setQuantity((q: number) => (q > 0 ? q - 1 : 0));
  const totalPrice = (product.discounted_price * quantity).toFixed(2);

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          discounted_price: product.discounted_price,
          original_price: product.original_price,
          quantity: quantity,
          images: product.images,
          main_category: product.main_category,
          discount_percent: product.discount_percent,
          fallbackImage: fallbackImage,
        }),
      );
      Toast.show({
        type: 'success',
        text1: 'Added to Cart!',
        text2: `${quantity} ${product.name} added to cart`,
        position: 'top',
        visibilityTime: 1500,
      });
      setQuantity(0);
      setTimeout(() => {
        navigation.navigate('Cart');
      }, 1000);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>
            {typeof product.discount_percentage === 'number' &&
            !isNaN(product.discount_percentage)
              ? product.discount_percentage
              : 50}
            % OFF
          </Text>
        </View>
        <Image
          source={
            product?.images?.front
              ? { uri: product.images.front }
              : fallbackImage
          }
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text>Fresho</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.category}>{product.main_category}</Text>
      <View style={styles.dropdownRow}>
        <TouchableOpacity>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedWeight}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#333" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.discountedPrice}>
          ₹{quantity > 0 ? totalPrice : product.discounted_price}
        </Text>
        <Text style={styles.originalPrice}>₹{product.original_price}</Text>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.bottomContent}>
          <View style={styles.specialPriceRowBottom}>
            <Text style={styles.specialPriceText}>
              Get it for ₹{quantity > 0 ? totalPrice : product.discounted_price}
            </Text>
          </View>
          <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.bookmarkIconBordered}>
              <MaterialIcons name="bookmark-border" size={28} color="#121212" />
            </TouchableOpacity>
            {quantity === 0 ? (
              <TouchableOpacity
                style={styles.addButtonBottom}
                onPress={handleAdd}
              >
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.qtyControlsBottom}>
                <TouchableOpacity
                  onPress={handleRemove}
                  style={styles.qtyBtnBottom}
                >
                  <MaterialIcons name="remove" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={handleAdd}
                  style={styles.qtyBtnBottom}
                >
                  <MaterialIcons name="add" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {quantity > 0 && (
            <TouchableOpacity
              style={styles.cartButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '50%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 16,

    borderWidth: 1,
    borderColor: '#ddd',
  },
  discountTag: {
    position: 'absolute',
    backgroundColor: '#43a047',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,

    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  image: {
    width: '80%',
    height: '80%',
    borderRadius: 16,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  dropdownLabel: {
    fontSize: 13,
    color: '#888',
    marginRight: 6,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dropdownText: {
    fontSize: 13,
    color: '#333',
    padding: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 14,
    color: '#888',
    marginLeft: 6,
  },
  bottomRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#eee',
  },
  bottomContent: {
    width: '100%',
  },
  specialPriceRowBottom: {
    backgroundColor: '#e8f5e9',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  specialPriceText: {
    color: '#388e3c',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
    width: '100%',
  },
  bookmarkIcon: {
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  bookmarkIconBordered: {
    borderWidth: 1,
    borderColor: '#121212',
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#fff',
    borderColor: '#d32f2f',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    width: '80%',
  },
  addButtonBottom: {
    backgroundColor: '#fff',
    borderColor: '#d32f2f',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  addText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d32f2f',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignSelf: 'flex-start',
    width: '70%',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    gap: 0,
  },
  qtyControlsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d32f2f',
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    marginLeft: 8,
  },
  qtyBtn: {
    backgroundColor: '#d32f2f',
    padding: 8,
    marginHorizontal: 4,
    width: '42%',
    right: 6,
    borderTopEndRadius: 6,
    borderBottomEndRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnBottom: {
    backgroundColor: '#d32f2f',
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '43%',
    right: 6,
    borderTopEndRadius: 6,
    borderBottomEndRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#333',
    minWidth: 32,
    right: -6,
  },
  cartButton: {
    backgroundColor: '#388e3c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetails;
