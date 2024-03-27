import React, { useState, useEffect, useRef } from 'react';
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
import { setPizzas } from '../../redux/pizzaSlice';
import { list } from '../../components/Sort';
const Home = () => {
  // const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const searchVal = useSelector((store) => store.filter.searchVal);
  const chosenCategory = useSelector((store) => store.filter.activeCategory);
  const { variant, searchVariant } = useSelector((store) => store.filter.sort);
  const selectedPage = useSelector((store) => store.filter.selectedPage);
  const { pizzas } = useSelector((store) => store.pizzas);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPizzas = async () => {
    setIsLoading(true);
    const url = `https://65b110fcd16d31d11bddf8be.mockapi.io/pizzas?`;
    const sortQuery = `sortBy=${searchVariant.replace('-', '')}`;
    const orderByQuery = searchVariant.charAt(0) === '-' ? '&order=desc' : '';
    const categoryQuery = chosenCategory === 0 ? '' : `&category=${chosenCategory}`;
    const searhQuery = searchVal ? `&search=${searchVal}` : '';
    const pageQuery = `&page=${selectedPage}&limit=4`;

    try {
      const { data } = await axios.get(
        `${url}${sortQuery}${orderByQuery}${categoryQuery}${searhQuery}${pageQuery}`,
      );
      console.log(data);
      dispatch(setPizzas(data));
    } catch (err) {
      setPizzas([]);
      console.log('AN ERROR HAS OCCURED !!!!', err);
    } finally {
      setIsLoading(false);
    }
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
      fetchPizzas();
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
      console.log(`?${urlString}`);
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
          {isLoading ? (
            [...new Array(6)].map((arrayItem, idx) => <PizzaBlockSkeleton key={idx} />)
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
