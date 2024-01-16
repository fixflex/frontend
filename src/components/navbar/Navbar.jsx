import React from 'react';
import { Grid, Box, Avatar, List, ListItem, Button } from '@mui/material';
import styles from './navbar.module.css';
import logo from '../../images/logo.png';

const Navbar = () => {
  return (
    <Box className={styles.navContainer}>
      <Grid container alignItems='center'>
        <Grid item>
          <Avatar
            src={logo}
            variant='rounded'
            sx={{ width: 260, height: 70 }}
          />
        </Grid>
        <Grid item>
          <List className={styles.navList}>
            <ListItem>
              <Button className={styles.navButton}>Lorem</Button>
            </ListItem>
            <ListItem>
              <Button className={styles.navButton}>Dolor</Button>
            </ListItem>
            <ListItem>
              <Button className={styles.navButton}>Lorem</Button>
            </ListItem>
            <ListItem>
              <Button className={styles.navButton}>Ipsum</Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid item className={styles.rightNav}>
        <Button variant='contained' className={styles.rightNavButtons}>
          Join
        </Button>
        <Button variant='contained' className={styles.rightNavButtons}>
          Login
        </Button>
      </Grid>
    </Box>
  );
};

export default Navbar;
