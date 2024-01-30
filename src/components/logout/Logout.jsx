import { LogoutOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../../features/signup/authSlice';
import styles from './logout.module.css';
import axios from 'axios';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(userLoggedOut());

    localStorage.removeItem('user');

    await axios.post('https://fixflex.onrender.com/api/v1/auth/logout');

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
