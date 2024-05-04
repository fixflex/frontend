import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Person2,
  CalendarMonth,
  LocationOn,
  Public,
  Check,
  Edit,
  Clear,
  Ballot,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import styles from './myTasks.module.css';
import baseURL from '../../API/baseURL';
import { useNavigate } from 'react-router-dom';
import { deleteTask, updateTask } from '../browse/allTasksSlice';

const TaskLocation = ({ task }) => (
  <Box className={styles.taskLocation}>
    {task.location?.online ? <Public /> : <LocationOn />}
    <Typography variant='body2'>
      {task.location?.online ? 'Online' : task.city}
    </Typography>
  </Box>
);

const MyTasks = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.allTasks.tasks);
  const myId = useSelector((state) => state.auth.user._id);

  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(
    (task) => task.userId._id === myId && task.status !== 'CANCELLED'
  );
  const formatDate = (dueDate) =>
    dueDate.flexible ? 'Flexible' : dayjs(dueDate.on).format('MMM D, YYYY');

  const handleOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (selectedTask) {
      try {
        const response = await baseURL.patch(
          `/tasks/${selectedTask._id}/cancel`
        );
        console.log(response);
        if (response.status === 200) {
          dispatch(deleteTask(selectedTask._id));
          handleClose();
        }
      } catch (error) {
        console.error('There was an error deleting the task:', error);
      }
    }
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    navigate(`/update-task/${task._id}`);
  };

  const handleComplete = async (task) => {
    setSelectedTask(task);
    try {
      const markCompleted = await baseURL.patch(`/tasks/${task._id}/complete`);

      if (markCompleted.status === 200) {
        dispatch(
          updateTask({
            status: 'COMPLETED',
          })
        );

        navigate(`/rate-task/${task._id}`);
      }
    } catch (error) {
      console.error('There was an error marking your task completed : ', error);
    }
  };

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
                {task.status === 'COMPLETED' ? (
                  <Typography
                    sx={{
                      textAlign: 'center',
                      backgroundColor: '#188653',
                      color: 'white',
                      padding: '0.5rem',
                      borderRadius: '10px',
                    }}
                  >
                    Task Completed Successfully!
                  </Typography>
                ) : (
                  <Box className={styles.taskActions}>
                    <Tooltip title='Mark Done'>
                      <IconButton
                        className={`${styles.taskButton} ${styles.completed}`}
                        onClick={() => handleComplete(task)}
                      >
                        <Check />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Update Task'>
                      <IconButton
                        className={`${styles.taskButton} ${styles.update}`}
                        onClick={() => handleUpdate(task)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='View Offers'>
                      <IconButton
                        className={`${styles.taskButton} ${styles.offers}`}
                        href={`/view-offers/${task._id}`}
                      >
                        <Ballot />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title='Mark task Inactive'>
                      <IconButton
                        className={`${styles.taskButton} ${styles.delete}`}
                        onClick={() => handleOpen(task)}
                      >
                        <Clear />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This Action will delete this task and all its offers
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='contained'
            sx={{ backgroundColor: '#398CB4', borderRadius: '10px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color='primary'
            autoFocus
            variant='contained'
            sx={{ backgroundColor: '#cc282f', borderRadius: '10px' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyTasks;
