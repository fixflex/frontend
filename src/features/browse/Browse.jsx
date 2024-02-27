import React from 'react';
import SecondaryNav from '../../components/secondary-nav/SecondaryNav';
import TaskList from '../../components/task-list/TaskList';
import TaskDetail from '../../components/task-detail/TaskDetail';
import { Box } from '@mui/material';
import styles from './browse.module.css';

const Browse = ({ tasks }) => {
  return (
    <Box sx={{ backgroundColor: '#F3F3F7' }}>
      <SecondaryNav />
      <div className={styles.browseContainer}>
        <Box>
          <div className={styles.taskContainer}>
            {' '}
            <TaskList tasks={tasks} />
          </div>{' '}
        </Box>
        <Box sx={{ minWidth: '66%' }}>
          <div className={styles.taskContainer}>
            {' '}
            <TaskDetail />
          </div>{' '}
        </Box>
      </div>
    </Box>
  );
};

export default Browse;
