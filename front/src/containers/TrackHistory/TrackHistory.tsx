import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { fetchTrackHistory } from '../../store/trackHistoryThunk';
import { selectTrackHistory, selectTrackHistoryLoading } from '../../store/trackHistorySlice';
import dayjs from 'dayjs';
import Spinner from '../../components/Spinner/Spinner';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const trackHistory = useAppSelector(selectTrackHistory);
  const loading = useAppSelector(selectTrackHistoryLoading);

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      return navigate('/login');
    }
  }, [navigate, user]);

  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <ul style={{ maxWidth: '600px', margin: '0 auto' }}>
        {trackHistory.map((t) => (
          <li
            key={t._id}
            style={{
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '30px',
            }}
          >
            <span>
              {t.artist} - {t.track}
            </span>
            <span>at: {dayjs(t.datetime).format('DD.MM.YYYY HH:mm')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackHistory;
