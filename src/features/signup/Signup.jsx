import React, { useState } from 'react';
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
import { Google, KeyboardArrowRight } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import styles from './signup.module.css';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#dab63227',
    },
    primary: {
      main: '#4caf50',
    },
  },
});

const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [purpose, setPurpose] = useState('');
  const navigate = useNavigate('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created
        console.log('User signed up', userCredential);
        navigate('/dashboard');
      })
      .catch((error) => {
        setSignupError(error.message);
      });
  };

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
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
                value={purpose}
                label="I'm here to"
                onChange={handlePurposeChange}
                className={styles.textField}
              >
                <MenuItem value={'hire'}>look for a handyman</MenuItem>
                <MenuItem value={'work'}>find work as a handyman</MenuItem>
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
              <Button
                variant='contained'
                fullWidth
                style={{ backgroundColor: '#4285F4', color: 'white' }}
                className={styles.googleSignupButton}
              >
                Signup with Google <Google />
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
