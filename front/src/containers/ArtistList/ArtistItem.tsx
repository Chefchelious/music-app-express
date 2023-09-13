import React from 'react';
import { IArtist } from '../../types';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';

interface IProps {
  artist: IArtist;
}

const ArtistItem: React.FC<IProps> = ({artist}) => {
  let image: string | null = null;

  if (artist.image) {
    image = `${apiUrl}/${artist.image}`;
  }

  return (
    <Link to={`/artists/${artist._id}/albums`} className="artist-card">
      {image &&
        <div className="artist-card__img-wrap">
          <img className="artist-card__img" src={image} alt={artist.name} />
        </div>
      }
      <span><strong>{artist.name}</strong></span>
    </Link>
  );
};

export default ArtistItem;