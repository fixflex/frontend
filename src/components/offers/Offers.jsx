import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import styles from './offers.module.css';
import baseURL from '../../API/baseURL';

const Offers = ({ offer }) => {
  const [taskerName, setTaskerName] = useState('');
  const userId = '6633dea3b11171618bf7f1da';

  useEffect(() => {
    (async () => {
      const response = await baseURL.get(`users/${userId}`);

      console.log(response);
      if (response.data) {
        setTaskerName(
          `${response.data?.data?.firstName} ${response.data?.data?.lastName}`
        );
      }
    })();
  }, []);

  const formatDateAndTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedTime = date
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .toLowerCase();
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <Box sx={{ marginTop: '1.5rem' }}>
      <Typography className={styles.title}>Offers</Typography>
      <Card style={{ marginBottom: '1rem' }}>
        <CardContent>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <Avatar sx={{ backgroundColor: '#272727' }}>
                {taskerName[0]}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {taskerName}
              </Typography>
              <Typography
                color='textSecondary'
                gutterBottom
                sx={{ fontSize: 'small', margin: '0.5rem 0' }}
              >
                {formatDateAndTime(offer.createdAt)}
              </Typography>
              <Typography variant='body3'>{offer.message}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Offers;
