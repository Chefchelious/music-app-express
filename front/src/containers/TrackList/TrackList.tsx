import React, { useEffect, useState } from 'react';
import './TrackList.css';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useParams } from 'react-router-dom';
import { selectTracks, selectTracksLoading } from '../../store/tracksSlice';
import { fetchTracks } from '../../store/tracksThunk';
import Spinner from '../../components/Spinner/Spinner';
import TrackItem from './TrackItem';

const TrackList = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as {id: string};
  const tracks = useAppSelector(selectTracks);
  const loading = useAppSelector(selectTracksLoading);

  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);

  let content: React.ReactNode = <Spinner />;

  if (!loading && tracks) {
    content = (
      <div className="container tracks__wrap">
        <h2 className="tracks__title-artist">Artist: {tracks.artist.name}</h2>
        <h3 className="tracks__title-album">Album: {tracks.title}</h3>

        <ul className="tracklist">
          {tracks.tracks.map(track => (
            <TrackItem key={track._id} track={track} setLink={setLink} link={link} />
          ))}
        </ul>

        {link &&
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${link}?si=R_UhysoS50R3Gcvh&autoplay=1&mute=1`}
            title="YouTube video player"
            style={{display: 'block', border: 'none', margin: '0 auto'}}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        }
      </div>
    );
  }

  return (
    <>
      {content}
    </>
  );
};

export default TrackList;