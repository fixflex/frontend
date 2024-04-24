import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { selectTask } from './taskSlice';
import styles from './taskList.module.css';
import {
  CalendarMonth,
  LocationOn,
  Person2,
  Public,
} from '@mui/icons-material';
import dayjs from 'dayjs';

const TaskList = ({
  setIsModalOpen,
  isMobile,
  titleFilter,
  categoryFilter,
  locationFilter,
  sortOption,
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.allTasks.tasks);
  const formatDate = (dueDate) => {
    return dueDate.flexible ? 'Flexible' : dueDate.on;
  };

  // Filtering logic
  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = titleFilter
      ? task.title &&
        task.title.toLowerCase().includes(titleFilter.toLowerCase())
      : true;

    const matchesCategory = categoryFilter
      ? task.categoryId && task.categoryId === categoryFilter
      : true;

    const matchesLocation = locationFilter
      ? locationFilter === 'online'
        ? task.location?.online
        : !task.location?.online
      : true;

    return matchesTitle && matchesCategory && matchesLocation;
  });

  // Sorting logic
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortOption) {
      return 0;
    }

    switch (sortOption) {
      case 'priceLowHigh':
        return a.budget - b.budget;
      case 'priceHighLow':
        return b.budget - a.budget;
      case 'newestOldest':
        return dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix();
      case 'oldestNewest':
        return dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix();
      default:
        return 0;
    }
  });

  const handleSelectTask = (task) => {
    dispatch(selectTask(task));
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles.taskListContainer}>
      {sortedTasks.map((task) => (
        <Card
          key={task._id}
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
              sx={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}
              mt={2}
            >
              <Person2 />
              <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                {`${task.userId.firstName} ${task.userId.lastName}`}
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}
              mt={2}
            >
              <CalendarMonth />
              <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                {formatDate(task.dueDate)}
              </Typography>
            </Box>
            {task.location.online ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Public />
                <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                  Online
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn />
                <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                  {task.city}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
