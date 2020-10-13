import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  items: {},
};

const globalSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.count += 1;
      state.items[action.payload.id] =
        (state.items[action.payload.id] || 0) + 1;
    },
    removeItem(state, action) {
      state.count -= 1;
      state.items[action.payload.id] = state.items[action.payload.id] - 1;
    },
    dropCart(state) {
      state.count = 0;
      state.items = [];
    },
  },
});

const { actions, reducer } = globalSlice;

export const { addItem, removeItem, dropCart } = actions;

export { reducer };
