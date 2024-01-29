import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Grid,
  Box,
  Avatar,
  List,
  ListItem,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './navbar.module.css';
import logo from '../../images/logo.png';

const Navbar = ({ isLoggedIn }) => {
  // Assuming isLoggedIn is a prop that indicates user login status
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const renderRegularNavbar = () => (
    <Box className={styles.navContainer}>
      <Grid
        container
        alignItems='center'
        sx={{
          display: 'flex',
          justifyContent: isLoggedIn ? 'space-evenly' : 'space-between',
        }}
      >
        <Grid item>
          <Link to='/'>
            <Avatar
              src={logo}
              variant='rounded'
              sx={{ width: 180, height: 70, cursor: 'pointer' }}
            />
          </Link>
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
        {!isLoggedIn && (
          <Grid item className={styles.rightNav}>
            <Button
              variant='contained'
              className={styles.rightNavButtons}
              href='/signup'
            >
              Join
            </Button>
            <Button
              variant='contained'
              className={styles.rightNavButtons}
              href='/login'
            >
              Login
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );

  const renderMobileNavbar = () => (
    <Box className={styles.otherPageNavbar}>
      <Link to='/'>
        <Avatar src={logo} variant='rounded' className={styles.logoSmall} />
      </Link>
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

  return isMobile ? renderMobileNavbar() : renderRegularNavbar();
};

export default Navbar;
