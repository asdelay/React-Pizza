import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './pizza.module.scss';

export const Pizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ imageUrl, title, description, types, sizes, price }, setPizzaState] = useState({});
  const typeNames = ['тонке', 'традиційне'];
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async function fetchPizza() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://65b110fcd16d31d11bddf8be.mockapi.io/pizzas/${id}`,
        );
        setPizzaState(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(true);
        alert('error when fetching 1 pizza :(', e);
        navigate('/');
        setPizzaState({});
      }
    })();
  }, []);

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <div className="container">
      <div className={styles.root}>
        <div className={styles.pizzaInfo}>
          <div className={styles.pizzaImage}>
            <img src={imageUrl} alt="" />
          </div>
          <div className={styles.title}>
            <h2>{title}</h2>
          </div>
          <div className={styles.content}>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.pizzaSelectors}>
          <div>
            <p>{price} UAH</p>
          </div>
          <div className="pizza-block__selector">
            <ul>
              {types
                ? types.map((type, idx) => (
                    <li
                      key={idx}
                      className={activeType === idx ? 'active' : ''}
                      onClick={() => {
                        setActiveType(idx);
                      }}>
                      {typeNames[type]}
                    </li>
                  ))
                : ''}
            </ul>
            <ul>
              {sizes
                ? sizes.map((size, idx) => {
                    return (
                      <li
                        key={idx}
                        className={size === activeSize ? 'active' : ''}
                        onClick={() => setActiveSize(size)}>
                        {size} см.
                      </li>
                    );
                  })
                : ''}
            </ul>
          </div>
          <div>Склад</div>
        </div>
      </div>
    </div>
  );
};
