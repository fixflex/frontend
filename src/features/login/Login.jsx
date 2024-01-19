import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import styles from './login.module.css';

export default function Login() {
  return (
    <Box className={styles.loginContainer}>
      <Typography variant='h5' className={styles.loginHeader}>
        Log In
      </Typography>
      <Typography variant='subtitle1' className={styles.loginSubHeader}>
        Give your visitor a smooth online experience with a solid UX design
      </Typography>
      <TextField
        label='Email Address'
        variant='outlined'
        margin='normal'
        fullWidth
        className={styles.textField}
      />
      <TextField
        label='Password'
        type='password'
        variant='outlined'
        margin='normal'
        fullWidth
        className={styles.textField}
      />
      <FormControlLabel
        control={<Checkbox name='remember' color='primary' />}
        label='Remember me'
        className={styles.rememberMe}
      />
      <Button
        variant='contained'
        color='primary'
        fullWidth
        className={styles.loginButton}
      >
        Log In
      </Button>
      <Typography align='center' variant='body2' className={styles.orText}>
        OR
      </Typography>
      <Button
        variant='outlined'
        color='primary'
        fullWidth
        className={styles.socialButton}
      >
        Continue with Facebook
      </Button>
      <Button
        variant='outlined'
        color='secondary'
        fullWidth
        className={styles.socialButton}
      >
        Continue with Google
      </Button>
      <Button variant='outlined' fullWidth className={styles.socialButton}>
        Continue with Apple
      </Button>
      <Link href='#' variant='body2' className={styles.forgotPassword}>
        Lost your password?
      </Link>
      <Typography variant='body2' className={styles.signUpText}>
        Don't have an account?{' '}
        <Link href='#' className={styles.signUpLink}>
          Sign Up!
        </Link>
      </Typography>
    </Box>
  );
}
