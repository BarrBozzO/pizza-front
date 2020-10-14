import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import API from "api";

export const fetchPizza = createAsyncThunk(
  "pizza/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const currency = state.global.currency;

    const response = await thunkAPI.extra.api.request({
      method: "GET",
      path: "/goods",
      transformResponse: ({ goods }) => {
        return goods;
      },
      query: {
        currency,
      },
    });

    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const pizzaAdapter = createEntityAdapter();
const normalizedState = pizzaAdapter.getInitialState();

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    ...normalizedState,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      pizzaAdapter.upsertMany(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.entities = {};
      state.ids = [];
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { reducer } = pizzaSlice;

export const { selectAll: selectAllPizza } = pizzaAdapter.getSelectors(
  (state) => state.pizza
);
