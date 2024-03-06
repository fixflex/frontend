import React, { useEffect, useState } from 'react';
import SecondaryNav from '../../components/secondary-nav/SecondaryNav';
import TaskList from '../../components/task-list/TaskList';
import TaskDetail from '../../components/task-detail/TaskDetail';
import { Box } from '@mui/material';
import styles from './browse.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import TaskDetails from '../../components/task-detail/TaskDetail';
import baseURL from '../../API/baseURL';
import { useDispatch } from 'react-redux';
import { addAllTasks } from './allTasksSlice';

const Browse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchAllTasks = async () => {
      let allTasks = [];
      let currentPage = 1;
      let totalPages = 1;

      try {
        let response = await baseURL.get(`/tasks?page=${currentPage}`);
        allTasks = response.data.data;
        totalPages = response.data.pagination.totalPages;

        for (currentPage = 2; currentPage <= totalPages; currentPage++) {
          response = await baseURL.get(`/tasks?page=${currentPage}`);
          allTasks = [...allTasks, ...response.data.data];
        }

        if (isMounted) {
          console.log('All Tasks:', allTasks);
          dispatch(addAllTasks(allTasks));
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to fetch tasks:', error);
        }
      }
    };

    fetchAllTasks();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

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
