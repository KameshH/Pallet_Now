import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Order {
  orderNo: string;
  dateTime: string;
  totalAmount: number;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {orders: []};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      AsyncStorage.setItem('orders', JSON.stringify(state.orders)).catch(err =>
        console.error('Error saving order:', err),
      );
    },
    loadOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export const {addOrder, loadOrders} = ordersSlice.actions;
export default ordersSlice.reducer;
