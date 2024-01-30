import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import styles from './notFound.module.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
      className={styles.notFound}
    >
      <Typography variant='h4' gutterBottom className={styles.notFoundText}>
        Lost in space? Get back to the action!
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate('/')}
        className={styles.homeButton}
      >
        Home
      </Button>
    </Box>
  );
}

export default NotFound;
