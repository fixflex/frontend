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
    name: 'Alice W.',
    status: 'New!',
    availability: 'Tomorrow',
    description: 'Experienced and detail-oriented professional',
  },
  {
    name: 'John D.',
    status: 'New!',
    availability: 'Next week',
    description: 'Highly motivated and eager to start',
  },
  {
    name: 'Eleanor P.',
    status: 'New!',
    availability: 'On-site',
    description: 'Skilled in on-site project management and coordination',
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
