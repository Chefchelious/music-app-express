import React, { useEffect } from 'react';
import './ArtistLists.css';
import ArtistItem from './ArtistItem';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchArtists } from '../../store/artistsThunk';
import { selectArtists, selectArtistsLoading } from '../../store/artistsSlice';
import Spinner from '../../components/Spinner/Spinner';

const ArtistList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, []);
  return loading ? <Spinner /> : (
    <div className="container artists">
      {artists.map(artist => (
        <ArtistItem key={artist._id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistList;