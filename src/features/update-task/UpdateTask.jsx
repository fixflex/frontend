import React, { useEffect, useState } from 'react';
import styles from './updateTask.module.css';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import baseURL from '../../API/baseURL';
import { addAllTasks } from '../browse/allTasksSlice';

const UpdateTask = () => {
  const { id: taskId } = useParams();
  const categories = useSelector((state) => state.categories?.categoriesList);

  const [task, setTask] = useState({});
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting the location: ', error);
            reject(
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
        reject('Geolocation is not supported by this browser.');
      }
    });
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await baseURL.get(`/tasks/${taskId}`);

        console.log(response);
        setTask(response.data.data);
        setTitle(response.data.data.title);
        setDetails(response.data.data.details);
        setSelectedCategory(response.data.data.categoryId);
        setBudget(response.data.data.budget);
        setLocation(
          response.data.data.location?.online ? 'online' : 'inPerson'
        );
      } catch (error) {
        setErrorMessage('Task not found');
        console.error(error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {};
    if (title !== task.title) updatedFields.title = title;
    if (details !== task.details) updatedFields.details = details;
    if (selectedCategory !== task.categoryId)
      updatedFields.categoryId = selectedCategory;

    if (location !== (task.location.online ? 'online' : 'inPerson')) {
      if (location === 'online') {
        updatedFields.location = {
          coordinates: [0, 0],
          online: true,
          type: 'Point',
        };
      } else if (location === 'inPerson') {
        try {
          const userLocation = await getUserLocation();
          updatedFields.location = {
            coordinates: [userLocation.lat, userLocation.lng],
            type: 'Point',
          };
        } catch (error) {
          console.error(error);
          setErrorMessage(error);
          return;
        }
      }
    }

    if (budget.toString() !== task.budget.toString())
      updatedFields.budget = budget;

    try {
      await baseURL.patch(`/tasks/${taskId}`, updatedFields);

      const allTasksRespomse = await baseURL.get('/tasks?limit=9999');
      if (allTasksRespomse.data.success) {
        let tasks = allTasksRespomse.data.data;

        tasks = tasks.map((task) => ({
          ...task,
          createdAt: task.createdAt
            ? new Date(task.createdAt).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10),
          dueDate: task.dueDate.on
            ? { ...task.dueDate, on: task.dueDate.on.slice(0, 10) }
            : task.dueDate,
        }));

        tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        dispatch(addAllTasks(tasks));
      }
      setSuccessMessage('Task updated successfully!');
    } catch (error) {
      console.error('Failed To update the task  :', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.centerContainer}>
      <Box component='form' className={styles.form} onSubmit={handleSubmit}>
        <Typography
          variant='h3'
          sx={{
            fontWeight: 'bold',
            margin: '1rem 0',
            textAlign: 'center',
            fontSize: '1.7rem',
          }}
        >
          Update Your Task
        </Typography>

        <TextField
          label='Title'
          variant='outlined'
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label='Details'
          variant='outlined'
          fullWidth
          multiline
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id='category-label'>Category</InputLabel>
          <Select
            labelId='category-label'
            id='category'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id='location-label'>Location</InputLabel>
          <Select
            labelId='location-label'
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <MenuItem value='inPerson'>In Person</MenuItem>
            <MenuItem value='online'>Online</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label='Budget'
          variant='outlined'
          fullWidth
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
          type='number'
          sx={{ marginBottom: 2 }}
        />

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
          type='submit'
          variant='contained'
          sx={{
            color: 'white',
            borderRadius: '10px',
            backgroundColor: '#212121',
            '&:hover': { backgroundColor: '#F2CC41' },
          }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default UpdateTask;
