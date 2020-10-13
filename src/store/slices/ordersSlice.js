import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { dropCart } from "./cartSlice";
import API from "api";

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const currency = state.global.currency;

    const response = await API.request({
      method: "GET",
      path: "/orders",
      transformResponse: ({ orders }) => {
        return orders;
      },
      query: {
        currency,
      },
    });
    // debugger;
    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const makeOrder = createAsyncThunk(
  "orders/create",
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const cartItems = state.cart.items;

    const response = await API.request({
      method: "POST",
      path: "/orders",
      payload: {
        address: {
          ...data,
        },
        goods: Object.entries(cartItems).reduce((accum, item) => {
          if (item[1] > 0) {
            accum.push({
              id: item[0],
              count: item[1],
            });
          }

          return accum;
        }, []),
      },
    });

    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    thunkAPI.dispatch(dropCart());
    return response.data;
  }
);

export const ordersAdapter = createEntityAdapter();
const normalizedState = ordersAdapter.getInitialState();

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    ...normalizedState,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      // debugger;
      if (action.payload.length) {
        ordersAdapter.upsertMany(state, action.payload);
      } else {
        ordersAdapter.removeAll(state);
      }
      state.loading = false;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.entities = {};
      state.ids = [];
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { reducer } = ordersSlice;

export const { selectAll: selectAllOrders } = ordersAdapter.getSelectors(
  (state) => state.orders
);
