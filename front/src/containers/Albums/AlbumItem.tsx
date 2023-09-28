import React from 'react';
import { IAlbum } from '../../types';
import { apiUrl } from '../../constants';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { deleteAlbum, fetchAlbumsByArtist, toggleAlbumPublished } from '../../store/albumsThunk';

interface IProps {
  album: IAlbum;
}

const AlbumItem: React.FC<IProps> = ({ album }) => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  let image: string | null = null;

  if (album.image) {
    image = `${apiUrl}/${album.image}`;
  }

  const handlePublishedAlbum = async () => {
    await dispatch(toggleAlbumPublished(album._id));
    await dispatch(fetchAlbumsByArtist(id));
  };

  const handleDeleteAlbum = async () => {
    try {
      await dispatch(deleteAlbum(album._id)).unwrap();
      await dispatch(fetchAlbumsByArtist(id));
    } catch (e) {
      alert('something went wrong, maybe there are tracks in the album...');
    }
  };

  return (
    <div>
      <Link to={`/albums/${album._id}/tracks`} className="album-card">
        {image && (
          <div className="album-card__img-wrap">
            <img className="album-card__img" src={image} alt={album.name} />
          </div>
        )}

        <div className="album-card__info">
          <p><strong>{album.name}</strong></p>
          <p>Год выхода: {album.year}</p>
          <p>Треков: {album.totalTracks}</p>
          {!album.isPublished && <p>Не опубликовано</p>}
        </div>
      </Link>

      {user && user.role === 'admin' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {!album.isPublished && <Button color="secondary" onClick={handlePublishedAlbum}>publish</Button>}
          <Button onClick={handleDeleteAlbum}>delete</Button>
        </div>
      )}
    </div>
  );
};

export default AlbumItem;
