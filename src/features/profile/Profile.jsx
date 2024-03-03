import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styles from './profile.module.css';

const Profile = () => {
  const textStyle = { color: '#030224' };

  return (
    <Card className={styles.profileCard}>
      <CardContent className={styles.profileCardContent}>
        <div
          className={styles.profilePicture}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617289755070-3590b660a06e')`,
          }}
        />
        <Typography gutterBottom variant='h5' component='div' style={textStyle}>
          James Kennedy
        </Typography>
        <Typography variant='body2' style={textStyle}>
          My Tasker Dashboard
        </Typography>
        <div>
          <Button
            variant='contained'
            className={styles.customButton}
            style={{ backgroundColor: '#030224', color: 'white' }}
          >
            Post a task
          </Button>
          <Button
            variant='outlined'
            className={`${styles.customButton} ${styles.customOutlinedButton}`}
          >
            Browse tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
