import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log('Sign-in successful!', user);
        navigate('/dashboard');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Log or handle errors here
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
