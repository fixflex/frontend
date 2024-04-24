import React from 'react';
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import styles from './secondaryNav.module.css';
import { useSelector } from 'react-redux';

const SecondaryNav = ({
  setTitleFilter,
  setCategoryFilter,
  setLocationFilter,
  setSortOption,
}) => {
  const categories = useSelector((state) => state.categories.categoriesList);

  const handleFilterInput = (e) => {
    setTitleFilter(e.target.value);
  };

  const handleCategoryInput = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleLocationInput = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleSortOptions = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className={styles.container}>
      <TextField
        variant='outlined'
        onChange={handleFilterInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            borderRadius: '50px',
            '& fieldset': {
              borderColor: alpha('#ccc', 0.5),
            },
            '&:hover fieldset': {
              borderColor: '#161C1E',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
            backgroundColor: 'white',
          },
        }}
        sx={{
          width: '200px',
          '& .MuiInputBase-input': {
            color: '#6c757d',
          },
        }}
      />
      <FormControl className={styles.dropdown}>
        <InputLabel
          sx={{
            color: '#212121',
            fontWeight: 'bold',
            '&.Mui-focused': {
              color: '#212121',
            },
          }}
        >
          Categories
        </InputLabel>
        <Select
          defaultValue=''
          sx={{
            borderRadius: '50px',
            '& fieldset': {
              borderColor: alpha('#ccc', 0),
            },
            '&:hover fieldset': {
              borderColor: '#3fa1ce40',
              backgroundColor: '#3fa1ce40',
              color: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3fa1ce40',
            },
            backgroundColor: 'transparent',
            color: '#212121 !important',
          }}
          onChange={handleCategoryInput}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={styles.dropdown}>
        <InputLabel
          sx={{
            color: '#212121',
            fontWeight: 'bold',
            '&.Mui-focused': {
              color: '#212121',
            },
          }}
        >
          Location
        </InputLabel>
        <Select
          defaultValue=''
          sx={{
            borderRadius: '50px',
            '& fieldset': {
              borderColor: alpha('#ccc', 0),
            },
            '&:hover fieldset': {
              borderColor: '#3fa1ce40',
              backgroundColor: '#3fa1ce40',
              color: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3fa1ce40',
            },
            backgroundColor: 'transparent',
            color: '#212121 !important',
          }}
          onChange={handleLocationInput}
        >
          <MenuItem value='online'>Online</MenuItem>
          <MenuItem value='inPerson'>In Person</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={styles.dropdown}>
        <InputLabel
          sx={{
            color: '#212121',
            fontWeight: 'bold',
            '&.Mui-focused': {
              color: '#212121',
            },
          }}
        >
          Sort
        </InputLabel>
        <Select
          defaultValue=''
          sx={{
            borderRadius: '50px',
            '& fieldset': {
              borderColor: alpha('#ccc', 0),
            },
            '&:hover fieldset': {
              borderColor: '#3fa1ce40',
              backgroundColor: '#3fa1ce40',
              color: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3fa1ce40',
            },
            backgroundColor: 'transparent',
            color: '#212121 !important',
          }}
          onChange={handleSortOptions}
        >
          <MenuItem value='priceLowHigh'>Price Low to High</MenuItem>
          <MenuItem value='priceHighLow'>Price High to Low</MenuItem>
          <MenuItem value='newestOldest'>Newest to Oldest</MenuItem>
          <MenuItem value='oldestNewest'>Oldest to Newest</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant='contained'
        sx={{
          color: 'white',
          borderRadius: '10px',
          backgroundColor: '#212121',
        }}
        onClick={() => {
          setCategoryFilter('');
          setTitleFilter('');
          setLocationFilter('');
          setSortOption('');
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default SecondaryNav;
