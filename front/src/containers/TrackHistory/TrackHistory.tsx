import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';

const TrackHistory = () => {
  const user = useAppSelector(selectUser);
  console.log(user);
  const searchParams = new URLSearchParams(document.location.search);
  const userParams = searchParams.get('user');
  // console.log(userParams);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || !userParams) {
      console.log(user, 'red');
      console.log(userParams, 'par');
      return navigate('/');
    }
  }, [navigate, userParams, user]);


  // useEffect(() => {
  //   const queryParams = window.location.search;
  //
  //   console.log('queryParams', queryParams);
  //
  //   const urlParams = new URLSearchParams(queryParams);
  //
  //   console.log('urlParams', urlParams);
  //
  //   const userParam = urlParams.get('user');
  //
  //   console.log('userParam' ,userParam);
  //
  //   console.log('Значение параметра "user":', userParam);
  // }, []);
  return (
    <div className="container">
      Track History
    </div>
  );
};

export default TrackHistory;