import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../redux/slices/cartSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Cart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);

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

  const getFallbackImage = (itemId: string) => {
    const index = itemId.length % fallbackImages.length;
    return fallbackImages[index];
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.discounted_price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert(
        'Empty Cart',
        'Please add items to your cart before checkout.',
      );
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Order placed successfully!',
      text2: `Total: ₹${totalPrice.toFixed(2)}`,
      position: 'top',
      visibilityTime: 2000,
    });

    setTimeout(() => {
      dispatch(clearCart());
      navigation.navigate('ProductList');
    }, 2000);
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image
        source={
          item?.images?.front
            ? { uri: item.images.front }
            : item.fallbackImage || getFallbackImage(item.id)
        }
        style={styles.itemImage}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.main_category}</Text>
        <Text style={styles.itemPrice}>₹{item.discounted_price}</Text>
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
            style={styles.quantityBtn}
          >
            <MaterialIcons name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
            style={styles.quantityBtn}
          >
            <MaterialIcons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleRemoveItem(item.id)}
          style={styles.removeBtn}
        >
          <MaterialIcons name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="shopping-cart" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.shopNowBtn}
          onPress={() => navigation.navigate('ProductList')}
        >
          <Text style={styles.shopNowText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Items:</Text>
          <Text style={styles.summaryValue}>{totalItems}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Price:</Text>
          <Text style={styles.summaryValue}>₹{totalPrice.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>
          Checkout (₹{totalPrice.toFixed(2)})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  shopNowBtn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeBtn: {
    backgroundColor: '#f44336',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summary: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Cart;
