import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  discounted_price: number;
  original_price: number;
  quantity: number;
  images?: {
    front?: string;
  };
  main_category?: string;
  discount_percent?: number;
  fallbackImage?: any;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = { cart: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.cart = state.cart.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.cart = [];
    },
    checkout: state => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  checkout,
} = cartSlice.actions;
export default cartSlice.reducer;
