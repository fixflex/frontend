import React, { useEffect, useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  TextField,
  FormControlLabel,
  Button,
  RadioGroup,
  FormControl,
  Radio,
  Divider,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material';
import styles from './postTask.module.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Laptop, LocationOn, Place } from '@mui/icons-material';
import { egyptGovernorates } from '../../utils/gov';
import baseURL from '../../API/baseURL';
import { addTask } from '../browse/allTasksSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImageUploader from '../../components/image-uploader/ImageUploader';

function TabPanel(props) {
  const { children, value, title, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Typography variant='h6' sx={{ mt: 1 }} className={styles.topTitle}>
        {title}
      </Typography>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function PostTask() {
  const [value, setValue] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFlexibleDate, setIsFlexibleDate] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [city, setCity] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [budget, setBudget] = useState(null);
  const [category, setCategory] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = useSelector((state) => state.categories.categoriesList);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (searchParams.get('title')) {
      setTaskTitle(searchParams.get('title'));
    }
    if (searchParams.get('category')) {
      const categoryItem = categories.find(
        (c) => c.name === searchParams.get('category')
      );
      console.log('categoryItem', categoryItem);
      setCategory(categoryItem?.id);
    }
    if (searchParams.get('location')) {
      setLocationType(searchParams.get('location'));
    }
    if (locationType === 'in-person') {
      getUserLocation();
    }
    if (searchParams.get('details')) {
      setTaskDetails(searchParams.get('details'));
    }
    if (searchParams.get('budget')) {
      setBudget(Number(searchParams.get('budget')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const handleLocationChange = (event) => {
    setLocationType(event.target.value);
  };

  const handleFlexibleDate = () => {
    const newFlexibility = !isFlexibleDate;
    setIsFlexibleDate(newFlexibility);

    if (newFlexibility) {
      setSelectedDate(null);
    }
  };

  const handleDateChange = (newValue) => {
    if (newValue) {
      setIsFlexibleDate(false);
    }
    setSelectedDate(newValue);
  };

  const totalSteps = 4;

  const handleNext = () => {
    if (value < totalSteps - 1) {
      setValue(value + 1);
    }
  };

  const handleBack = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const isStepComplete = () => {
    switch (value) {
      case 0:
        return (
          taskTitle.trim() !== '' && (selectedDate !== null || isFlexibleDate)
        );
      case 1:
        return (
          locationType !== '' &&
          (locationType !== 'in-person' || city.trim() !== '')
        );
      case 2:
        return taskDetails.trim() !== '';
      case 3:
        return budget > 0 && budget <= 9999;
      default:
        return false;
    }
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting the location: ', error);
          alert(
            'Error getting the location. Please allow access to your location.'
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let dueDate;
    if (isFlexibleDate) {
      dueDate = {
        flexible: isFlexibleDate,
      };
    } else {
      dueDate = {
        on: selectedDate.format('YYYY-MM-DD'),
      };
    }

    let location;
    if (locationType === 'online') {
      location = {
        coordinates: [0, 0],
        online: 'true',
      };
    } else if (locationType === 'in-person') {
      location = {
        coordinates: [userLocation.lng, userLocation.lat],
      };
    } else {
      location = { coordinates: [0, 0] };
    }

    const userData = {
      title: taskTitle,
      categoryId: category,
      details: taskDetails,
      location,
      dueDate,
      budget: budget,
      city: city,
    };

    console.log(userData);

    try {
      const response = await baseURL.post('/tasks', userData);
      console.log('Task created successfully:', response.data);
      dispatch(addTask(response.data.data));
      if (selectedImage) {
        await uploadImage(response.data?.data?._id, selectedImage);
        setIsLoading(false);
      }
      navigate('/my-tasks');
    } catch (error) {
      console.error('Error posting task:', error);
    }
  };

  const uploadImage = async (taskId, file) => {
    const formData = new FormData();
    formData.append('image', file);
    // You can append more files if needed using formData.append('image', file);

    try {
      const response = await baseURL.patch(`tasks/${taskId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        height: 'auto',
        bgcolor: 'background.paper',
      }}
      className={styles.tabContainer}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        aria-label='Vertical tabs'
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className={styles.tabTitle}
      >
        <Tab
          label='Title & Date'
          {...a11yProps(0)}
          className={styles.tabButton}
        />
        <Tab label='Location' {...a11yProps(1)} className={styles.tabButton} />
        <Tab label='Details' {...a11yProps(2)} className={styles.tabButton} />
        <Tab label='Budget' {...a11yProps(3)} className={styles.tabButton} />
      </Tabs>
      <Box sx={{ width: '60%' }} className={styles.formContentBox}>
        <TabPanel
          value={value}
          index={0}
          className={styles.titleTab}
          title="What's your task?"
        >
          <Typography variant='h6' className={styles.tabTitle}>
            In a few words, what do you need done?{' '}
          </Typography>
          <TextField
            fullWidth
            label='Eg: I need to move my sofa'
            variant='outlined'
            margin='normal'
            className={styles.taskTitle}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <Typography
            variant='h6'
            sx={{ marginTop: '1rem ' }}
            className={styles.tabTitle}
          >
            Pick a category for your task{' '}
          </Typography>

          <FormControl fullWidth margin='normal' sx={{ marginBottom: '1rem ' }}>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              className={styles.categorySelect}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem disabled value=''>
                <em>Select a category</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography
              variant='h6'
              sx={{ mt: 1 }}
              className={styles.timeTitle}
            >
              When do you need this done?
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin: '2rem 0',
              }}
              className={styles.timeBox}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Select date'
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Divider
                orientation='vertical'
                flexItem
                textAlign='center'
                sx={{ fontSize: '0.8rem', margin: '0 1rem' }}
              >
                OR
              </Divider>
              <Button
                variant='outlined'
                className={styles.flexButton}
                onClick={handleFlexibleDate}
                sx={{
                  backgroundColor: isFlexibleDate ? '#E5BD31' : '#f0f0f0',
                  borderColor: isFlexibleDate ? '#E5BD31' : '#f0f0f0',
                  fontWeight: isFlexibleDate ? 'bold' : 'normal',
                  color: isFlexibleDate ? 'white' : 'black',
                }}
              >
                I'm flexible
              </Button>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1} title='Where should it be done?'>
          <Typography variant='h6' className={styles.tabTitle}>
            Tell us where
          </Typography>
          <FormControl component='fieldset' sx={{ margin: '1rem' }}>
            <RadioGroup
              row
              value={locationType}
              onChange={handleLocationChange}
            >
              <FormControlLabel
                value='in-person'
                label={
                  <Box
                    component='div'
                    className={`${styles.optionCard} ${
                      locationType === 'in-person' ? styles.selected : ''
                    }`}
                  >
                    <LocationOn />
                    <Typography variant='body1'>In-person</Typography>
                    <Typography>I need the Flexer physically there</Typography>
                  </Box>
                }
                control={<Radio className={styles.hiddenRadio} />}
                className={styles.formControlLabel}
              />
              <FormControlLabel
                value='online'
                label={
                  <Box
                    component='div'
                    className={`${styles.optionCard} ${
                      locationType === 'online' ? styles.selected : ''
                    }`}
                  >
                    <Laptop />
                    <Typography variant='body1'>Online</Typography>
                    <Typography>The Flexer can do my task from home</Typography>
                  </Box>
                }
                control={<Radio className={styles.hiddenRadio} />}
                className={styles.formControlLabel}
              />
            </RadioGroup>
            {locationType === 'in-person' && (
              <FormControl fullWidth>
                <Select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  displayEmpty
                  variant='outlined'
                  className={styles.zipCodeInput}
                  startAdornment={
                    <InputAdornment position='start'>
                      <Place />
                    </InputAdornment>
                  }
                >
                  <MenuItem disabled value=''>
                    <em>Select Governorate</em>
                  </MenuItem>
                  {egyptGovernorates.map((governorate) => (
                    <MenuItem key={governorate} value={governorate}>
                      {governorate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </FormControl>
        </TabPanel>

        <TabPanel
          value={value}
          index={2}
          title='Provide more details
'
        >
          <Typography variant='h6' className={styles.tabTitle}>
            What are the details?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label='Write a summary of the key details'
            variant='outlined'
            margin='normal'
            inputProps={{ minLength: 12 }}
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
          />

          <Typography
            variant='h6'
            className={styles.tabTitle}
            sx={{ margin: '1rem 0' }}
          >
            Would you like to provide a picture?
          </Typography>

          <ImageUploader onImageSelect={setSelectedImage} />
        </TabPanel>
        <TabPanel value={value} index={3} title='Set your budget'>
          <Typography variant='h6' className={styles.tabTitle}>
            Suggest your budget
          </Typography>
          <TextField
            fullWidth
            label='What is your budget?'
            variant='outlined'
            type='number'
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            margin='normal'
            InputProps={{
              startAdornment: <Typography variant='h6'>$</Typography>,
            }}
          />
        </TabPanel>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color='inherit'
            disabled={value === 0}
            onClick={handleBack}
            sx={{
              mr: 1,
              backgroundColor: value ? '#3FA1CE' : '',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              color: 'white',
            }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            variant='contained'
            onClick={() => {
              if (value === totalSteps - 1) {
                handleSubmit();
              } else {
                handleNext();
              }
            }}
            disabled={!isStepComplete()}
            sx={{
              mr: 1,
              backgroundColor: '#080826',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
            }}
          >
            {value === totalSteps - 1 ? 'Finish' : 'Next'}
          </Button>
          {isLoading && `Posting Task ..`}
        </Box>
      </Box>
    </Box>
  );
}
