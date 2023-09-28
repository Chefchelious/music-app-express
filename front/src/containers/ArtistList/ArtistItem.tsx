import React from 'react';
import { IArtist } from '../../types';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { deleteArtist, fetchArtists, toggleArtistPublished } from '../../store/artistsThunk';

interface IProps {
  artist: IArtist;
}

const ArtistItem: React.FC<IProps> = ({artist}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  let image: string | null = null;

  if (artist.image) {
    image = `${apiUrl}/${artist.image}`;
  }

  const publishArtist = async () => {
    await dispatch(toggleArtistPublished(artist._id));
    await dispatch(fetchArtists());
  };

  const handleDeleteArtist = async () => {
    try {
      await dispatch(deleteArtist(artist._id)).unwrap();
      await dispatch(fetchArtists());
    } catch (e) {
      alert('something went wrong, maybe artist has albums...')
    }
  };

  return (
    <div>
      <Link to={`/artists/${artist._id}/albums`} className="artist-card">
        {image &&
          <div className="artist-card__img-wrap">
            <img className="artist-card__img" src={image} alt={artist.name} />
          </div>
        }
        <div style={{textAlign: 'center'}}> <span><strong>{artist.name}</strong></span></div>
        { !artist.isPublished && <div>Не опубликовано</div>}
      </Link>

      { user && user.role === 'admin' && (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          { !artist.isPublished && <Button color="secondary" onClick={publishArtist}>publish</Button>}
          <Button onClick={handleDeleteArtist}>delete</Button>
        </div>
      )}
    </div>
  );
};

export default ArtistItem;