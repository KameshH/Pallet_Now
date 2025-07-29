import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {cart: []};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    checkout: state => {
      state.cart = [];
    },
  },
});

export const {addToCart, checkout} = cartSlice.actions;
export default cartSlice.reducer;
