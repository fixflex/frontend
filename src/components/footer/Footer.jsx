import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import styles from './footer.module.css'; // Importing the CSS module

const Footer = () => {
  return (
    <Box className={styles.footerContainer}>
      {/* Pre-Footer */}
      <Box className={styles.preFooter}>
        <Container maxWidth='lg'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant='h6' color='textPrimary' gutterBottom>
                Section 1
              </Typography>
              {/* Add content for this section */}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant='h6' color='textPrimary' gutterBottom>
                Section 2
              </Typography>
              {/* Add content for this section */}
            </Grid>
            {/* Repeat for more sections if needed */}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box className={styles.footer}>
        <Container maxWidth='lg'>
          <Typography variant='subtitle1' color='textSecondary' align='center'>
            © {new Date().getFullYear()} Your Brand. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
