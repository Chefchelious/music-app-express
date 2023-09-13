import React from 'react';
import { IAlbum } from '../../types';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';

interface IProps {
  album: IAlbum
}
const AlbumItem: React.FC<IProps> = ({album}) => {
  let image: string | null = null;

  if (album.image) {
    image = `${apiUrl}/${album.image}`;
  }
  return (
    <Link to={`/albums/${album._id}/tracks`} className="album-card">
      {image &&
        <div className="album-card__img-wrap">
          <img className="album-card__img" src={image} alt={album.name} />
        </div>
      }

      <div className="album-card__info">
        <p><strong>{album.name}</strong></p>
        <p>Год выхода: {album.year}</p>
        <p>Треков: {album.totalTracks}</p>
      </div>
    </Link>
  );
};

export default AlbumItem;