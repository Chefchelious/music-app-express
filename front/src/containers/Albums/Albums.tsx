import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchAlbumsByArtist } from '../../store/albumsThunk';
import AlbumItem from './AlbumItem';
import { selectAlbums, selectAlbumsLoading } from '../../store/albumsSlice';
import Spinner from '../../components/Spinner/Spinner';
import './Albums.css';

const Albums = () => {
  const { id } = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectAlbumsLoading);

  useEffect(() => {
    dispatch(fetchAlbumsByArtist(id));
  }, [dispatch, id]);

  let content: React.ReactNode | null = null;

  if (loading) {
    content = <Spinner />;
  }

  if (albums) {
    content = (
      <div className="container">

        <h2 className="albums__title">{albums.artist}</h2>

        <div className="albums">
          {albums.albums.map(album => (
            <AlbumItem key={album._id} album={album} />
          ))}
        </div>

      </div>
    );
  }

  return content;
};

export default Albums;