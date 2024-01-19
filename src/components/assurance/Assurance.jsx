import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpIcon from '@mui/icons-material/Help';
import styles from './assurance.module.css';

const serviceData = [
  {
    icon: <ComputerIcon className={styles.icon} />,
    title: 'Post a job',
    description:
      "It's free and easy to post a job. Simply fill in a title, description.",
  },
  {
    icon: <GroupIcon className={styles.icon} />,
    title: 'Choose freelancers',
    description:
      "It's free and easy to post a job. Simply fill in a title, description.",
  },
  {
    icon: <PaymentIcon className={styles.icon} />,
    title: 'Pay safely',
    description:
      "It's free and easy to post a job. Simply fill in a title, description.",
  },
  {
    icon: <HelpIcon className={styles.icon} />,
    title: "We're here to help",
    description:
      "It's free and easy to post a job. Simply fill in a title, description.",
  },
];

const Assurance = () => {
  return (
    <Box className={styles.container} sx={{ flexGrow: 1 }}>
      <Typography
        variant='h4'
        component='h2'
        gutterBottom
        style={{ textAlign: 'left' }}
      >
        Need something done?
      </Typography>
      <Typography
        variant='h6'
        gutterBottom
        style={{ textAlign: 'left', color: 'gray', marginBottom: '2rem' }}
      >
        Most viewed and all-time top-selling services
      </Typography>
      <Grid container spacing={4} justifyContent='center'>
        {serviceData.map((service, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={3}
            style={{
              textAlign: 'left',
              animation: 'fadeIn 0.5s',
              animationDelay: `${0.1 * index}s`,
              animationFillMode: 'both',
            }}
          >
            <Paper
              elevation={0}
              style={{ padding: 16 }}
              className={styles.innerBox}
            >
              {service.icon}
              <Typography variant='h6' component='h3' style={{ marginTop: 16 }}>
                {service.title}
              </Typography>
              <Typography style={{ color: 'gray' }}>
                {service.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Assurance;
