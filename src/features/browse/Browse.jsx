import React, { useState } from 'react';
import SecondaryNav from '../../components/secondary-nav/SecondaryNav';
import TaskList from '../../components/task-list/TaskList';
import TaskDetail from '../../components/task-detail/TaskDetail';
import { Box } from '@mui/material';
import styles from './browse.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import TaskDetails from '../../components/task-detail/TaskDetail';

const Browse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ backgroundColor: '#F3F3F7' }}>
      <SecondaryNav />
      <div className={styles.browseContainer}>
        <Box>
          <div className={styles.taskContainer}>
            <TaskList setIsModalOpen={setIsModalOpen} isMobile={isMobile} />
          </div>
        </Box>

        {isMobile ? (
          <TaskDetails
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          <Box sx={{ minWidth: '66%' }}>
            <div className={styles.taskContainer}>
              <TaskDetail />
            </div>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Browse;
