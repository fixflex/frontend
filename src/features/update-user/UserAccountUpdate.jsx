import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import styles from './userAccountUpdate.module.css';
import { useSelector } from 'react-redux';
import baseURL from '../../API/baseURL';

const UserAccountUpdate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    const patchData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    };

    try {
      const response = await baseURL.patch('/users/me', patchData);

      if (response.data.success) {
      }

      console.log(response);
    } catch (error) {
      console.error('Request error:', error);
      setErrorMessage(error.response.data.message);
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
          Here's where you can update your contact info.
        </Typography>
        <div className={styles.buttonContainer}>
          <Button className={styles.textButton} href='#'>
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
        {errorMessage && (
          <Typography sx={{ color: 'red', textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          href='#'
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
