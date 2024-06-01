import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './navbar.module.css';
import logo from '../../images/logo.png';
import Logout from '../logout/Logout';
import { Home, Person, PostAdd, Search, SmartToy } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Offers from '../offers/Offers';

const Navbar = ({ isLoggedIn }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isTasker = useSelector((state) => state.taskerInfo?.isTasker);

  const isMobile = useMediaQuery('(max-width:1075px)');

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
          justifyContent: 'space-between',
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
              <Button className={styles.navButton} href='/assistant'>
                Assistant
              </Button>
            </ListItem>
            <ListItem>
              <Button className={styles.navButton} href='/browse'>
                Browse
              </Button>
            </ListItem>
            <ListItem>
              <Button className={styles.navButton} href='/account'>
                Profile
              </Button>
            </ListItem>
            <ListItem>
              <Button className={styles.navButton} href='/post-task'>
                Post
              </Button>
            </ListItem>
            <ListItem>
              <Button className={styles.navButton} href='/my-tasks'>
                Tasks
              </Button>
            </ListItem>
            <ListItem>
              <Button className={styles.navButton} href='/chat'>
                Chat
              </Button>
            </ListItem>
            {isTasker && (
              <ListItem>
                <Button className={styles.navButton} href='/offers-page'>
                  Offers
                </Button>
              </ListItem>
            )}
          </List>
        </Grid>
        {isLoggedIn ? (
          <Logout />
        ) : (
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
          {[
            { text: 'Assistant', icon: <SmartToy />, link: '/assistant' },
            { text: 'Browse', icon: <Search />, link: '/browse' },
            { text: 'Post', icon: <PostAdd />, link: '/post-task' },
            { text: 'Profile', icon: <Person />, link: '/account' },
            { text: 'Home', icon: <Home />, link: '/' },
            ...(isTasker
              ? [{ text: 'Offers', icon: <Offers />, link: '/offers-page' }]
              : []),
          ].map((item) => (
            <ListItem button key={item.text}>
              <Button
                startIcon={item.icon}
                className={styles.drawerText}
                href={item.link}
              >
                {item.text}
              </Button>
            </ListItem>
          ))}
          {isTasker && (
            <ListItem>
              <Button className={styles.navButton} href='/offers-page'>
                Offers
              </Button>
            </ListItem>
          )}
          {isLoggedIn ? (
            <Logout />
          ) : (
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
        </List>
      </Drawer>
    </Box>
  );

  return isMobile ? renderMobileNavbar() : renderRegularNavbar();
};

export default Navbar;
