import React, { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; // To navigate after success
import styles from './changePassword.module.css';
import baseURL from '../../API/baseURL';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSubmit = async () => {
    const patchData = {
      oldPassword,
      newPassword,
    };

    try {
      const response = await baseURL.patch('auth/change-password', patchData);

      if (response.data.success) {
        setSuccessMessage('Password changed successfully!');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/browse');
        }, 1500);
      }
    } catch (error) {
      console.error('Request error:', error);
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.centerContainer}>
      <Box component='form' className={styles.form}>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 'bold',
            margin: '1rem 0',
            textAlign: 'center',
            fontSize: '1.7rem',
          }}
        >
          Here's where you can update your password.
        </Typography>

        <TextField
          required
          label='Old Password'
          variant='outlined'
          type={showOldPassword ? 'text' : 'password'}
          value={oldPassword}
          className={styles.textField}
          onChange={(e) => setOldPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={toggleOldPasswordVisibility}>
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          required
          label='New Password'
          variant='outlined'
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          className={styles.textField}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={toggleNewPasswordVisibility}>
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {errorMessage && (
          <Typography sx={{ color: 'red', textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}

        {successMessage && (
          <Typography sx={{ color: 'green', textAlign: 'center' }}>
            {successMessage}
          </Typography>
        )}

        <Button
          variant='contained'
          sx={{
            color: 'white',
            borderRadius: '10px',
            backgroundColor: '#212121',
            '&:hover': {
              backgroundColor: '#F2CC41',
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default ChangePassword;
