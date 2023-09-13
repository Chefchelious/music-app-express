import React, { useEffect } from 'react';
import ArtistItem from './ArtistItem';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchArtists } from '../../store/artistsThunk';
import { selectArtists, selectArtistsLoading } from '../../store/artistsSlice';
import Spinner from '../../components/Spinner/Spinner';
import './ArtistLists.css';

const ArtistList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return loading ? <Spinner /> : (
    <div className="container artists">
      {artists.map(artist => (
        <ArtistItem key={artist._id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistList;