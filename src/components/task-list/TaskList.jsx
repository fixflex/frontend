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

const TaskList = ({ setIsModalOpen, isMobile }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.allTasks.tasks);

  const handleSelectTask = (task) => {
    dispatch(selectTask(task));
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  const formatDate = (dueDate) => {
    return dueDate.flexible ? 'Flexible' : dueDate.on;
  };

  return (
    <div className={styles.taskListContainer}>
      {tasks.map((task, index) => (
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

            <Box sx={{ display: 'flex', alignItems: 'center' }} mt={2}>
              <CalendarMonth />
              <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                {formatDate(task.dueDate)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }} mt={2}>
              <Person2 />
              <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                {`${task.userId.firstName} ${task.userId.lastName}`}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
