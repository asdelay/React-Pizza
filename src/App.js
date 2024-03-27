import './scss/app.scss';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export const SearchContext = React.createContext([]);
function App() {
  const [searchVal, setSearchVal] = useState('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={[searchVal, setSearchVal]}>
        <Header />
        <Outlet />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
