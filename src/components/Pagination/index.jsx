import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import qs from 'qs';

import { changePage } from '../../redux/slice';
import styles from './Pagination.module.scss';
const Pagination = () => {
  const [initPage, setInitPage] = useState(0);
  useEffect(() => {
    const selectedPage = qs.parse(window.location.search.slice(1)).page - 1;
    Number.isNaN(selectedPage) ? setInitPage(0) : setInitPage(selectedPage);
  }, []);

  const dispatch = useDispatch();
  return (
    <ReactPaginate
      forcePage={initPage}
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
