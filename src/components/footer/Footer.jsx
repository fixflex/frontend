// Footer.js
import React from 'react';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <Box className={styles.footerContainer}>
      <Box className={styles.preFooter}>
        <Typography variant='h6' className={styles.preFooterHeading}>
          The best Handymen for your home at Fix Flex
        </Typography>
      </Box>
      <Grid container spacing={2} className={styles.footer}>
        <Grid item xs={12} sm={3}>
          <Typography variant='h6'>About</Typography>
          <ul className={styles.footerList}>
            <li>Careers</li>
            <li>Press & News</li>
            <li>Partnerships</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Investor Relations</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant='h6'>Categories</Typography>
          <ul className={styles.footerList}>
            <li>Graphics & Design</li>
            <li>Digital Marketing</li>
            <li>Writing & Translation</li>
            <li>Video & Animation</li>
            <li>Music & Audio</li>
            <li>Programming & Tech</li>
            <li>Data</li>
            <li>Business</li>
            <li>Lifestyle</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant='h6'>Support</Typography>
          <ul className={styles.footerList}>
            <li>Help & Support</li>
            <li>Trust & Safety</li>
            <li>Selling on Fix Flex</li>
            <li>Buying on Fix Flex</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant='h6'>Subscribe</Typography>
          <form className={styles.subscribeForm}>
            <TextField
              variant='outlined'
              placeholder='Your email address'
              className={styles.subscribeInput}
            />
            <Button variant='contained' className={styles.subscribeButton}>
              Send
            </Button>
          </form>
          <Typography variant='h6' style={{ marginTop: '2rem' }}>
            Apps
          </Typography>
          <ul className={styles.footerList}>
            <li>iOS App</li>
            <li>Android App</li>
          </ul>
        </Grid>
      </Grid>
      <Box className={styles.bottomBar}>
        <Typography variant='body2' className={styles.copyRightText}>
          © Fix Flex 2024. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
