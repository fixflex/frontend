import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { userLoggedIn } from '../../features/signup/authSlice';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    console.log('hi');
  };

  return (
    <Button
      variant='contained'
      fullWidth
      style={{ backgroundColor: '#4285F4', color: 'white' }}
      onClick={handleSignIn}
    >
      Join with Google <GoogleIcon />
    </Button>
  );
};

export default GoogleAuth;
