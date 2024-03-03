import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import styles from './offers.module.css';

const offers = [
  {
    name: 'Franco L.',
    status: 'New!',
    availability: 'Today',
    description: 'Reliable, reliable and great at following instructions',
  },
  {
    name: 'Jamard K.',
    status: 'New!',
    availability: 'ASAP',
    description: "I'm ready and available ASAP",
  },
  {
    name: 'Amazing H.',
    status: 'New!',
    availability: 'Remote Work',
    description:
      'I bring to the table a proven history of success in remote work, showcasing a combination of self-discipline, autonomous productivity, and effective communication. My ability to consistently meet and exceed expectations remotely',
  },
];

const Offers = () => {
  return (
    <Box sx={{ marginTop: '1.5rem' }}>
      <Typography className={styles.title}>Offers</Typography>

      {offers.map((offer, index) => (
        <Card key={index} style={{ marginBottom: '1rem' }}>
          <CardContent>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <Avatar>{offer.name[0]}</Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant='h6'>{offer.name}</Typography>
                <Typography color='textSecondary' gutterBottom>
                  {offer.status}
                </Typography>
                <Typography variant='body2'>{offer.description}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Offers;
