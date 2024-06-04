import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { userLoggedIn } from '../../features/signup/authSlice';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../API/baseURL';
import { setTaskerInfo } from '../tasker-onboarding/taskerInfoSlice';

const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#ECF6FA',
    },
    primary: {
      main: '#D9B433',
    },
  },
});

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();

  const loggedInUser = localStorage.getItem('user');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate('/browse');
    }

    // (async () => {
    //   try {
    //     const response = await baseURL.post('/auth/forgot-password', {
    //       email: 'menna.aa@yahoo.com',
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     console.error('Failed to reset password:', error);
    //   }
    // })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await baseURL.post('/auth/login', {
        email,
        password,
      });

      const accessToken = response.data.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }

      const isTasker = await baseURL.get('/taskers/me');

      if (isTasker?.data?.success) {
        dispatch(
          setTaskerInfo({
            specialtyId: isTasker?.data?.data?.categories[0],
            isTasker: true,
          })
        );
      }

      const profilePic = await baseURL.get('/users/me');

      console.log(profilePic);

      dispatch(
        userLoggedIn({
          ...response.data?.data,
          profilePicture: profilePic.data?.data?.profilePicture,
        })
      );
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...response.data?.data,
          profilePicture: profilePic.data?.data?.profilePicture,
        })
      );

      console.log('login response', response);
      console.log('profilePic response', profilePic);

      navigate('/browse');
    } catch (error) {
      if (error.response) {
        setLoginError(
          error.response.data.message || 'Login failed. Please try again.'
        );
      } else {
        setLoginError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs' className={styles.container}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Typography component='h1' variant='h5'>
            We're glad to see you again!
          </Typography>
          <Typography
            component='p'
            sx={{ fontSize: '0.9rem', margin: '1rem 0' }}
          >
            Don't have an account?{' '}
            <Link href='/signup' className={styles.link}>
              Sign Up!
            </Link>
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              className={styles.textField}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              className={styles.textField}
            />

            {loginError && (
              <Typography color='error' align='center'>
                {loginError}
              </Typography>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={styles.submitButton}
              endIcon={<KeyboardArrowRight />}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
