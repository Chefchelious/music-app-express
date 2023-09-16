import React from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
const Header = () => {
  return (
    <header className="header">
      <div className="header__content container">
        <Link className="header__logo" to="/">SportikFight</Link>

        <div>
          <Button component={NavLink} to="/register" color="inherit">Sign up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;