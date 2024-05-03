import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
  Modal,
  Card,
} from '@mui/material';
import {
  BlurCircular,
  DateRangeOutlined,
  GpsFixedOutlined,
  Person3Outlined,
} from '@mui/icons-material';
import styles from './taskDetail.module.css';
import Offers from '../offers/Offers';
import OfferModal from '../offer-modal/OfferModal';
import useMediaQuery from '@mui/material/useMediaQuery';
import baseURL from '../../API/baseURL';
import { addAllOffers } from '../offers/offersSlice';

const TaskDetails = ({ isModalOpen, setIsModalOpen }) => {
  const selectedTask = useSelector((state) => state.task.selectedTask);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [modalOpen, setModalOpen] = useState(false);
  const [taskDetail, setTaskDetail] = useState('');
  // const [taskOffers, setTaskOffers] = useState([]);
  const taskOffers = useSelector((state) => state.offers.offers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTask && selectedTask._id) {
      (async () => {
        try {
          const response = await baseURL.get(`/tasks/${selectedTask._id}`);
          if (response.data.success) {
            console.log(response.data?.data);
            setTaskDetail(response.data?.data?.details);

            dispatch(addAllOffers(response.data?.data?.offersDetails));
          }
        } catch (error) {
          console.error('Failed to fetch tasks:', error);
        }
      })();
    }
  }, [selectedTask]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitOffer = async (data) => {
    <BlurCircular />;
    setModalOpen(false);

    try {
      const response = await baseURL.post('/offers', {
        taskId: selectedTask._id,
        price: data.budget,
        message: data.offer,
      });

      if (response) {
        const allOffersResponse = await baseURL.get(
          `/tasks/${selectedTask._id}`
        );
        if (allOffersResponse.data.success) {
          dispatch(addAllOffers(allOffersResponse.data?.data?.offersDetails));
        }
      }
    } catch (error) {
      console.log('error making an offer : ', error);
    }
  };

  if (isMobile && isModalOpen) {
    return (
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskDetails />
      </Modal>
    );
  }

  if (!selectedTask) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
        className={styles.browseFiller}
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
      className={styles.detailsContainer}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        className={styles.topDetailContainer}
      >
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
                  <Typography>{`${selectedTask.userId.firstName} ${selectedTask.userId.lastName}`}</Typography>
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
                  <Typography>{selectedTask.city}</Typography>
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
                  <Typography>{selectedTask.dueDate.on}</Typography>
                </Stack>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} textAlign='left'>
            Details
          </Divider>
          <Typography variant='body1'>
            {taskDetail ? taskDetail : ''}
          </Typography>
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
            onClick={handleOpenModal}
          >
            Make an offer
          </Button>

          <OfferModal
            open={modalOpen}
            handleClose={handleCloseModal}
            handleSubmit={handleSubmitOffer}
          />
        </Box>
      </Box>
      <Box>
        <Typography className={styles.title} mt={1}>
          Offers
        </Typography>

        {taskOffers.length ? (
          taskOffers.map((offer) => <Offers key={offer._id} offer={offer} />)
        ) : (
          <Box sx={{ marginTop: '1.5rem' }}>
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
    </Paper>
  );
};

export default TaskDetails;
