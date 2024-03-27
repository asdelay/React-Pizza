import React from 'react';

import { NotFoundBlock } from '../../components/NotFoundBlock';
import Header from '../../components/Header';
const ErrorPage = () => {
  return (
    <div className="wrapper">
      <Header />
      <NotFoundBlock />
    </div>
  );
};
export default ErrorPage;
