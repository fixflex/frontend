import React, { useEffect, useState } from 'react';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Container,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { egyptGovernorates } from '../../utils/gov';
import baseURL from '../../API/baseURL';
import { GpsFixed } from '@mui/icons-material';
import styles from './taskerOnboarding.module.css';

const TaskerOnboarding = () => {
  const [service, setService] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [otp, setOtp] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [locationError, setLocationError] = useState('');
  const [locationButtonColor, setLocationButtonColor] = useState('default');

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocationButtonColor('success');
          setLocationError('');
        },
        (error) => {
          console.error('Error getting the location: ', error);
          setLocationError(
            'We need location access to provide better task matching.'
          );
          setLocationButtonColor('default');
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const promptForLocationPermission = () => {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          console.log(
            'Geolocation permission state is ',
            permissionStatus.state
          );
          permissionStatus.onchange = () => {
            console.log(
              'Geolocation permission state has changed to ',
              permissionStatus.state
            );
          };

          if (permissionStatus.state === 'denied') {
            alert(
              "You've denied location access. Please enable it in your browser settings to use this feature."
            );
          } else {
            getUserLocation();
          }
        });
    } else {
      getUserLocation();
    }
  };

  const getVerificationCode = async () => {
    try {
      const response = await baseURL.get(`/users/send-verification-code`);
      if (response.data.success) {
        console.log(response);
      }
    } catch (error) {
      console.error('Failed to get verification code:', error);
    }
  };

  useEffect(() => {
    getVerificationCode();
    getUserLocation();
  }, []);

  useEffect(() => {
    let interval = null;
    if (isButtonDisabled && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((count) => {
          if (count === 1) {
            setIsButtonDisabled(false);
          }
          return count - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isButtonDisabled, countdown]);

  const handleResendCode = () => {
    getVerificationCode();
    setIsButtonDisabled(true);
    setCountdown(30);
  };

  const categories = useSelector((state) => state.categories.categoriesList);
  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handleGovernorateChange = (e) => {
    setGovernorate(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ service, governorate, otp });
  };

  const formIsValid =
    service &&
    governorate &&
    otp &&
    userLocation.lat &&
    userLocation.lng &&
    !locationError;

  return (
    <Container maxWidth='sm' className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Typography
          variant='h1'
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bolder',
            textAlign: 'center',
            margin: '1.5rem 0',
          }}
        >
          A few more steps to become a tasker!
        </Typography>
        <Grid container spacing={4} alignItems='center' justify='center'>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='service-label'>
                What services do you provide?
              </InputLabel>
              <Select
                labelId='service-label'
                id='service'
                value={service}
                label='What services do you provide?'
                onChange={handleServiceChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel id='governorate-label'>City</InputLabel>
              <Select
                labelId='governorate-label'
                id='governorate'
                value={governorate}
                label='City'
                onChange={handleGovernorateChange}
              >
                {egyptGovernorates.map((governorate) => (
                  <MenuItem key={governorate} value={governorate}>
                    {governorate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              onClick={promptForLocationPermission}
              color={locationButtonColor}
            >
              <GpsFixed />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography
              color='green'
              sx={{ marginBottom: '0.5rem ', fontSize: '14px' }}
            >
              We've sent you the verification code via WhatsApp.
            </Typography>
            <TextField
              fullWidth
              id='otp'
              label='Please enter the OTP you received via WhatsApp'
              value={otp}
              onChange={handleOtpChange}
              variant='outlined'
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                variant='text'
                color='primary'
                onClick={handleResendCode}
                sx={{
                  mt: 1,
                  color: '#1b252e',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  '&:hover': {
                    backgroundColor: '#efc734',
                    scale: '1.01',
                    color: 'white',
                    fontWeight: 'normal',
                  },
                }}
                disabled={isButtonDisabled}
              >
                Send again {isButtonDisabled && `(${countdown}s)`}
              </Button>
              <Button
                variant='text'
                color='secondary'
                onClick={() =>
                  console.log('Handle incorrect phone number action')
                }
                sx={{
                  mt: 1,
                  color: '#1b252e',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  '&:hover': {
                    backgroundColor: '#efc734',
                    scale: '1.01',
                    color: 'white',
                    fontWeight: 'normal',
                  },
                }}
              >
                Incorrect phone number?
              </Button>
            </Box>
          </Grid>
          {locationError && (
            <Grid item xs={12}>
              <Typography color='error' sx={{ mb: 2 }}>
                {locationError}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{
                backgroundColor: '#1b252e',
                color: 'white',
                margin: '1rem 0',
                '&:hover': {
                  backgroundColor: '#efc734',
                  scale: '1.01',
                },
              }}
              disabled={!formIsValid}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskerOnboarding;
