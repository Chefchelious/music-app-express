import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="header">
      <div className="header__content container">
        <Link className="header__logo" to="/">SportikFight</Link>
      </div>
    </header>
  );
};

export default Header;