import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import API from "api";

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async (_, thunkAPI) => {
    const response = await API.request({
      method: "GET",
      path: "/orders",
      transformResponse: ({ orders }) => {
        return orders;
      },
    });

    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

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
      ordersAdapter.upsertMany(state, action.payload);
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
