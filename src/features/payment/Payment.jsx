import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import styles from './payment.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import baseURL from '../../API/baseURL';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(3),
}));

const Payment = () => {
  const [paymentType, setPaymentType] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cardName, setCardName] = useState('');
  const [cashOption, setCashOption] = useState(false);
  const [offerId, setOfferId] = useState('');
  const [taskerId, setTaskerId] = useState('');
  const [taskId, setTaskId] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (
      !searchParams.get('offer') ||
      !searchParams.get('tasker') ||
      !searchParams.get('task')
    ) {
      navigate(-1);
    }
    setOfferId(searchParams.get('offer'));
    setTaskerId(searchParams.get('tasker'));
    setTaskId(searchParams.get('task'));
  }, [location.search, navigate]);

  console.log(paymentType);

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  const handleCashOptionChange = (event) => {
    const checked = event.target.checked;
    setCashOption(checked);
    setPaymentType(checked ? 'cash' : 'card');
  };

  const handleSubmit = async () => {
    if (!user?.phoneNumber) return;

    try {
      await baseURL.patch(`/offers/${offerId}/accept`);
      if (paymentType === 'card') {
        const response = await baseURL.patch(`/tasks/checkout/${taskId}`, {
          phoneNumber: user.phoneNumber,
          paymentMethod: 'card',
        });

        console.log('url ? : ', response);
        window.open(response?.data?.data, '_blank');
      }
      const response = await baseURL.post(`/chats`, { tasker: taskerId });
      console.log(response);
      if (response?.data?.data) {
        navigate(`/chat`);
      }
    } catch (error) {
      console.error('Error Message:', error);
    }
  };

  const isFormValid =
    (cardNumber && cvv && expirationDate && cardName) || cashOption;

  return (
    <CenteredBox>
      <Card
        className={styles.card}
        sx={{
          width: '100%',
          padding: 3,
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 3px 10px rgb(0 0 0 / 20%)',
          margin: '1rem 0',
        }}
      >
        <Typography
          variant='h6'
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          Payment Information
        </Typography>
        <FormControl component='fieldset' fullWidth>
          <Stack spacing={3}>
            <FormGrid className={styles.formControl}>
              <FormControl fullWidth>
                <FormLabel htmlFor='card-number'>Card number</FormLabel>
                <OutlinedInput
                  id='card-number'
                  placeholder='0000 0000 0000 0000'
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  disabled={cashOption}
                />
              </FormControl>
            </FormGrid>
            <FormGrid className={styles.formControl}>
              <FormControl fullWidth>
                <FormLabel htmlFor='card-name'>Name</FormLabel>
                <OutlinedInput
                  id='card-name'
                  placeholder='John Smith'
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  disabled={cashOption}
                />
              </FormControl>
            </FormGrid>
            <Box className={styles.box} sx={{ display: 'flex', gap: 2 }}>
              <FormGrid className={styles.formControl} sx={{ flexGrow: 1 }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor='card-expiration'>
                    Expiration date
                  </FormLabel>
                  <OutlinedInput
                    id='card-expiration'
                    placeholder='MM/YY'
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                    disabled={cashOption}
                  />
                </FormControl>
              </FormGrid>
              <FormGrid className={styles.formControl} sx={{ maxWidth: '20%' }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor='cvv'>CVV</FormLabel>
                  <OutlinedInput
                    id='cvv'
                    placeholder='123'
                    value={cvv}
                    onChange={handleCvvChange}
                    disabled={cashOption}
                  />
                </FormControl>
              </FormGrid>
            </Box>
            <Divider>or</Divider>
            <FormControlLabel
              control={
                <Checkbox
                  checked={cashOption}
                  onChange={handleCashOptionChange}
                  sx={{
                    color: cashOption ? '#E5BC32' : 'inherit',
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Pay with cash
                </Box>
              }
              sx={{
                backgroundColor: 'inherit',
                padding: 1,
                borderRadius: 1,
              }}
            />
            <Button
              className={styles.button}
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              disabled={!isFormValid}
              sx={{ backgroundColor: '#1B252E', borderRadius: '10px' }}
            >
              Submit Payment
            </Button>
          </Stack>
        </FormControl>
      </Card>
    </CenteredBox>
  );
};

export default Payment;
