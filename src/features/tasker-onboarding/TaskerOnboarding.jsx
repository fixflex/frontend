import React, { useState } from 'react';
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
} from '@mui/material';
import { useSelector } from 'react-redux';
import { egyptGovernorates } from '../../utils/gov';

const TaskerOnboarding = () => {
  const [service, setService] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [otp, setOtp] = useState('');

  const categories = useSelector((state) => state.categories.categoriesList);
  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const handleGovernorateChange = (event) => {
    setGovernorate(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ service, governorate, otp });
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        boxShadow: '0 3px 10px rgb(0 0 0 / 20%)',
        p: '5rem',
        margin: '5rem 30rem',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant='h2'
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bolder',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          A few more steps to become a tasker !
        </Typography>
        <Grid container spacing={2} alignItems='center' justify='center'>
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
                sx={{
                  margin: '1rem 0',
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='governorate-label'>City</InputLabel>
              <Select
                labelId='governorate-label'
                id='governorate'
                value={governorate}
                label='City'
                onChange={handleGovernorateChange}
                sx={{
                  margin: '1rem 0',
                }}
              >
                {egyptGovernorates.map((governorate) => (
                  <MenuItem key={governorate} value={governorate}>
                    {governorate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='otp'
              label='Please enter the OTP you received via WhatsApp'
              value={otp}
              onChange={handleOtpChange}
              variant='outlined'
              sx={{
                margin: '1rem 0',
              }}
            />
          </Grid>
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
