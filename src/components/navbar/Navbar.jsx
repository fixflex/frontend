import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  Box,
  Avatar,
  List,
  ListItem,
  Button,
  Drawer,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './navbar.module.css';
import logo from '../../images/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const renderLandingPageNavbar = () => (
    <Box className={styles.navContainer}>
      <Grid container alignItems='center'>
        <Grid item>
          <Avatar
            src={logo}
            variant='rounded'
            sx={{ width: 180, height: 70 }}
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

  const renderOtherPagesNavbar = () => (
    <Box className={styles.otherPageNavbar}>
      <Avatar src={logo} variant='rounded' className={styles.logoSmall} />
      <IconButton
        onClick={toggleDrawer(true)}
        edge='end'
        className={styles.drawerButton}
        aria-label='menu'
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
        <List className={styles.drawerList}>
          {['Lorem', 'Ipsum', 'Dolor', 'Login'].map((text) => (
            <ListItem button key={text}>
              <Button>{text}</Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );

  return location.pathname === '/'
    ? renderLandingPageNavbar()
    : renderOtherPagesNavbar();
};

export default Navbar;
