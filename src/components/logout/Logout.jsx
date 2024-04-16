import { LogoutOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../../features/signup/authSlice';
import styles from './logout.module.css';
import baseURL from '../../API/baseURL';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(userLoggedOut());
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');

    try {
      await baseURL.post('/auth/logout');
      navigate('/');
      window.location.reload(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <Button
        type='submit'
        variant='contained'
        endIcon={<LogoutOutlined sx={{ color: 'white' }} />}
        onClick={handleLogout}
        className={styles.logoutButton}
      >
        Log Out
      </Button>
    </>
  );
};

export default Logout;
