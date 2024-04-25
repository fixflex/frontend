import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Modal,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './accountSettings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import baseURL from '../../API/baseURL';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../signup/authSlice';

const AccountSettings = () => {
  const isTasker = useSelector((state) => state.taskerInfo.isTasker);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate('');
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = async () => {
    // Add code to delete account here
    if (isTasker) {
      try {
        const response = await baseURL.delete('/taskers/me');
        console.log(response);
        navigate('/');
        dispatch(userLoggedOut());
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userTasks');
        localStorage.removeItem('taskerInfo');

        window.location.reload();
      } catch (error) {
        console.error('Delete Tasker failed:', error);
      }
    } else if (!isTasker) {
      try {
        const response = await baseURL.delete('/users/me');
        console.log(response);
        navigate('/');
        dispatch(userLoggedOut());
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userTasks');
        localStorage.removeItem('taskerInfo');
        window.location.reload();
      } catch (error) {
        console.error('Delete Tasker failed:', error);
      }
    }

    handleClose();
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: '5px solid #1B252E',
        borderRadius: '25px',
        margin: '8rem 11rem',
        padding: '3rem 1rem',
      }}
      className={styles.container}
    >
      <Typography
        variant='h3'
        className={`${styles.animatedText} ${styles.typographyCustom}`}
      >
        How can we help you?
      </Typography>

      <Container>
        <List
          component='nav'
          sx={{ padding: '4rem 8rem' }}
          className={styles.actionList}
        >
          {!isTasker && (
            <ListItem
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              className={styles.actionItem}
            >
              <Typography
                sx={{ fontWeight: 'bold' }}
                className={styles.actionItemTitle}
              >
                Here's how you can become a tasker at just some few steps!
              </Typography>
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
                Become A Tasker
              </Button>
            </ListItem>
          )}
          <ListItem
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            className={styles.actionItem}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
              className={styles.actionItemTitle}
            >
              Update your Info
            </Typography>
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
              Edit My Account
            </Button>
          </ListItem>

          <ListItem
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            className={styles.actionItem}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
              className={styles.actionItemTitle}
            >
              We're sad to see you go!
            </Typography>
            <Button
              variant='contained'
              sx={{
                color: 'white',
                borderRadius: '10px',
                backgroundColor: '#CC282F',
                '&:hover': {
                  backgroundColor: '#F2CC41',
                },
              }}
              onClick={handleOpen}
            >
              Delete Account
            </Button>
          </ListItem>
        </List>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='delete-account-modal-title'
          aria-describedby='delete-account-modal-description'
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
              textAlign: 'center',
            }}
            className={styles.deleteModal}
          >
            <Typography
              id='delete-account-modal-title'
              variant='h6'
              component='h2'
              sx={{ fontWeight: 'bold' }}
            >
              Are you sure you'd like to delete your account?
            </Typography>
            <Box mt={2}>
              <Button
                variant='contained'
                onClick={handleDeleteAccount}
                sx={{ mr: 2, backgroundColor: '#CC282F' }}
              >
                Confirm
              </Button>
              <Button
                variant='contained'
                onClick={handleClose}
                sx={{ backgroundColor: '#212121' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Container>
  );
};

export default AccountSettings;
