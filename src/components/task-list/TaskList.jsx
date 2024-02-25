import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { selectTask } from './taskSlice';
import styles from './taskList.module.css';
import { CalendarMonth, LocationOn } from '@mui/icons-material';

const tasks = [
  {
    title: 'Web Developer Extraordinaire Needed',
    location: 'Remote',
    details: 'Looking for a skilled web developer to revamp our website',
    budget: 800,
    offers: 6,
    date: 'Flexible',
    postedBy: 'John Doe',
  },
  {
    title: 'Garden Makeover Magician Wanted',
    location: 'San Francisco',
    details:
      'Need a creative gardener to transform our backyard into a paradise',
    budget: 600,
    offers: 4,
    date: '2024-03-15',
    postedBy: 'Alice Smith',
  },
  {
    title: 'Expert Tutor for Quantum Physics',
    location: 'New York',
    details:
      'Require an experienced tutor to help with advanced physics concepts',
    budget: 350,
    offers: 0,
    date: '2024-02-28',
    postedBy: 'Bob Johnson',
  },
  {
    title: 'Marketing Guru for Startup Launch',
    location: 'Remote',
    details: 'Launching a new product, need a marketing expert',
    budget: 500,
    offers: 8,
    date: 'Flexible',
    postedBy: 'Emma Watson',
  },
  {
    title: 'Pet Portrait Artist Required',
    location: 'London',
    details: 'Want a unique portrait of my poodle in watercolors',
    budget: 200,
    offers: 4,
    date: '2024-04-10',
    postedBy: 'Michael Brown',
  },
  {
    title: 'Yoga Instructor for Weekend Retreat',
    location: 'Remote',
    details: 'Seeking a yoga instructor for a 2-day retreat in the mountains',
    budget: 700,
    offers: 1,
    date: '2024-05-20',
    postedBy: 'Sophia Garcia',
  },
  {
    title: 'Culinary Genius for Private Dinner',
    location: 'New York',
    details: 'Hosting a dinner party for 12, need an amazing chef',
    budget: 900,
    offers: 0,
    date: 'Flexible',
    postedBy: 'David Miller',
  },
  {
    title: 'Mobile App Tester for Innovative Project',
    location: 'Remote',
    details: 'Testing a new mobile app, need thorough feedback',
    budget: 250,
    offers: 4,
    date: '2024-03-05',
    postedBy: 'Jennifer Lopez',
  },
  {
    title: 'Mystery Shopper for Boutique Stores',
    location: 'San Francisco',
    details:
      'To assess customer service, need a mystery shopper to visit several locations',
    budget: 400,
    offers: 9,
    date: 'Flexible',
    postedBy: 'Matthew Davis',
  },
  {
    title: 'Fitness Coach for Personal Training',
    location: 'Remote',
    details: 'Looking for a dedicated fitness coach for weekly sessions',
    budget: 550,
    date: 'Flexible',
    postedBy: 'Olivia Wilson',
  },
  {
    title: 'Virtual Assistant for Administrative Tasks',
    location: 'Remote',
    details: 'Need a virtual assistant for handling emails and scheduling',
    budget: 300,
    offers: 3,
    date: '2024-03-10',
    postedBy: 'Daniel Martinez',
  },
  {
    title: 'Interior Designer for Home Renovation Project',
    location: 'Los Angeles',
    details: 'Redesigning our home interior, need a creative designer',
    budget: 1000,
    offers: 2,
    date: '2024-04-01',
    postedBy: 'Ava Johnson',
  },
  {
    title: 'English Language Tutor for ESL Students',
    location: 'Remote',
    details: 'Teaching English to non-native speakers, must be patient',
    budget: 400,
    date: 'Flexible',
    postedBy: 'William Taylor',
  },
  {
    title: 'Graphic Designer for Logo Design',
    location: 'Berlin',
    details: 'Creating a logo for our new business venture',
    budget: 150,
    offers: 5,
    date: '2024-03-25',
    postedBy: 'Emily Anderson',
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LocationOn />
              <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                {' '}
                {task.location}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              mt={2}
            >
              <CalendarMonth />
              <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                {' '}
                {task.date}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
