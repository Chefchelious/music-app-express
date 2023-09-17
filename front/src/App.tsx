import React from 'react';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import ArtistList from './containers/ArtistList/ArtistList';
import Albums from './containers/Albums/Albums';
import TrackList from './containers/TrackList/TrackList';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import TrackHistory from './containers/TrackHistory/TrackHistory';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<ArtistList />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="artists/:id/albums" element={<Albums />} />

        <Route path="albums/:id/tracks" element={<TrackList />} />

        <Route path="/track_history" element={<TrackHistory />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
