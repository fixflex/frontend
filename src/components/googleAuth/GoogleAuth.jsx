import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { userLoggedIn } from '../../features/signup/authSlice';

const GoogleAuth = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          uid: user.uid,
          email: user.email,
        };

        dispatch(userLoggedIn(userData));
        console.log('Sign-in successful!', user);
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-in error', errorCode, errorMessage);
      });
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
