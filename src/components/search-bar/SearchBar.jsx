import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  InputBase,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import styles from './searchBar.module.css';
import Assurance from '../assurance/Assurance';
import generate from '../../utils/gemini';
import { useSelector } from 'react-redux';

const exampleUrl =
  'http://localhost:3000/post-task?title=&category=&location=&details=&budget=';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const categories = useSelector((state) => state.categories.categoriesList);
  const allCategories = categories?.map((c) => c.name)?.join(',');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePrompt = async () => {
    setLoading(true);
    setError(false);

    try {
      const promptText = `
    Given the input text: "${inputValue}", construct a suitable URL based on the following template:
    ${exampleUrl}
    
    For the parameters:
    - "title": Generate a catchy and relevant title.
    - "details": Generate a relevant and engaging description.
    - "budget": Suggest a reasonable budget (as an integer).
    - "category": Choose one from the following options: ${allCategories} , if nothing is suitable choose "Other".
    - "location": Choose the most compatible "in-person" or "online".

    The output should be a complete URL with properly filled parameters. 
    Only reply with the final URL.
    `;
      const url = await generate(promptText);
      if (url) {
        window.location = url;
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position='static' className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Box className={styles.sloganContainer}>
            <Typography variant='h3' className={styles.slogan}>
              Hello! this is your ai assistant
            </Typography>
            <Typography variant='h6' className={styles.greeting}>
              How can I help you today?
            </Typography>
          </Box>
        </Toolbar>
        <Paper component='form' className={styles.searchContainer}>
          <InputBase
            className={styles.inputBase}
            placeholder='In a few words, what do you need done?'
            inputProps={{ 'aria-label': 'What do you need done?' }}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            variant='contained'
            className={styles.button}
            onClick={handlePrompt}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Get Offers'
            )}
          </Button>
        </Paper>
        {error && (
          <Typography variant='body2' color='error'>
            Please try again
          </Typography>
        )}
      </AppBar>
      <Assurance />
    </>
  );
};

export default SearchBar;
