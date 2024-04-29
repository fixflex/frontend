import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
} from '@mui/material';
import {
  Person2,
  CalendarMonth,
  LocationOn,
  Public,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import styles from './myTasks.module.css';
const TaskLocation = ({ task }) => (
  <Box className={styles.taskLocation}>
    {task.location?.online ? <Public /> : <LocationOn />}
    <Typography variant='body2'>
      {task.location?.online ? 'Online' : task.city}
    </Typography>
  </Box>
);

const MyTasks = () => {
  const tasks = useSelector((state) => state?.allTasks?.tasks);
  const myId = useSelector((state) => state?.auth?.user?._id);

  const filteredTasks = tasks.filter((task) => task?.userId?._id === myId);

  const formatDate = (dueDate) =>
    dueDate.flexible ? 'Flexible' : dayjs(dueDate.on).format('MMM D, YYYY');

  return (
    <Box className={styles.myTasks}>
      <Typography variant='h4' className={styles.title}>
        Sit tight while we find your Taskers
      </Typography>
      <Typography variant='subtitle1' className={styles.subtitle}>
        We'll notify you when new offers come in.
      </Typography>
      <Grid container className={styles.taskListContainer} gap={4}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
            <Card className={styles.taskCard}>
              <CardContent>
                <Typography variant='h6' className={styles.taskCardTitle}>
                  {task.title}
                </Typography>
                <Box className={styles.taskUser}>
                  <Person2 />
                  <Typography variant='body2'>
                    {task.userId?.firstName} {task.userId?.lastName}
                  </Typography>
                </Box>
                <Box className={styles.taskDueDate}>
                  <CalendarMonth />
                  <Typography variant='body2'>
                    {formatDate(task.dueDate)}
                  </Typography>
                </Box>
                <TaskLocation task={task} />
                <Box className={styles.taskActions}>
                  <Button
                    className={`${styles.taskButton} ${styles.completed}`}
                  >
                    Done
                  </Button>
                  <Button className={`${styles.taskButton} ${styles.update}`}>
                    Update
                  </Button>
                  <Button className={`${styles.taskButton} ${styles.delete}`}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyTasks;
