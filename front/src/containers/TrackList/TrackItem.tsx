import React from 'react';
import { ITrack } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { addTrackToTrackHistory } from '../../store/trackHistoryThunk';
import {useParams} from "react-router-dom";
import {Button} from "@mui/material";
import {deleteTrack, fetchTracks, toggleTrackPublished} from "../../store/tracksThunk";

interface IProps {
  track: ITrack;
  setTrackObj: (value: ITrack | null) => void;
  trackObj: ITrack | null;
}

const TrackItem: React.FC<IProps> = ({track, setTrackObj, trackObj}) => {
  const { id } = useParams() as { id: string };
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

  const handlePublishedTrack = async () => {
    await dispatch(toggleTrackPublished(track._id));
    await dispatch(fetchTracks(id));
  };

  const handleDeleteTrack = async () => {
    try {
      await dispatch(deleteTrack(track._id)).unwrap();
      await dispatch(fetchTracks(id));
    } catch (e) {
      alert('something went wrong, maybe there are tracks in the album...');
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

        {user && user.role === 'admin' && (
          <div style={{ display: 'flex', alignItems: 'center'}}>
            {!track.isPublished && <Button color="secondary" onClick={handlePublishedTrack}>publish</Button>}
          </div>
        )}

        { user && (user.role === 'admin' || (user._id === track.user && !track.isPublished )) &&
          <Button onClick={handleDeleteTrack}>delete</Button>
        }
      </div>
    </li>
  );
};

export default TrackItem;