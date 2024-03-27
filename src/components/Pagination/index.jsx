import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';

import { changePage } from '../../redux/slice';
import styles from './Pagination.module.scss';
const Pagination = () => {
  useEffect(() => {
    console.log('render');
  });
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      initialPage={0}
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      pageRangeDisplayed={4}
      onPageChange={(e) => {
        dispatch(changePage(e.selected + 1));
      }}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
