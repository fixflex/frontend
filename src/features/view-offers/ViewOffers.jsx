import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import baseURL from '../../API/baseURL';
import {
  AttachMoney,
  EventNote,
  Person,
  Public,
  Star,
} from '@mui/icons-material';
import styles from './viewOffers.module.css';

const ViewOffers = () => {
  const { id } = useParams();
  const [taskInfo, setTaskInfo] = useState('');
  const [offers, setOffers] = useState([]);

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

  useEffect(() => {
    (async () => {
      const taskDetails = await baseURL.get(`/tasks/${id}`);

      console.log(taskDetails);

      if (taskDetails.status === 200) {
        setTaskInfo(taskDetails.data?.data);
        setOffers(taskDetails.data?.data?.offersDetails);
        // console.log(taskDetails.data?.data?.offersDetails[0].);
      }
    })();
  }, [id]);
  return (
    <Container>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box className={styles.myTasks}>
          <Box className={styles.header}>
            <Typography variant='h4' className={styles.title}>
              Sit tight while we find your Taskers
            </Typography>
            <Typography variant='subtitle1' className={styles.subtitle}>
              We'll notify you when new offers come in.
            </Typography>
          </Box>

          <Card
            sx={{ minWidth: 275, boxShadow: 3 }}
            className={styles.cardContainer}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14, fontWeight: 'bold' }}
                color='text.secondary'
                gutterBottom
              >
                {taskInfo.status}
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
                {taskInfo.title}
              </Typography>
              <Typography
                sx={{ mb: 2, mt: 1, fontSize: '0.8rem' }}
                color='text.secondary'
              >
                {taskInfo.details}
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
                    {formatDateAndTime(taskInfo.createdAt)}
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
                    $ {taskInfo.budget}
                  </Typography>
                </Box>
              </Box>
              {taskInfo.location?.online ? (
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
          </Card>
        </Box>
      </Box>
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
      <Box>
        <Typography className={styles.title} sx={{ fontSize: '2rem' }}>
          Offers
        </Typography>
        {offers.length ? (
          offers.map((offer) => (
            <Box sx={{ marginTop: '1.5rem' }} key={offer._id}>
              <Card style={{ marginBottom: '1rem' }}>
                <CardContent
                  sx={{ display: 'flex' }}
                  className={styles.cardContainer}
                >
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item>
                      <Avatar sx={{ backgroundColor: '#272727' }}>
                        {offer.taskerId?.userId?.firstName[0]}
                      </Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {`${offer.taskerId?.userId?.firstName} ${offer.taskerId?.userId?.lastName}`}
                      </Typography>

                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: 'bold',
                          color: '#FF7F00',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {offer.taskerId?.ratingAverage} <Star />
                        <Typography
                          sx={{ color: '#1B252E', fontSize: '0.8rem' }}
                        >
                          {' '}
                          {`(${offer.taskerId?.ratingQuantity} reviews) `}
                        </Typography>
                      </Typography>

                      <Typography
                        color='textSecondary'
                        gutterBottom
                        sx={{ fontSize: 'small', margin: '0.5rem 0' }}
                      >
                        {formatDateAndTime(offer.createdAt)}
                      </Typography>

                      <Typography variant='body3' sx={{ fontWeight: '600' }}>
                        {offer.message}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box className={styles.budgetBox}>
                    <Typography
                      variant='h6'
                      gutterBottom
                      sx={{ color: '#767E84', fontSize: '0.9rem' }}
                    >
                      TASK BUDGET
                    </Typography>
                    <Typography variant='h4' className={styles.budgetNumber}>
                      {`$ ${offer.price}`}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Button
                        variant='contained'
                        sx={{
                          backgroundColor: '#1B252E',
                          borderRadius: '10px',
                          mt: 2,
                          mr: 2,
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant='contained'
                        sx={{
                          mt: 2,
                          backgroundColor: '#cc282f',
                          borderRadius: '10px',
                        }}
                      >
                        Decline
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))
        ) : (
          <Box sx={{ marginTop: '1.5rem' }}>
            <Typography className={styles.title}>Offers</Typography>
            <Card
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              No Offers Available Yet !
            </Card>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ViewOffers;
