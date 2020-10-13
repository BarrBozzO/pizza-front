import { createSlice } from "@reduxjs/toolkit";

const USD = "USD";

const initialState = {
  currency: USD,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeCurrency(state, action) {
      return (state.currency = action.payload);
    },
  },
});

const { actions, reducer } = globalSlice;

export const { changeCurrency } = actions;

export { reducer };
