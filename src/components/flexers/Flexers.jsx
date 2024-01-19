import React from 'react';
import { Box, Typography, Grid, Avatar, Divider } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SecurityIcon from '@mui/icons-material/Security';
import styles from './flexers.module.css';
import handyman from '../../images/handyman0.png';
import handyman1 from '../../images/handyman1.png';
import handyman2 from '../../images/handyman2.png';
import handyman3 from '../../images/handyman3.png';

const featureData = [
  {
    icon: <VerifiedUserIcon className={styles.icon} />,
    title: 'Proof of quality',
    description:
      'Check any pro’s work samples, client reviews, and identity verification.',
  },
  {
    icon: <AttachMoneyIcon className={styles.icon} />,
    title: 'No cost until you hire',
    description:
      'Interview potential fits for your job, negotiate rates, and only pay for work you approve.',
  },
  {
    icon: <SecurityIcon className={styles.icon} />,
    title: 'Safe and secure',
    description:
      'Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it.',
  },
];

const userImages = [handyman, handyman3, handyman2, handyman1];

const Flexers = () => {
  return (
    <Box className={styles.flexersContainer}>
      <Typography variant='h5' component='h2' className={styles.flexersTitle}>
        A whole world of freelance talent at your fingertips
      </Typography>
      <Typography variant='h6' className={styles.flexersSubtitle}>
        Most viewed and all-time top-selling services
      </Typography>
      <Divider
        sx={{ width: '70%', backgroundColor: '#EFC634', marginBottom: '3rem' }}
      />
      <Box className={styles.contentContainer}>
        <Grid
          container
          className={styles.flexersFeatures}
          sx={{ width: '50%' }}
        >
          {featureData.map((feature, index) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%',
              }}
              key={index}
            >
              {feature.icon}
              <Grid
                item
                xs={10}
                sx={{ width: '100%' }}
                className={styles.flexersFeatureItem}
              >
                <Typography
                  variant='h6'
                  component='h3'
                  style={{ marginTop: '1em' }}
                  className={styles.listTitle}
                >
                  {feature.title}
                </Typography>
                <Typography className={styles.listSubtitle}>
                  {feature.description}
                </Typography>
              </Grid>
            </Box>
          ))}
        </Grid>
        <Box className={styles.avatarGridContainer}>
          {userImages.map((image, index) => (
            <Box key={index} className={styles.avatarTile}>
              <Avatar alt='User' src={image} className={styles.avatar} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Flexers;
