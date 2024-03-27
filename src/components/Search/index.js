import React, { useState, useRef, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.scss';
import { setSearch } from '../../redux/slice';

const Index = () => {
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const debouncedFunction = useCallback(
    debounce((smt) => {
      dispatch(setSearch(smt));
    }, 300),
    [],
  );
  const inputRef = useRef();
  const searchFromRedux = useSelector((store) => {
    return store.filter.searchVal;
  });
  useEffect(() => {
    firstRender.current = true;
  }, []);
  useEffect(() => {
    if (searchFromRedux && firstRender.current) {
      setCurrentSearch(searchFromRedux);
      firstRender.current = false;
    }
  });
  const [currentSearch, setCurrentSearch] = useState('');
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 50 50">
        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
      </svg>
      <input
        onChange={(e) => {
          setCurrentSearch(e.target.value);
          debouncedFunction(e.target.value);
        }}
        ref={inputRef}
        className={styles.searchInput}
        placeholder="Шукати піцу"
        value={currentSearch}
      />
      {currentSearch && (
        <svg
          onClick={() => {
            setCurrentSearch('');
            debouncedFunction('');
            inputRef.current.focus();
          }}
          version="1.1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.clear}>
          <g id="grid_system" />
          <g id="_icons">
            <path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z" />
          </g>
        </svg>
      )}
    </div>
  );
};
export default Index;
