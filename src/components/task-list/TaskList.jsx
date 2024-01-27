// TaskList.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { selectTask } from './taskSlice'; // Assuming you have a taskSlice for Redux
import styles from './taskList.module.css'; // Your CSS module file

const tasks = [
  {
    title: 'Web Developer Extraordinaire Needed',
    userPosted: 'Jessica B.',
    location: 'Remote',
    details: 'Looking for a skilled web developer to revamp our website',
    budget: 800,
  },
  {
    title: 'Garden Makeover Magician Wanted',
    userPosted: 'Michael S.',
    location: 'San Francisco',
    details:
      'Need a creative gardener to transform our backyard into a paradise',
    budget: 600,
  },
  {
    title: 'Expert Tutor for Quantum Physics',
    userPosted: 'Linda F.',
    location: 'New York',
    details:
      'Require an experienced tutor to help with advanced physics concepts',
    budget: 350,
  },
  {
    title: 'Marketing Guru for Startup Launch',
    userPosted: 'Chris P.',
    location: 'Remote',
    details: 'Launching a new product, need a marketing expert',
    budget: 500,
  },
  {
    title: 'Pet Portrait Artist Required',
    userPosted: 'Morgan K.',
    location: 'London',
    details: 'Want a unique portrait of my poodle in watercolors',
    budget: 200,
  },
  {
    title: 'Yoga Instructor for Weekend Retreat',
    userPosted: 'Alex G.',
    location: 'Remote',
    details: 'Seeking a yoga instructor for a 2-day retreat in the mountains',
    budget: 700,
  },
  {
    title: 'Culinary Genius for Private Dinner',
    userPosted: 'Samantha L.',
    location: 'New York',
    details: 'Hosting a dinner party for 12, need an amazing chef',
    budget: 900,
  },
  {
    title: 'Mobile App Tester for Innovative Project',
    userPosted: 'Oliver T.',
    location: 'Remote',
    details: 'Testing a new mobile app, need thorough feedback',
    budget: 250,
  },
  {
    title: 'Mystery Shopper for Boutique Stores',
    userPosted: 'Evelyn W.',
    location: 'San Francisco',
    details:
      'To assess customer service, need a mystery shopper to visit several locations',
    budget: 400,
  },
  {
    title: 'Fitness Coach for Personal Training',
    userPosted: 'Daniel M.',
    location: 'Remote',
    details: 'Looking for a dedicated fitness coach for weekly sessions',
    budget: 550,
  },
];

const TaskList = () => {
  const dispatch = useDispatch();

  const handleSelectTask = (task) => {
    dispatch(selectTask(task));
  };

  return (
    <div className={styles.taskListContainer}>
      {tasks.map((task, index) => (
        <Card
          key={index}
          className={styles.taskCard}
          onClick={() => handleSelectTask(task)}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              className={styles.taskCardTitle}
            >
              {task.title}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              className={styles.taskCardDetail}
            >
              Posted by: {task.userPosted}
            </Typography>
            <Typography variant='body2'>Location: {task.location}</Typography>
            <Typography variant='body1'>Budget: ${task.budget}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
