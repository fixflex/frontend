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
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleFilter, setTitleFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await baseURL.get('/tasks?limit=9999');
        if (response.data.success) {
          let tasks = response.data.data;

          tasks = tasks.map((task) => ({
            ...task,
            createdAt: task.createdAt
              ? new Date(task.createdAt).toISOString().slice(0, 10)
              : new Date().toISOString().slice(0, 10),
            dueDate: task.dueDate.on
              ? { ...task.dueDate, on: task.dueDate.on.slice(0, 10) }
              : task.dueDate,
          }));

          tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          dispatch(addAllTasks(tasks));
        } else {
          throw new Error(response.data.message || 'Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    })();
  }, [dispatch]);

  return (
    <Box sx={{ backgroundColor: '#F3F3F7' }}>
      <SecondaryNav
        placeholder='Search for a task'
        setTitleFilter={setTitleFilter}
        setCategoryFilter={setCategoryFilter}
        setLocationFilter={setLocationFilter}
        setSortOption={setSortOption}
        titleFilter={titleFilter}
        categoryFilter={categoryFilter}
        locationFilter={locationFilter}
        sortOption={sortOption}
      />{' '}
      <div className={styles.browseContainer}>
        <Box>
          <div className={styles.taskContainer}>
            <TaskList
              setIsModalOpen={setIsModalOpen}
              isMobile={isMobile}
              titleFilter={titleFilter}
              categoryFilter={categoryFilter}
              locationFilter={locationFilter}
              sortOption={sortOption}
            />
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
