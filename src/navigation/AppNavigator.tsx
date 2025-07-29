import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from '../component/ProductList';
import ProductDetails from '../screens/productDetails';
import LoginScreen from '../screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParamList = {
  LoginScreen: undefined;
  ProductList: undefined;
  ProductDetails: { product: any };
  Cart: { selectedProduct: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
    };
    checkUser();
  }, []);

  if (isLoggedIn === null) return null;
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
