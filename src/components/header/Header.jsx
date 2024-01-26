import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import styles from './header.module.css';
import headerImage1 from '../../images/header1.png';
import headerImage2 from '../../images/header2.png';

function Header() {
  return (
    <Box className={styles.headerContainer} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} className={styles.headerTextContainer}>
          <Typography
            variant='h3'
            component='h1'
            gutterBottom
            className={styles.headerTitle}
          >
            Hire the best handymen for any job with{' '}
            <span className={styles.animateText}>Fix Flex!</span>
          </Typography>
          <Typography
            variant='subtitle1'
            gutterBottom
            className={styles.headerSubtitle}
          >
            Work with talented people at the most affordable price to get the
            most out of your time and cost.
          </Typography>
          <Box className={styles.statsContainer} sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={4} className={styles.statsItem}>
                <Typography
                  variant='h5'
                  component='h2'
                  className={styles.statsNumber}
                >
                  834M
                </Typography>
                <Typography variant='subtitle1' className={styles.statsText}>
                  Total Freelancer
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} className={styles.statsItem}>
                <Typography
                  variant='h5'
                  component='h2'
                  className={styles.statsNumber}
                >
                  732M
                </Typography>
                <Typography variant='subtitle1' className={styles.statsText}>
                  Positive Review
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} className={styles.statsItem}>
                <Typography
                  variant='h5'
                  component='h2'
                  className={styles.statsNumber}
                >
                  236M
                </Typography>
                <Typography variant='subtitle1' className={styles.statsText}>
                  Projects Completed
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          container
          spacing={1}
          className={styles.headerImagesContainer}
        >
          <Grid item xs={6} className={styles.headerImageWrapper}>
            <img
              src={headerImage2}
              alt='First'
              className={styles.headerImage}
              style={{
                height: '40vh',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
          </Grid>
          <Grid item xs={6} className={styles.headerImageWrapper}>
            <img
              src={headerImage1}
              alt='Second'
              className={styles.headerImage}
              style={{
                height: '50vh',
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Header;
