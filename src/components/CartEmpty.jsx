import React from 'react';
import { Link } from 'react-router-dom';

import cartImg from '../assets/img/empty-cart.png';
export const CartEmpty = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>Корзина порожня 😕</h2>
          <p>
            Вірогідніше всього, ви ще не замовили піцу.
            <br />
            Для того, щоб замовити піцу, перейдіть на головну сторінку.
          </p>
          <img src={cartImg} alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Повернутися назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
