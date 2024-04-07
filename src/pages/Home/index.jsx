import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import PizzaBlock from '../../components/PizzaBlock';
import PizzaBlockSkeleton from '../../components/PizzaBlock/PizzaBlockSkeleton';
import Pagination from '../../components/Pagination';
import { changeUrl } from '../../redux/slice'; //......................................
import { fetchPizzas } from '../../redux/pizzaSlice';
import { list } from '../../components/Sort';
import { filterSelector, sortSelector } from '../../redux/slice';
import { pizzasSelector } from '../../redux/pizzaSlice';
const Home = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { variant, searchVariant } = useSelector(sortSelector);
  const { searchVal, selectedPage, activeCategory: chosenCategory } = useSelector(filterSelector);
  const { pizzas, status } = useSelector(pizzasSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPizzas = async () => {
    const url = `https://65b110fcd16d31d11bddf8be.mockapi.io/pizzas?`;
    const sortQuery = `sortBy=${searchVariant.replace('-', '')}`;
    const orderByQuery = searchVariant.charAt(0) === '-' ? '&order=desc' : '';
    const categoryQuery = chosenCategory === 0 ? '' : `&category=${chosenCategory}`;
    const searhQuery = searchVal ? `&search=${searchVal}` : '';
    const pageQuery = `&page=${selectedPage}&limit=4`;

    dispatch(fetchPizzas({ url, sortQuery, orderByQuery, categoryQuery, searhQuery, pageQuery }));
  };

  useEffect(() => {
    if (window.location.search) {
      const { search, page, category, sortBy } = qs.parse(window.location.search.slice(1));
      const sortObj = list.find((obj) => {
        return obj.searchVariant === sortBy;
      });
      dispatch(
        changeUrl({
          search: search,
          page: page,
          sortBy: sortObj,
          category: category,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [searchVal, chosenCategory, searchVariant, selectedPage]);

  useEffect(() => {
    if (isMounted.current) {
      const urlString = qs.stringify({
        search: searchVal,
        page: selectedPage,
        sortBy: searchVariant,
        category: chosenCategory,
      });
      navigate(`?${urlString}`);
    }
    isMounted.current = true;
  }, [searchVal, chosenCategory, searchVariant, selectedPage]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort chosenVariant={{ variant, searchVariant }} />
        </div>
        <h2 className="content__title">Вся піцца</h2>
        <div className="content__items">
          {status === 'error' ? (
            <div className="content__items__error">
              <h3>Wrong search parameters (</h3>
              <p>try smt else or refresh the page</p>
            </div>
          ) : status === 'loading' ? (
            [...new Array(4)].map((arrayItem, idx) => <PizzaBlockSkeleton key={idx} />)
          ) : !pizzas.length ? (
            <h3 style={{ margin: '50px' }}>:( Такої піци не знайдено, спробуйте знайти іншу</h3>
          ) : (
            pizzas.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })
          )}
        </div>
        <Pagination />
      </div>
    </div>
  );
};
export default Home;
