import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
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
    <div className={styles.container}>
      <h1>Hello flexer! You must login to view this page!</h1>
      <div className={styles.buttonContainer}>
        <Button variant='contained' color='primary' onClick={handleLogin}>
          Login
        </Button>
        <Button variant='contained' color='secondary' onClick={handleSignup}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default AuthRedirect;
