import React from 'react';
import { ITrack } from '../../types';
import { useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';

interface IProps {
  track: ITrack;
}

const TrackItem: React.FC<IProps> = ({track}) => {
  const user = useAppSelector(selectUser);

  return (
    <li key={track._id} className="tracklist__item">
      <div className="tracklist__item_left-col">
        {user &&
          <button className="tracklist__play-btn" />
        }
        <span className="tracklist__track-name">{track.numberInAlbum}. {track.name}</span>
      </div>
      <span>{track.duration}</span>
    </li>
  );
};

export default TrackItem;