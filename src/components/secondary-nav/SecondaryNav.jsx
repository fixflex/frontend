import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import styles from './secondaryNav.module.css';
import { FilterAlt, Close } from '@mui/icons-material';

const SecondaryNav = ({
  setTitleFilter,
  setCategoryFilter,
  setLocationFilter,
  setSortOption,
  titleFilter,
  categoryFilter,
  locationFilter,
  sortOption,
}) => {
  const categories = useSelector((state) => state.categories.categoriesList);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const renderContent = () => (
    <Box className={styles.filterOptionsContainer}>
      <FormControl className={styles.dropdown}>
        <InputLabel
          className={styles.dropTitle}
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
          className={styles.dropDownSelect}
          defaultValue=''
          sx={{
            borderRadius: '50px',
            '& fieldset': {
              borderColor: alpha('#ccc', 0),
            },
            '&:hover fieldset': {
              borderColor: '#3fa1ce40',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3fa1ce40',
            },
            backgroundColor: 'transparent',
          }}
          onChange={(e) => setCategoryFilter(e.target.value)}
          value={categoryFilter}
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
          className={styles.dropTitle}
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
          className={styles.dropDownSelect}
          defaultValue=''
          sx={{
            borderRadius: '50px',
            '& fieldset': {
              borderColor: alpha('#ccc', 0),
            },
            '&:hover fieldset': {
              borderColor: '#3fa1ce40',
            },
            backgroundColor: 'transparent',
          }}
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <MenuItem value='online'>Online</MenuItem>
          <MenuItem value='inPerson'>In Person</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={styles.dropdown} sx={{ marginRight: '2rem' }}>
        <InputLabel
          className={styles.dropTitle}
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
          className={styles.dropDownSelect}
          defaultValue=''
          sx={{
            borderRadius: '50px',
            '& fieldset': {
              borderColor: alpha('#ccc', 0),
            },
            '&:hover fieldset': {
              borderColor: '#3fa1ce40',
            },
            backgroundColor: 'transparent',
          }}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
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
          backgroundColor: isMobile ? '#CC282F' : '#212121',
        }}
        onClick={() => {
          setCategoryFilter('');
          setTitleFilter('');
          setLocationFilter('');
          setSortOption('');
          handleDrawerClose();
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );

  return (
    <div className={styles.container}>
      <TextField
        variant='outlined'
        placeholder='Search for a task'
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
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
      {isMobile ? (
        <>
          <IconButton
            onClick={handleDrawerOpen}
            sx={{
              fontSize: '1rem',
              color: '#272727',
              borderRadius: 'none',
              fontWeight: 'bold',
            }}
          >
            Filter
            <FilterAlt fontSize='small' sx={{ color: '#272727' }} />
          </IconButton>
          <Drawer anchor='left' open={drawerOpen}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '1.5rem 0.5rem',
              }}
            >
              <Button
                variant='contained'
                sx={{
                  color: 'white',
                  borderRadius: '10px',
                  backgroundColor: '#212121',
                }}
                onClick={handleDrawerClose}
              >
                Apply
              </Button>
              <IconButton
                onClick={handleDrawerClose}
                sx={{ alignSelf: 'flex-end', padding: '0.5rem' }}
              >
                <Close sx={{ color: '#212121' }} />
              </IconButton>
            </Box>

            <Box sx={{ width: 250 }} role='presentation'>
              {renderContent()}
            </Box>
          </Drawer>
        </>
      ) : (
        <div className={styles.container}>{renderContent()}</div>
      )}
    </div>
  );
};

export default SecondaryNav;
