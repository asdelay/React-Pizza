import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: 0,
    itemsCount: 0,
    items: [],
  },
  reducers: {
    // addItem: (state, action) => {
    //   state.items.push(action.payload);
    //   state.totalPrice += action.payload.price;
    // },
    addItem: (state, action) => {
      const foundItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );

      if (foundItem) {
        foundItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice += action.payload.price;
      state.itemsCount += 1;
    },
    removeItem: (state, action) => {
      const foundItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );
      if (foundItem.count === 0) {
        foundItem.count = 0;
        state.totalPrice = 0;
      } else {
        foundItem.count -= 1;
        state.totalPrice -= foundItem.price;
      }
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.itemsCount -= 1;
    },
    clearOneItem: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.size !== action.payload.size ||
          item.type !== action.payload.type,
      );
      state.totalPrice -= action.payload.price * action.payload.count;
      state.itemsCount -= action.payload.count;
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.itemsCount = 0;
    },
  },
});
export const { addItem, removeItem, clearItems, clearOneItem } = cartSlice.actions;
export default cartSlice.reducer;
