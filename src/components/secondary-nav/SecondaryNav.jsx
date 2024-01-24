import React, { useState } from 'react';
import { InputBase, Button, Checkbox, FormControlLabel } from '@mui/material';
import styles from './secondaryNav.module.css';

const SecondaryNav = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [otherFiltersOpen, setOtherFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Handle dropdown open state
  const toggleCategoryDropdown = () => setCategoryOpen(!categoryOpen);
  const toggleOtherFiltersDropdown = () =>
    setOtherFiltersOpen(!otherFiltersOpen);
  const toggleSortDropdown = () => setSortOpen(!sortOpen);

  // Your categories and other filters state and handlers will go here

  return (
    <div className={styles.secondaryNav}>
      <InputBase
        placeholder='Search for a task'
        className={styles.searchInput}
      />
      <Button
        onClick={toggleCategoryDropdown}
        className={styles.dropdownButton}
      >
        Category ▼
      </Button>
      {categoryOpen && (
        <div className={styles.dropdownContent}>
          <ul className={styles.checkboxList}>
            {/* Map your categories to FormControlLabel + Checkbox here */}
          </ul>
          <Button className={styles.applyButton}>Apply</Button>
        </div>
      )}

      <Button
        onClick={toggleOtherFiltersDropdown}
        className={styles.dropdownButton}
      >
        Other filters (1) ▼
      </Button>
      {otherFiltersOpen && (
        <div className={styles.dropdownContent}>
          {/* Similar structure for other filters */}
        </div>
      )}

      <Button onClick={toggleSortDropdown} className={styles.dropdownButton}>
        Sort ▼
      </Button>
      {sortOpen && (
        <div className={styles.dropdownContent}>
          {/* Similar structure for sort options */}
        </div>
      )}
    </div>
  );
};

export default SecondaryNav;
