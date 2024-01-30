import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import styles from './auth-redirect.module.css';

const AuthRedirect = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

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
        Lost in space? Get back to the action!
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
