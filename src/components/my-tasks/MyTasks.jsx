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
import useMediaQuery from '@mui/material/useMediaQuery';

// Task location component
const TaskLocation = ({ task }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {task.location?.online ? <Public /> : <LocationOn />}
      <Typography variant='body2' ml={1} sx={{ fontWeight: 'bold' }}>
        {task.location?.online ? 'Online' : task.city}
      </Typography>
    </Box>
  );
};

const MyTasks = () => {
  const tasks = useSelector((state) => state?.allTasks?.tasks);
  const myId = useSelector((state) => state?.auth?.user?._id);
  const isMobile = useMediaQuery('(max-width:600px)');

  const filteredTasks = tasks.filter((task) => task?.userId?._id === myId);

  const formatDate = (dueDate) => {
    return dueDate.flexible
      ? 'Flexible'
      : dayjs(dueDate.on).format('MMM D, YYYY');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h4'>Sit tight while we find your Taskers</Typography>
      <Typography variant='subtitle1'>
        We'll notify you when new offers come in.
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent={isMobile ? 'center' : 'flex-start'}
        marginTop={3}
      >
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
            <Card
              sx={{
                boxShadow: 'none',
                border: '1px solid #ddd',
                borderRadius: '10px',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent>
                <Typography variant='h6'>{task.title}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person2 />
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 'bold', marginLeft: '0.5rem' }}
                  >
                    {task.userId?.firstName} {task.userId?.lastName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '0.5rem',
                  }}
                >
                  <CalendarMonth />
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 'bold', marginLeft: '0.5rem' }}
                  >
                    {formatDate(task.dueDate)}
                  </Typography>
                </Box>
                <TaskLocation task={task} />
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Button
                    href='#'
                    variant='contained'
                    sx={{
                      color: 'white',
                      borderRadius: '10px',
                      backgroundColor: '#212121',
                      '&:hover': {
                        backgroundColor: '#F2CC41',
                      },
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    href='#'
                    variant='contained'
                    sx={{
                      color: 'white',
                      borderRadius: '10px',
                      backgroundColor: '#CC282F',
                      '&:hover': {
                        backgroundColor: '#F2CC41',
                      },
                    }}
                  >
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
