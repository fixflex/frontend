import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import styles from './userAccountUpdate.module.css';
import { useDispatch, useSelector } from 'react-redux';
import baseURL from '../../API/baseURL';
import { userLoggedIn } from '../signup/authSlice';
import ImageUploader from '../../components/image-uploader/ImageUploader';

const UserAccountUpdate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth?.user);
  const isTasker = useSelector((state) => state.taskerInfo.isTasker);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleSubmit = async () => {
    const patchData = {};
    if (firstName !== userInfo.firstName) patchData.firstName = firstName;
    if (lastName !== userInfo.lastName) patchData.lastName = lastName;
    if (email !== userInfo.email) patchData.email = email;

    if (profileImage) {
      const formData = new FormData();
      formData.append('image', profileImage);

      try {
        await baseURL.patch('/users/me/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'An error occurred');
        setSuccessMessage('');
        return;
      }
    }

    try {
      const response = await baseURL.patch('/users/me', patchData);

      if (response.data.success) {
        setSuccessMessage('Contact information updated successfully!');
        setErrorMessage('');
        localStorage.setItem('user', JSON.stringify(response.data.data));
        dispatch(userLoggedIn(response.data.data));
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setSuccessMessage('');
    }
  };

  const handleImageSelect = (file) => {
    setProfileImage(file);
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
          Here's where you can update your contact info.
        </Typography>
        <div className={styles.buttonContainer}>
          <Button className={styles.textButton} href='/change-password'>
            Change password?
          </Button>
          {!isTasker && (
            <Button className={styles.textButton} href='/become-tasker'>
              Become a tasker!
            </Button>
          )}
        </div>
        <TextField
          label='First Name'
          variant='outlined'
          value={firstName}
          className={styles.textField}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label='Last Name'
          variant='outlined'
          value={lastName}
          className={styles.textField}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          type='email'
          label='Email'
          value={email}
          variant='outlined'
          className={styles.textField}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography
          variant='h4'
          sx={{
            fontWeight: 'bold',
            margin: '1rem 0',
            textAlign: 'center',
            fontSize: '1.5rem',
          }}
        >
          Upload Profile Picture
        </Typography>
        <div className={styles.hideButton}>
          <ImageUploader
            onImageSelect={handleImageSelect}
            uploadUrl='/users/me/profile-picture'
          />
        </div>
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

export default UserAccountUpdate;
