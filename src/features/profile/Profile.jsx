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
} from '@mui/material';
import styles from './profile.module.css';
import popup from '../../images/popup1.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const isTasker = useSelector((state) => state.taskerInfo.isTasker);

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
                {user.firstName + ' ' + user.lastName}
              </Typography>
              <List component='nav' className={styles.navList}>
                <ListItem className={styles.navListItem}>
                  <Link
                    to='/my-tasks'
                    style={{
                      textDecoration: 'none',
                      color: '#212121',
                      fontWeight: 'bold',
                    }}
                  >
                    My Tasks
                  </Link>
                </ListItem>
                {isTasker && (
                  <ListItem className={styles.navListItem}>
                    <Link
                      to='#'
                      style={{
                        textDecoration: 'none',
                        color: '#212121',
                        fontWeight: 'bold',
                      }}
                    >
                      Tasker Dashboard
                    </Link>
                  </ListItem>
                )}
                <ListItem className={styles.navListItem}>
                  <Link
                    to='/'
                    style={{
                      textDecoration: 'none',
                      color: '#212121',
                      fontWeight: 'bold',
                    }}
                  >
                    Home
                  </Link>
                </ListItem>
                <ListItem className={styles.navListItem}>
                  <Link
                    to='/account-settings'
                    style={{
                      textDecoration: 'none',
                      color: '#212121',
                      fontWeight: 'bold',
                    }}
                  >
                    Account Settings
                  </Link>
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
            <Button
              variant='text'
              className={styles.notificationsButton}
              href='/post-task'
            >
              Post a task
            </Button>
            <Button
              variant='text'
              className={styles.notificationsButton}
              href='/browse'
            >
              Browse tasks
            </Button>
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
