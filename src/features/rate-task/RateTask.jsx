import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import baseURL from '../../API/baseURL';
import {
  AttachMoney,
  Check,
  EventNote,
  Public,
  Star,
  LocationOn,
} from '@mui/icons-material';
import styles from './rateTask.module.css';

const RateTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [tasker, setTasker] = useState({});
  const [acceptedOffer, setAcceptedOffer] = useState({});
  const [taskerRating, setTaskerRating] = useState(null);

  const handleRatingChange = (event, newValue) => {
    setTaskerRating(newValue);
  };

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const taskInfo = await baseURL.get(`/tasks/${id}`);
        if (taskInfo.status === 200) {
          setTask(taskInfo.data?.data);

          const acceptedOffer = await baseURL.get(
            `/offers/${taskInfo.data?.data?.acceptedOffer}`
          );

          setAcceptedOffer(acceptedOffer.data?.data);

          const taskerInfo = await baseURL.get(
            `/taskers/${acceptedOffer.data?.data?.taskerId}`
          );
          setTasker(taskerInfo.data?.data);
        }
      } catch (error) {
        console.log('There Was an error getting your task', error);
      }
    })();
  }, [id]);

  const formatDateAndTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formattedTime = date
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .toLowerCase();
    return `${formattedDate} at ${formattedTime}`;
  };

  const handleSubmitReview = async () => {
    try {
      await baseURL.post(`/tasks/${task._id}/reviews`, {
        review: 'this is a review filler',
        rating: taskerRating,
      });
      navigate('/my-tasks');
    } catch (error) {
      console.error('there was an error rating your tasker ', error);
    }
  };

  return (
    <Container className={styles.rateTaskContainer}>
      <Box className={styles.rateTaskBox}>
        <Typography variant='h4' className={styles.rateTaskTitle}>
          Thank you for using Fix Flex services
        </Typography>
        <Typography variant='subtitle1' className={styles.rateTaskSubtitle}>
          Would you like to rate your experience?
        </Typography>

        <Card className={styles.rateTaskCard}>
          <CardContent>
            <Typography className={styles.rateTaskStatus}>
              {task.status}
            </Typography>
            <Typography variant='h5' className={styles.rateTaskTitleText}>
              {task.title}
            </Typography>
            <Typography className={styles.rateTaskDetails}>
              {task.details}
            </Typography>
            <Box className={styles.rateTaskInfo}>
              <EventNote color='action' />
              <Box>
                <Typography className={styles.rateTaskLabel}>
                  Created At
                </Typography>
                <Typography className={styles.rateTaskValue}>
                  {formatDateAndTime(task.createdAt)}
                </Typography>
              </Box>
            </Box>
            <Box className={styles.rateTaskInfo}>
              <AttachMoney color='action' />
              <Box>
                <Typography className={styles.rateTaskLabel}>Budget</Typography>
                <Typography className={styles.rateTaskValue}>
                  $ {task.budget}
                </Typography>
              </Box>
            </Box>
            {task.location?.online ? (
              <Box className={styles.rateTaskInfo}>
                <Public color='action' />
                <Box>
                  <Typography className={styles.rateTaskLabel}>
                    Location
                  </Typography>
                  <Typography className={styles.rateTaskValue}>
                    Online
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box className={styles.rateTaskInfo}>
                <LocationOn color='action' />
                <Box>
                  <Typography className={styles.rateTaskLabel}>
                    Location
                  </Typography>
                  <Typography className={styles.rateTaskValue}>
                    In Person
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
          <Divider className={styles.rateTaskDivider} />

          <Box className={styles.rateTaskFooter}>
            <Box className={styles.rateTaskInfo}>
              <img
                src={
                  tasker.userId?.profilePicture[0]?.url
                    ? tasker.userId?.profilePicture[0]?.url
                    : 'https://images.unsplash.com/photo-1717733812723-543792d9e74e'
                }
                alt='Tasker'
                className={styles.taskerImage}
              />
              <Box>
                <Typography className={styles.rateTaskLabel}>
                  Task was done by:
                </Typography>
                <Typography className={styles.rateTaskValue}>
                  {`${tasker.userId?.firstName} ${tasker.userId?.lastName}`}
                </Typography>
              </Box>
            </Box>
            <Box className={styles.rateTaskInfo}>
              <AttachMoney color='action' />
              <Box>
                <Typography className={styles.rateTaskLabel}>
                  Accepted Budget
                </Typography>
                <Typography className={styles.rateTaskValue}>
                  $ {acceptedOffer.price}
                </Typography>
              </Box>
            </Box>
            <Box className={styles.rateTaskRating}>
              <Star color='action' className={styles.rateTaskStarIcon} />
              <Box>
                <Typography className={styles.rateTaskLabel}>
                  Rate Tasker
                </Typography>
                <Box className={styles.rateTaskRatingBox}>
                  <Rating
                    name='task-rating'
                    value={taskerRating}
                    onChange={handleRatingChange}
                  />
                  <Tooltip title='Submit Review'>
                    <IconButton
                      className={`${styles.rateTaskButton} ${styles.offers}`}
                      onClick={handleSubmitReview}
                    >
                      <Check />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default RateTask;
