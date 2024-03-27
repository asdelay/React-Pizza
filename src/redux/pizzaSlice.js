import { createSlice } from '@reduxjs/toolkit';

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: {
    pizzas: [],
  },
  reducers: {
    setPizzas: (state, action) => {
      state.pizzas = action.payload;
    },
  },
});
export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
