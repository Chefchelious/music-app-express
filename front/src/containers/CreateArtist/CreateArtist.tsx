import React from 'react';
import { Container, Typography } from '@mui/material';
import ArtistForm from '../../components/ArtistForm/ArtistForm';

const CreateArtist = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{mb: 3}}>
        New artist
      </Typography>

      <ArtistForm />
    </Container>
  );
};

export default CreateArtist;