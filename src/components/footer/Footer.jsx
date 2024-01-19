// Footer.js
import React from 'react';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <Box className={styles.footerContainer}>
      <Box className={styles.preFooter}>
        {/* Pre Footer Content */}
        <Typography variant='h6' className={styles.preFooterHeading}>
          Join our Fix Flex community.
        </Typography>
        <Typography variant='body2' className={styles.preFooterText}>
          Stay updated on the latest news and special offers.
        </Typography>
        <form className={styles.subscribeForm}>
          <TextField
            variant='outlined'
            placeholder='Your email address'
            className={styles.subscribeInput}
          />
          <Button variant='contained' className={styles.subscribeButton}>
            Subscribe
          </Button>
        </form>
      </Box>
      <Grid container className={styles.footer}>
        {/* Footer Links and Information */}
        {/* ... insert your footer links and information here similar to the provided image ... */}
      </Grid>
      <Box className={styles.bottomBar}>
        <Typography variant='body2' className={styles.copyRightText}>
          © Fix Flex 2024. All rights reserved.
        </Typography>
        {/* ... other bottom bar content like language selector ... */}
      </Box>
    </Box>
  );
};

export default Footer;
