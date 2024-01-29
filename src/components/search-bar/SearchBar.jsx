// SearchBar.js
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  InputBase,
  Button,
  Chip,
  Box,
} from '@mui/material';
import styles from './searchBar.module.css';
import Assurance from '../assurance/Assurance';

const SearchBar = () => {
  return (
    <>
      <AppBar position='static' className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Box className={styles.sloganContainer}>
            <Typography variant='h3' className={styles.slogan}>
              Where Flexers Fix It All!
            </Typography>
            <Typography variant='h6' className={styles.greeting}>
              Post a task we're here to help!
            </Typography>
          </Box>
        </Toolbar>
        <Paper component='form' className={styles.searchContainer}>
          <InputBase
            className={styles.inputBase}
            placeholder='In a few words, what do you need done?'
            inputProps={{ 'aria-label': 'What do you need done?' }}
          />
          <Button variant='contained' href='/browse' className={styles.button}>
            Get Offers
          </Button>
        </Paper>
      </AppBar>
      <Assurance />
    </>
  );
};

export default SearchBar;
