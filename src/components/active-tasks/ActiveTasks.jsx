import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import styles from './tasks.module.css';

// This is a mock for the tasks, replace with real data
const tasks = [
  {
    title: 'Web & App Design',
    description: 'I will design modern websites in figma...',
    rating: 4.82,
    reviews: 94,
    author: 'Wanda Runo',
    price: '$983',
  },
  {
    title: 'Art & Illustration',
    description: 'I will create modern flat design illustr...',
    rating: 4.82,
    reviews: 94,
    author: 'Ali Tufan',
    price: '$983',
  },
  {
    title: 'Design & Creative',
    description: 'I will build a fully responsive design i...',
    rating: 4.82,
    reviews: 94,
    author: 'Wanda Runo',
    price: '$983',
  },
  {
    title: 'Design & Creative',
    description: 'I will build a fully responsive design i...',
    rating: 4.82,
    reviews: 94,
    author: 'Wanda Runo',
    price: '$983',
  },
  {
    title: 'Art & Illustration',
    description: 'I will create modern flat design illustr...',
    rating: 4.82,
    reviews: 94,
    author: 'Ali Tufan',
    price: '$983',
  },
  {
    title: 'Web & App Design',
    description: 'I will design modern websites in figma...',
    rating: 4.82,
    reviews: 94,
    author: 'Wanda Runo',
    price: '$983',
  },
];

const ActiveTasks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tasks.length;
  const cardToShow = 4;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className={styles.carouselContainer}>
      <Typography variant='h4' gutterBottom className={styles.title}>
        Trending Services
      </Typography>
      <Typography variant='subtitle1' gutterBottom className={styles.subtitle}>
        Most viewed and all-time top-selling services
      </Typography>
      <IconButton
        onClick={handleBack}
        disabled={activeStep === 0}
        className={styles.navButton}
        aria-label='previous task'
      >
        <NavigateBefore />
      </IconButton>
      <IconButton
        onClick={handleNext}
        disabled={activeStep === maxSteps - cardToShow}
        className={styles.navButton}
        aria-label='next task'
      >
        <NavigateNext />
      </IconButton>
      <Grid container spacing={2} className={styles.gridContainer}>
        {tasks.map((task, index) => (
          <Grid item key={index} className={styles.gridItem}>
            <Card className={styles.card}>
              <CardMedia
                component='img'
                className={styles.cardMedia}
                image='https://images.unsplash.com/photo-1611021061285-16c871740efa'
                alt={task.title}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {task.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {task.description}
                </Typography>
                {/* Additional task details here */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActiveTasks;
