import './scss/app.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export const SearchContext = React.createContext([]);
function App() {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
