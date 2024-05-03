import React, { useEffect, useState } from 'react';
import baseURL from '../../API/baseURL';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import styles from './offersPage.module.css';
import {
  Ballot,
  CalendarMonth,
  Clear,
  Edit,
  HourglassBottom,
  HourglassFull,
  Money,
} from '@mui/icons-material';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [taskerID, setTaskerID] = useState('');
  const [open, setOpen] = useState(false);
  const [setSelectedOffer] = useState(null);

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

  const handleOpen = (offer) => {
    setSelectedOffer(offer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log('delete offer');
  };

  const handleUpdate = (offer) => {
    console.log('update offer');
  };

  useEffect(() => {
    (async () => {
      try {
        const getTasker = await baseURL.get('/taskers/me');
        if (getTasker.status === 200) {
          setTaskerID(getTasker.data?.data?._id);
        } else {
          return;
        }

        const allOffers = (await baseURL.get('/offers')).data.data;

        const filteredOffers = allOffers.filter(
          (offer) => offer.taskerId === taskerID
        );

        setOffers(filteredOffers);
      } catch (error) {
        console.log('Error getting offers : ', error);
      }
    })();
  }, [taskerID]);

  return (
    <Box className={styles.myOffers}>
      <Typography variant='h4' className={styles.title}>
        Here you can view all the offers you've made
      </Typography>
      <Typography variant='subtitle1' className={styles.subtitle}>
        We'll let you know when an offer gets accepted
      </Typography>
      <Grid container className={styles.offerListContainer} gap={4}>
        {offers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={offer._id}>
            <Card className={styles.offerCard}>
              <CardContent>
                <Typography
                  variant='h6'
                  className={styles.offerCardTitle}
                  mb={2}
                >
                  {offer.message}
                </Typography>
                <Box className={styles.offerUser}>
                  <Money />
                  <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                    {`Suggested budget : $ ${offer.price}`}
                  </Typography>
                </Box>
                <Box className={styles.offerUser} sx={{ fontWeight: 'bold' }}>
                  {offer.status === 'PENDING' ? (
                    <HourglassBottom />
                  ) : (
                    <HourglassFull />
                  )}
                  {`Status : ${offer.status}`}
                </Box>
                <Box className={styles.offerDueDate}>
                  <CalendarMonth />
                  <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                    {'Created at: '}
                    {formatDateAndTime(offer.createdAt)}
                  </Typography>
                </Box>
                <Box className={styles.offerActions}>
                  <Tooltip title='Update Offer'>
                    <IconButton
                      className={`${styles.offerButton} ${styles.update}`}
                      onClick={() => handleUpdate(offer)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='View Task'>
                    <IconButton
                      className={`${styles.offerButton} ${styles.offers}`}
                      href={`/browse#${offer.taskId}`}
                    >
                      <Ballot />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Mark Offer Inactive'>
                    <IconButton
                      className={`${styles.offerButton} ${styles.delete}`}
                      onClick={() => handleOpen(offer)}
                    >
                      <Clear />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This Action will delete this offer and all its related transactions
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

export default OffersPage;
