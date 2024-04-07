import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    activeCategory: 0,
    sort: { variant: 'популярності', searchVariant: '-rating' },
    selectedPage: 1,
    searchVal: '',
  },
  reducers: {
    setCategory: (store, action) => {
      store.activeCategory = action.payload;
    },
    setSort: (store, action) => {
      store.sort.variant = action.payload.variant;
      store.sort.searchVariant = action.payload.searchVariant;
    },
    changePage: (store, action) => {
      store.selectedPage = action.payload;
    },
    setSearch: (store, action) => {
      store.searchVal = action.payload;
    },
    changeUrl: (store, action) => {
      store.activeCategory = Number(action.payload.category);
      store.sort = action.payload.sortBy;
      store.selectedPage = Number(action.payload.page);
      store.searchVal = action.payload.search;
    },
  },
});
export const filterSelector = (store) => store.filter;
export const sortSelector = (store) => store.filter.sort;
export const chosenVaiantSelector = (store) => store.filter.sort.variant;
export const { setCategory, setSort, changePage, setSearch, changeUrl } = filterSlice.actions;
export default filterSlice.reducer;
