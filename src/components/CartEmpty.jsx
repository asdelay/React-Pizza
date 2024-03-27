import React from 'react';
import { Link } from 'react-router-dom';

import cartImg from '../assets/img/empty-cart.png';
export const CartEmpty = () => {
  return (
    <div class="content">
      <div class="container container--cart">
        <div class="cart cart--empty">
          <h2>
            Корзина порожня <icon>😕</icon>
          </h2>
          <p>
            Вірогідніше всього, ви ще не замовили піцу.
            <br />
            Для того, щоб замовити піцу, перейдіть на головну сторінку.
          </p>
          <img src={cartImg} alt="Empty cart" />
          <Link to="/" class="button button--black">
            <span>Повернутися назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
