import {
  Box,
  Button,
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
import { useParams } from 'react-router-dom';
import baseURL from '../../API/baseURL';
import {
  AttachMoney,
  Check,
  EventNote,
  Person,
  Person2,
  Public,
  Star,
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

  useEffect(() => {
    (async () => {
      try {
        const taskInfo = await baseURL.get(`/tasks/${id}`);
        console.log('task info : ', taskInfo);
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
    console.log(taskerRating);
  };

  return (
    <Container>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box className={styles.myTasks}>
          <Box className={styles.header}>
            <Typography variant='h4' className={styles.title}>
              Thank you for using Fix Flex services
            </Typography>
            <Typography variant='subtitle1' className={styles.subtitle}>
              Would you like to rate your experience?
            </Typography>
          </Box>

          <Card
            sx={{
              minWidth: 275,
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
            className={styles.cardContainer}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14, fontWeight: 'bold' }}
                color='text.secondary'
                gutterBottom
              >
                {task.status}
              </Typography>
              <Typography
                variant='h5'
                component='div'
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                {task.title}
              </Typography>
              <Typography
                sx={{ mb: 2, mt: 1, fontSize: '0.8rem' }}
                color='text.secondary'
              >
                {task.details}
              </Typography>
              <Box
                display='flex'
                alignItems='flex-start'
                gap={1}
                sx={{ marginBottom: '1rem' }}
              >
                <EventNote color='action' />
                <Box>
                  <Typography
                    variant='body2'
                    sx={{ color: '#757575', fontSize: '0.7rem' }}
                  >
                    Created At
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{
                      marginLeft: 'auto',
                      color: '#333333',
                      fontWeight: 'bold',
                    }}
                  >
                    {formatDateAndTime(task.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Box
                display='flex'
                alignItems='flex-start'
                gap={1}
                sx={{ marginBottom: '1rem' }}
              >
                <AttachMoney color='action' />
                <Box>
                  <Typography
                    variant='body2'
                    sx={{ color: '#757575', fontSize: '0.7rem' }}
                  >
                    Budget
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{
                      marginLeft: 'auto',
                      color: '#333333',
                      fontWeight: 'bold',
                    }}
                  >
                    $ {task.budget}
                  </Typography>
                </Box>
              </Box>
              {task.location?.online ? (
                <Box
                  display='flex'
                  alignItems='flex-start'
                  gap={1}
                  sx={{ marginBottom: '1rem' }}
                >
                  <Public color='action' />
                  <Box>
                    <Typography
                      variant='body2'
                      sx={{ color: '#757575', fontSize: '0.7rem' }}
                    >
                      Location
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        marginLeft: 'auto',
                        color: '#333333',
                        fontWeight: 'bold',
                      }}
                    >
                      Online
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  display='flex'
                  alignItems='flex-start'
                  gap={1}
                  sx={{ marginBottom: '1rem' }}
                >
                  <Person color='action' />
                  <Box>
                    <Typography
                      variant='body2'
                      sx={{ color: '#757575', fontSize: '0.7rem' }}
                    >
                      Location
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        marginLeft: 'auto',
                        color: '#333333',
                        fontWeight: 'bold',
                      }}
                    >
                      In Person
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
            <Divider
              orientation='horizontal'
              sx={{
                width: '100%',
                backgroundColor: '#1B252E',
                fontSize: '14px',
                fontWeight: '900',
                marginBottom: '1rem ',
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                {' '}
                <Box
                  display='flex'
                  alignItems='flex-start'
                  gap={1}
                  sx={{ marginBottom: '1rem' }}
                >
                  <Person2 color='action' />
                  <Box>
                    <Typography
                      variant='body2'
                      sx={{ color: '#757575', fontSize: '0.7rem' }}
                    >
                      Task was done by :
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        marginLeft: 'auto',
                        color: '#333333',
                        fontWeight: 'bold',
                      }}
                    >
                      {`${tasker.userId?.firstName} ${tasker.userId?.lastName}`}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display='flex'
                  alignItems='flex-start'
                  gap={1}
                  sx={{ marginBottom: '1rem' }}
                >
                  <AttachMoney color='action' />
                  <Box>
                    <Typography
                      variant='body2'
                      sx={{ color: '#757575', fontSize: '0.7rem' }}
                    >
                      Accepted Budget
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        marginLeft: 'auto',
                        color: '#333333',
                        fontWeight: 'bold',
                      }}
                    >
                      $ {acceptedOffer.price}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display='flex'
                  alignItems='flex-start'
                  gap={1}
                  sx={{
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Star color='action' sx={{ color: '#FAAF00' }} />
                  <Box>
                    <Typography
                      variant='body2'
                      sx={{ color: '#757575', fontSize: '0.7rem' }}
                    >
                      Rate Tasker
                    </Typography>
                    <Box
                      display='flex'
                      flexDirection='row'
                      alignItems='center'
                      justifyContent='space-between'
                      sx={{
                        padding: '1rem',
                        borderRadius: '8px',
                      }}
                    >
                      <Rating
                        name='task-rating'
                        value={taskerRating}
                        onChange={handleRatingChange}
                      />
                      <Tooltip title='Submit Review'>
                        <IconButton
                          className={`${styles.taskButton} ${styles.offers}`}
                          onClick={handleSubmitReview}
                        >
                          <Check />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default RateTask;
