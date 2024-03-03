import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import styles from './myTasks.module.css';
import { AttachMoney, EventNote, MoreHoriz } from '@mui/icons-material';

const MyTasks = () => {
  return (
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
          <Typography variant='caption' className={styles.views}>
            0 views
          </Typography>
        </Box>

        <Card sx={{ minWidth: 275, boxShadow: 3 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, fontWeight: 'bold' }}
              color='text.secondary'
              gutterBottom
            >
              Remote
            </Typography>
            <Typography
              variant='h5'
              component='div'
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}
            >
              I'm trying out the app
            </Typography>
            <Typography sx={{ mb: 2, mt: 2 }} color='text.secondary'>
              I'm trying out the app don't mind me
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
                  Due Date
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    marginLeft: 'auto',
                    color: '#333333',
                    fontWeight: 'bold',
                  }}
                >
                  March 13
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
                  Price
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    marginLeft: 'auto',
                    color: '#333333',
                    fontWeight: 'bold',
                  }}
                >
                  $999
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='small' sx={{ float: 'left' }}>
                <MoreHoriz fontSize='small' mr={5} />{' '}
              </IconButton>
              <Typography
                variant='body2'
                sx={{ color: '#333333', fontWeight: 'bold' }}
              >
                more options
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MyTasks;
