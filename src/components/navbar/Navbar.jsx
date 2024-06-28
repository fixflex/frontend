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
            {isLoggedIn && (
              <>
                <ListItem>
                  <Link to='/assistant' className={styles.navButton}>
                    Assistant
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to='/browse' className={styles.navButton}>
                    Browse
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to='/account' className={styles.navButton}>
                    Profile
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to='/post-task' className={styles.navButton}>
                    Post
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to='/my-tasks' className={styles.navButton}>
                    Tasks
                  </Link>
                </ListItem>

                <ListItem>
                  <Link to='/chat' className={styles.navButton}>
                    Chat
                  </Link>
                </ListItem>
              </>
            )}

            {isTasker && (
              <ListItem>
                <Link to='/offers-page' className={styles.navButton}>
                  Offers
                </Link>
              </ListItem>
            )}
          </List>
        </Grid>
        {isLoggedIn ? (
          <Logout />
        ) : (
          <Grid item className={styles.rightNav}>
            <Link
              to='/signup'
              className={`${styles.rightNavButtons} ${styles.navButton}`}
            >
              Join
            </Link>
            <Link
              to='/login'
              className={`${styles.rightNavButtons} ${styles.navButton}`}
            >
              Login
            </Link>
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
              <Link to={item.link} className={styles.drawerText}>
                {item.icon}
                {item.text}
              </Link>
            </ListItem>
          ))}
          {isLoggedIn ? (
            <Logout />
          ) : (
            <Grid item className={styles.rightNav}>
              <Link
                to='/signup'
                className={`${styles.rightNavButtons} ${styles.navButton}`}
              >
                Join
              </Link>
              <Link
                to='/login'
                className={`${styles.rightNavButtons} ${styles.navButton}`}
              >
                Login
              </Link>
            </Grid>
          )}
        </List>
      </Drawer>
    </Box>
  );

  return isMobile ? renderMobileNavbar() : renderRegularNavbar();
};

export default Navbar;
