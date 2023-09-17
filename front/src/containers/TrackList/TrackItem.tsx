import React from 'react';
import { ITrack } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { addTrackToTrackHistory } from '../../store/trackHistoryThunk';

interface IProps {
  track: ITrack;
  setLink: (value: string | null) => void;
  link: string | null;
}

const TrackItem: React.FC<IProps> = ({track, setLink, link}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handlePlayButtonClick = async () => {
    if (link === track.trackUrl) {
      setLink(null);
    } else {
      setLink(track.trackUrl);
      await dispatch(addTrackToTrackHistory(track._id));
    }
  };

  return (
    <li key={track._id} className="tracklist__item">
      <div className="tracklist__item_left-col">
        {user &&
          <button
            className={link && link === track.trackUrl ? "track__play-btn_pause" : "tracklist__play-btn"}
            onClick={handlePlayButtonClick}
          />
        }
        <span className="tracklist__track-name">{track.numberInAlbum}. {track.name}</span>
      </div>
      <span>{track.duration}</span>
    </li>
  );
};

export default TrackItem;