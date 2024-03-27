import React from 'react';
import styles from './index.module.scss';
export const NotFoundBlock = () => {
  return (
    <div className="content">
      <div className="container">
        <div className={styles.root}>
          <h1>
            <span>😕</span>
            <br />
            Нічого не знайдено
          </h1>
          <p className={styles.description}>На жаль, цієї сторінки немає на нашому сайті</p>
        </div>
      </div>
    </div>
  );
};
