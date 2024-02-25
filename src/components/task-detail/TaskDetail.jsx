import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './taskDetail.module.css';

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
    <div className={styles.taskDetailContainer}>
      <div className={styles.taskDetailCard}>
        <div className={styles.taskDetailHeader}>
          <Typography gutterBottom variant='h5' component='h2'>
            {selectedTask.title}
          </Typography>
          <Typography variant='subtitle1'>{selectedTask.userPosted}</Typography>
        </div>
        <Typography variant='body1'>{selectedTask.location}</Typography>
        <Typography variant='body1'>{selectedTask.details}</Typography>
        <div className={styles.taskDetailBudgetContainer}>
          <Typography variant='h6'>Budget: ${selectedTask.budget}</Typography>
          <button className={styles.makeOfferButton}>Make an offer</button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
