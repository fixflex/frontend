import { LogoutOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../../features/signup/authSlice';
import styles from './logout.module.css';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLoggedOut());

    localStorage.removeItem('user');

    navigate('/');
  };

  return (
    <>
      <Button
        type='submit'
        variant='contained'
        endIcon={<LogoutOutlined />}
        onClick={handleLogout}
        className={styles.logoutButton}
      >
        Log Out
      </Button>
    </>
  );
};

export default Logout;
