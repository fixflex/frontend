import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  InputLabel,
} from '@mui/material';
import styles from './offerModal.module.css';

const OfferModal = ({ open, handleClose, handleSubmit }) => {
  const [budget, setBudget] = useState('');
  const [offer, setOffer] = useState('');

  const isBudgetValid = () => {
    return budget > 0 && budget <= 999;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (isBudgetValid()) {
      handleSubmit({ budget, offer });
    } else {
      alert('Budget must be between 1 and 999.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: styles.customWidth }}
    >
      <DialogTitle className={styles.title}>
        Make Your Offer
        <br />
        <span
          style={{ fontSize: '1rem', color: '#252526', fontWeight: 'bold' }}
        >
          Make a proposal that stands out!
        </span>
      </DialogTitle>
      <DialogContent>
        <InputLabel htmlFor='budget' className={styles.label}>
          {' '}
          Set your desired budget
        </InputLabel>

        <TextField
          autoFocus
          margin='dense'
          id='budget'
          label='EG. $400'
          type='number'
          fullWidth
          variant='outlined'
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          inputProps={{ max: 999 }}
        />
        <InputLabel
          htmlFor='offer'
          className={styles.label}
          sx={{ marginTop: '1rem' }}
        >
          {' '}
          Make your offer
        </InputLabel>

        <TextField
          margin='dense'
          id='offer'
          label='EG. I will do your task quickly and efficiently'
          type='text'
          fullWidth
          variant='outlined'
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={styles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={onFormSubmit} className={styles.submitButton}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OfferModal;
