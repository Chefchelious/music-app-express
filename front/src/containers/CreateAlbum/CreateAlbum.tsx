import React from 'react';
import { Container, Typography } from '@mui/material';
import AlbumForm from '../../components/AlbumForm/AlbumForm';

const CreateAlbum = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{mb: 3}}>
        New album
      </Typography>

      <AlbumForm />
    </Container>
  );
};

export default CreateAlbum;