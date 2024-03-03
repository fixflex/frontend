import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  InputBase,
  Button,
  Box,
} from '@mui/material';
import styles from './searchBar.module.css';
import Assurance from '../assurance/Assurance';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

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
        </Toolbar>{' '}
        <Paper component='form' className={styles.searchContainer}>
          <InputBase
            className={styles.inputBase}
            placeholder='In a few words, what do you need done?'
            inputProps={{ 'aria-label': 'What do you need done?' }}
            value={inputValue} // Bind input value to state
            onChange={handleInputChange} // Update state on change
          />
          <Button
            variant='contained'
            href={`/post-task/${encodeURIComponent(inputValue)}`} // Dynamically create href
            className={styles.button}
          >
            Get Offers
          </Button>
        </Paper>
      </AppBar>
      <Assurance />
    </>
  );
};

export default SearchBar;
