import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import styles from './signup.module.css';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from '../../components/googleAuth/GoogleAuth';
import { userLoggedIn } from '../../features/signup/authSlice';

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

const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
  };

  const handlePurposeChange = (event) => {
    setUserType(event.target.value);
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
            Sign Up
          </Typography>
          <Typography sx={{ margin: '1rem 0' }}>
            Let's create your account!
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
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              autoFocus
              className={styles.textField}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
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
              autoComplete='new-password'
              className={styles.textField}
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel required id='purpose-label'>
                I'm here to
              </InputLabel>
              <Select
                labelId='purpose-label'
                id='purpose'
                value={userType}
                label="I'm here to"
                onChange={handlePurposeChange}
                className={styles.textField}
              >
                <MenuItem value={'user'}>look for a handyman</MenuItem>
                <MenuItem value={'flexer'}>find work as a handyman</MenuItem>
              </Select>
            </FormControl>
            {signupError && (
              <Typography color='error' align='center'>
                {signupError}
              </Typography>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={styles.submitButton}
              endIcon={<KeyboardArrowRight />}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item sx={{ width: '100%' }}>
                <Link href='/login' variant='body2' className={styles.link}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              alignItems='center'
              justifyContent='center'
              style={{ margin: '20px 0' }}
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

export default Signup;
