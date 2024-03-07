import React, { useState, useEffect } from 'react';
import {
  InputBase,
  Button,
  Modal,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import styles from './secondaryNav.module.css';

const SecondaryNav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const renderFilters = () =>
    categories.map((category) => (
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
    ));

  return (
    <div className={styles.secondaryNav}>
      <InputBase
        placeholder='Search for a task'
        className={styles.searchInput}
      />
      {!isMobile && <div className={styles.filters}>{renderFilters()}</div>}
      <Button onClick={handleOpen} className={styles.filterButton}>
        {isMobile ? 'Filter' : 'Advanced Search'}
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby='filter-modal-title'
        aria-describedby='filter-modal-description'
      >
        <Box sx={modalStyle}>
          <h2 id='filter-modal-title'>Filters</h2>
          <div id='filter-modal-description'>{renderFilters()}</div>
          <Button onClick={handleClose} className={styles.applyButton}>
            Apply Filters
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SecondaryNav;
