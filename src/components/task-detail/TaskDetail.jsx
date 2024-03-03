import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Paper, Stack, Divider } from '@mui/material';
import {
  DateRangeOutlined,
  GpsFixedOutlined,
  Person3Outlined,
} from '@mui/icons-material';
import styles from './taskDetail.module.css';
import Offers from '../offers/Offers';

const TaskDetails = () => {
  const selectedTask = useSelector((state) => state.task.selectedTask);

  if (!selectedTask) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        Please select a task to view details.
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 5,
        overflowY: 'auto',
        maxHeight: '80vh',
        width: '75%',
        marginLeft: '3rem',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='h5' gutterBottom className={styles.title}>
            {selectedTask.title}
          </Typography>
          <Box className={styles.taskInfo}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person3Outlined />
                <Stack sx={{ marginLeft: '1rem' }}>
                  <Typography
                    sx={{
                      color: '#7D858A',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                    }}
                  >
                    POSTED BY
                  </Typography>
                  <Typography>{selectedTask.postedBy}</Typography>
                </Stack>
              </Box>
              <Typography
                variant='body1'
                sx={{
                  color: '#7D858A',
                  fontSize: '0.7rem',
                  marginRight: '1rem',
                }}
              >
                about 3 hours ago
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}
              >
                <GpsFixedOutlined />
                <Stack sx={{ marginLeft: '1rem' }}>
                  <Typography
                    sx={{
                      color: '#7D858A',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Location
                  </Typography>
                  <Typography>{selectedTask.location}</Typography>
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <DateRangeOutlined />
                <Stack sx={{ marginLeft: '1rem' }}>
                  <Typography
                    sx={{
                      color: '#7D858A',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Date
                  </Typography>
                  <Typography>{selectedTask.date}</Typography>
                </Stack>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} textAlign='left'>
            Details
          </Divider>
          <Typography variant='body1'>{selectedTask.details}</Typography>
        </Box>
        <Box className={styles.budgetBox}>
          <Typography
            variant='h6'
            gutterBottom
            sx={{ color: '#767E84', fontSize: '0.9rem' }}
          >
            TASK BUDGET
          </Typography>
          <Typography variant='h4' className={styles.budgetNumber}>
            ${selectedTask.budget}
          </Typography>
          <Button
            variant='contained'
            sx={{ mt: 2 }}
            className={styles.offerButton}
          >
            Make an offer
          </Button>
        </Box>
      </Box>
      <Box>
        <Offers />
      </Box>
    </Paper>
  );
};

export default TaskDetails;
