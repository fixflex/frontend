import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import styles from './taskerUpdate.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../API/baseURL';
import { setTaskerInfo } from '../tasker-onboarding/taskerInfoSlice';

const TaskerAccountUpdate = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    id: '',
    name: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories?.categoriesList);
  const isTasker = useSelector((state) => state.taskerInfo.isTasker);

  console.log(selectedCategory);

  useEffect(() => {
    if (!isTasker) {
      navigate('/browse');
    }
  }, [isTasker, navigate]);

  const handleCategoryChange = (e) => {
    const selected = categories.find(
      (category) => category.id === e.target.value
    );
    setSelectedCategory({ id: selected.id, name: selected.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      categories: [selectedCategory.id],
    };
    try {
      await baseURL.patch('/taskers/me', requestData);
      dispatch(
        setTaskerInfo({
          specialtyId: selectedCategory.id,
          isTasker: true,
        })
      );
      setSuccessMessage('Category Updated successfully');

      navigate('/browse');
    } catch (error) {
      console.error('Error sending request:', error);
      setErrorMessage('Failed to submit. Please try again.');
    }
  };

  return (
    <div className={styles.centerContainer}>
      <Box component='form' className={styles.form}>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 'bold',
            margin: '1rem 0',
            textAlign: 'center',
            fontSize: '1.7rem',
          }}
        >
          Here's where you can update your category
        </Typography>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='service-label'>
              What services do you provide?
            </InputLabel>
            <Select
              labelId='category-label'
              id='category'
              value={selectedCategory.id}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {errorMessage && (
          <Typography sx={{ color: 'red', textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography sx={{ color: 'green', textAlign: 'center' }}>
            {successMessage}
          </Typography>
        )}
        <Button
          variant='contained'
          sx={{
            color: 'white',
            borderRadius: '10px',
            backgroundColor: '#212121',
            '&:hover': {
              backgroundColor: '#F2CC41',
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default TaskerAccountUpdate;
