import React, { useState } from 'react';
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
import axios from 'axios';

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

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await axios.post(
        'https://fixflex.onrender.com/api/v1/auth/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('user', JSON.stringify(response.data.data));
      dispatch(userLoggedIn(response.data.data));

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
