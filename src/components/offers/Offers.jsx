import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Box,
} from '@mui/material';

const Offers = ({ offer }) => {
  const [taskerName, setTaskerName] = useState('');

  useEffect(() => {
    if (offer?.taskerId?.userId) {
      const userData = offer.taskerId.userId;
      setTaskerName(`${userData.firstName} ${userData.lastName}`);
    }
  }, [offer.taskerId.userId]);

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
