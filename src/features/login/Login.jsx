import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './login.module.css';
import { Google, KeyboardArrowRight } from '@mui/icons-material';

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

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            <Link href='#' className={styles.link}>
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
              <Button
                variant='contained'
                startIcon={<Google />}
                fullWidth
                style={{ backgroundColor: '#4285F4', color: 'white' }}
              >
                Google
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
