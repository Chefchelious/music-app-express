import React from 'react';
import { ITrack } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { addTrackToTrackHistory } from '../../store/trackHistoryThunk';

interface IProps {
  track: ITrack;
  setTrackObj: (value: ITrack | null) => void;
  trackObj: ITrack | null;
}

const TrackItem: React.FC<IProps> = ({track, setTrackObj, trackObj}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handlePlayButtonClick = async () => {
    if (trackObj?._id === track._id && trackObj.trackUrl) {
      setTrackObj(null);
    } else {
      setTrackObj(track);
      await dispatch(addTrackToTrackHistory(track._id));
    }
  };

  return (
    <li key={track._id} className="tracklist__item">
      <div className="tracklist__item_left-col">
        {user &&
          <button
            className={
              trackObj &&
              trackObj.trackUrl &&
              trackObj.trackUrl === track.trackUrl ? "track__play-btn_pause" : "tracklist__play-btn"
            }
            onClick={handlePlayButtonClick}
          />
        }
        <span className="tracklist__track-name">{track.numberInAlbum}. {track.name}</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
        <span>{track.duration}</span>
        { !track.isPublished && <span>Не опубликованно</span> }
      </div>
    </li>
  );
};

export default TrackItem;