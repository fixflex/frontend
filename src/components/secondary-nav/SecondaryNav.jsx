import React, { useState } from 'react';
import {
  InputBase,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Box,
} from '@mui/material';
import styles from './secondaryNav.module.css';

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const SecondaryNav = () => {
  const isMobile = useResponsive();
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  // Dummy category data and state for the example
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1', checked: false },
    { id: 2, name: 'Category 2', checked: false },
    // Add more categories as needed
  ]);

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setCategories(
      categories.map((category) =>
        category.id === id
          ? { ...category, checked: !category.checked }
          : category
      )
    );
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={styles.secondaryNav}>
      <InputBase
        placeholder='Search for a task'
        className={styles.searchInput}
      />
      {isMobile ? (
        <Button onClick={handleOpen} className={styles.filterButton}>
          Filter
        </Button>
      ) : (
        <Button onClick={handleOpen} className={styles.filterButton}>
          Filter
        </Button>
      )}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby='filter-modal-title'
        aria-describedby='filter-modal-description'
      >
        <Box sx={modalStyle}>
          <h2 id='filter-modal-title'>Filters</h2>
          <div id='filter-modal-description'>
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={category.checked}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                }
                label={category.name}
              />
            ))}
          </div>
          <Button onClick={handleClose}>Apply Filters</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SecondaryNav;
