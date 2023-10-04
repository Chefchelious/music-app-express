import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className="header">
      <div className="header__content container">
        <Link className="header__logo" to="/">
          SportikFight
        </Link>

        <div>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</div>
      </div>
    </header>
  );
};

export default Header;
