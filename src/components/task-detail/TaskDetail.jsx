// TaskDetail.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './taskDetail.module.css'; // Your CSS module file for TaskDetail

const TaskDetail = () => {
  const selectedTask = useSelector((state) => state.task.selectedTask);

  if (!selectedTask) {
    return (
      <div className={styles.taskDetailContainer}>
        Please select a task to view details.
      </div>
    );
  }

  return (
    <Card className={styles.taskDetailCard}>
      <CardContent>
        <Typography
          gutterBottom
          variant='h5'
          component='h2'
          className={styles.taskDetailTitle}
        >
          {selectedTask.title}
        </Typography>
        <Typography variant='subtitle1' className={styles.taskDetailUser}>
          Posted by: {selectedTask.userPosted}
        </Typography>
        <Typography variant='body1' className={styles.taskDetailLocation}>
          Location: {selectedTask.location}
        </Typography>
        <Typography variant='body1' className={styles.taskDetailDetails}>
          Details: {selectedTask.details}
        </Typography>
        <Typography variant='h6' className={styles.taskDetailBudget}>
          Budget: ${selectedTask.budget}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskDetail;
