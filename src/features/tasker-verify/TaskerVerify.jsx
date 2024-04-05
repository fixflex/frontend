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
} from '@mui/material';
import { useSelector } from 'react-redux';
import { egyptGovernorates } from '../../utils/gov';

const TaskerVerify = () => {
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
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit}>
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskerVerify;
