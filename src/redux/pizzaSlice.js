import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ url, sortQuery, orderByQuery, categoryQuery, searhQuery, pageQuery }) => {
    const { data } = await axios.get(
      `${url}${sortQuery}${orderByQuery}${categoryQuery}${searhQuery}${pageQuery}`,
    );
    return data;
  },
);

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: {
    pizzas: [],
    status: 'loading',
  },
  reducers: {
    setPizzas: (state, action) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
    });
  },
});
export const pizzasSelector = (store) => store.pizzas;
export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
