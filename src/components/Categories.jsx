import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../redux/slice';

function Categories() {
  const pizzaCategories = ['Всі', "М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];
  const dispatch = useDispatch();
  const chosenCategory = useSelector((store) => store.filter.activeCategory);
  return (
    <div className="categories">
      <ul>
        {pizzaCategories.map((category, idx) => {
          return (
            <li
              key={idx}
              onClick={() => {
                dispatch(setCategory(idx));
              }}
              className={chosenCategory === idx ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Categories;
