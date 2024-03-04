import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import styles from './auth-redirect.module.css';

const AuthRedirect = () => {
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
      className={styles.container}
    >
      <Typography variant='h4' gutterBottom className={styles.notFoundText}>
        You must be logged in to view this page!
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/login')}
          className={styles.loginButton}
        >
          Login
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/signup')}
          className={styles.signupButton}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default AuthRedirect;
