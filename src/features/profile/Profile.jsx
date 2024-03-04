import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  ListItemText,
} from '@mui/material';
import styles from './profile.module.css';
import popup from '../../images/popup1.png';

const Profile = () => {
  return (
    <Container>
      <div className={styles.flexContainer}>
        {' '}
        <div className={`${styles.flexItem} ${styles.leftColumn}`}>
          {' '}
          <Card className={styles.profileCard}>
            <CardContent className={styles.profileCardInfo}>
              <div className={styles.profilePicture} />
              <Typography gutterBottom variant='h5' component='div'>
                James Kennedy
              </Typography>
              <List component='nav' className={styles.navList}>
                <ListItem button>
                  <ListItemText primary='Home' />
                </ListItem>
                <ListItem button>
                  <ListItemText primary='My Tasker Dashboard' />
                </ListItem>
                <ListItem button>
                  <ListItemText primary='Payments history' />
                </ListItem>
                <ListItem button>
                  <ListItemText primary='Payment methods' />
                </ListItem>
                <ListItem button>
                  <ListItemText primary='Notifications' />
                </ListItem>
                <ListItem button>
                  <ListItemText primary='Settings' />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
        <div className={`${styles.flexItem} ${styles.rightColumn}`}>
          {' '}
          <img src={popup} alt='popup' style={{ width: '55%' }} />
          <Typography
            variant='body1'
            sx={{
              width: '65%',
              textAlign: 'center',
              fontWeight: 'bold',
              margin: '1rem 0',
            }}
          >
            This is where we'll let you know about tasks, comments and other
            stuff. Let's post a task or make an offer!
          </Typography>
          <Box sx={{ display: 'flex', margin: '1rem 0' }}>
            <Button variant='text' className={styles.notificationsButton}>
              Post a task
            </Button>
            <Button variant='text' className={styles.notificationsButton}>
              Browse tasks
            </Button>
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
