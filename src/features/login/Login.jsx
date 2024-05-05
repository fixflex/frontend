import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { userLoggedIn } from '../../features/signup/authSlice';
import styles from './login.module.css';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
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
      navigate('/discover');
    }
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

      console.log(response);

      const accessToken = response.data.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      localStorage.setItem('user', JSON.stringify(response.data.data));
      dispatch(userLoggedIn(response.data.data));

      const isTasker = await baseURL.get('/taskers/me');

      if (isTasker?.data?.success) {
        dispatch(
          setTaskerInfo({
            specialtyId: isTasker?.data?.data?.categories[0],
            isTasker: true,
          })
        );
      }

      navigate('/discover');
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
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
              className={styles.checkboxLabel}
            />
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Link href='#' variant='body2' className={styles.link}>
                  Lost your password?
                </Link>
              </Grid>
            </Grid>
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
            <Grid
              container
              direction='row'
              alignItems='center'
              justifyContent='center'
              style={{ margin: '10px 0' }}
            >
              <Grid item xs={5}>
                <hr className={styles.line} />
              </Grid>
              <Grid item>
                <Typography variant='body2' style={{ margin: '0 10px' }}>
                  OR
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <hr className={styles.line} />
              </Grid>
            </Grid>
            <Grid
              container
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <GoogleAuth />
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
