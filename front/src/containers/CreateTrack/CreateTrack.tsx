import React from 'react';
import { Container, Typography } from '@mui/material';
import TrackForm from '../../components/TrackForm/TrackForm';


const CreateTrack = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{mb: 3}}>
        New track
      </Typography>

      <TrackForm />
    </Container>
  );
};

export default CreateTrack;