import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import API from "api";

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetch",
  async (_, thunkAPI) => {
    const response = await API.request({
      method: "GET",
      path: "/currencies",
      transformResponse: ({ currencies }) => {
        return currencies;
      },
    });

    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const currenciesAdapter = createEntityAdapter();
const normalizedState = currenciesAdapter.getInitialState();

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    ...normalizedState,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      currenciesAdapter.upsertMany(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.entities = {};
      state.ids = [];
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { reducer } = currenciesSlice;

export const {
  selectAll: selectAllCurrencies,
} = currenciesAdapter.getSelectors((state) => state.currencies);
