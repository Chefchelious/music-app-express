import React, { useEffect } from 'react';
import ArtistItem from './ArtistItem';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchArtists } from '../../store/artistsThunk';
import { selectArtists, selectArtistsLoading } from '../../store/artistsSlice';
import Spinner from '../../components/Spinner/Spinner';
import { selectUser } from '../../store/usersSlice';
import './ArtistLists.css';

const ArtistList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsLoading);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return loading ? <Spinner/> : (
    <div className="container artists">
      {artists.map(artist => {
        if (artist.isPublished) {
          return <ArtistItem key={artist._id} artist={artist}/>;
        }
        if (user && user._id === artist.user && !artist.isPublished) {
          return <ArtistItem key={artist._id} artist={artist}/>;
        }

        if (user && user.role === 'admin') {
          return <ArtistItem key={artist._id} artist={artist}/>;
        }
        return null;
      })}
    </div>
  );
};

export default ArtistList;