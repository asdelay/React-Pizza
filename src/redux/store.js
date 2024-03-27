import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slice';
import cartSliceReducer from './cartSlice';
import pizzaSliceReducer from './pizzaSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartSliceReducer,
    pizzas: pizzaSliceReducer,
  },
});
