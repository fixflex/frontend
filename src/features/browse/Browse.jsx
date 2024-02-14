import React from 'react';
import SecondaryNav from '../../components/secondary-nav/SecondaryNav';
import TaskList from '../../components/task-list/TaskList';
import TaskDetail from '../../components/task-detail/TaskDetail';
import { Grid } from '@mui/material';
import styles from './browse.module.css';

const Browse = ({ tasks }) => {
  return (
    <>
      <SecondaryNav />
      <div className={styles.browseContainer}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div className={styles.taskContainer}>
              {' '}
              <TaskList tasks={tasks} />
            </div>{' '}
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={styles.taskContainer}>
              {' '}
              <TaskDetail />
            </div>{' '}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Browse;
