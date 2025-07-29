import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types/product.entities';
import { ApiResponse } from '../../types/common.entities';
import { PRODUCT_SERVICE } from '../../service/api';

// API response structure for products
export interface ProductsApiData {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: Product[];
}

export interface ProductsApiResponse {
  es: number;
  message: string;
  statusCode: number;
  data: ProductsApiData;
}

type ProductRequest = {
  page: string;
  pageSize: string;
};

type ProductsState = ApiResponse<ProductsApiResponse>;

const initialState: ProductsState = {
  data: undefined,
  error: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (payload: ProductRequest, thunkAPI) => {
    try {
      const response = await axios.post<ProductsApiResponse>(
        PRODUCT_SERVICE.FEATCH_PRODUCTS,
        payload,
      );
      console.log('fetchProducts response:', response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: 'An unexpected error occurred',
      });
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.error = undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = undefined;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
