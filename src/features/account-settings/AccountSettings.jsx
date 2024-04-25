import { Button, Container, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import styles from './accountSettings.module.css';

const AccountSettings = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: '5px solid #1B252E',
        borderRadius: '25px',
        margin: '8rem 11rem',
        padding: '3rem 1rem',
      }}
    >
      <Typography
        variant='h3'
        className={[styles.animatedText, styles.typographyCustom]}
      >
        How can we help you?
      </Typography>

      <Container>
        <List component='nav' sx={{ padding: '4rem 8rem' }}>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Here's how you can become a tasker at just some few steps!
            </Typography>
            <Button
              href='#'
              variant='contained'
              sx={{
                color: 'white',
                borderRadius: '10px',
                backgroundColor: '#212121',
                '&:hover': {
                  backgroundColor: '#F2CC41',
                },
              }}
            >
              Become A Tasker
            </Button>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Update your Info
            </Typography>
            <Button
              href='#'
              variant='contained'
              sx={{
                color: 'white',
                borderRadius: '10px',
                backgroundColor: '#212121',
                '&:hover': {
                  backgroundColor: '#F2CC41',
                },
              }}
            >
              Edit My Account
            </Button>
          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              We're sad to see you go
            </Typography>
            <Button
              href='#'
              variant='contained'
              sx={{
                color: 'white',
                borderRadius: '10px',
                backgroundColor: '#CC282F',
                '&:hover': {
                  backgroundColor: '#F2CC41',
                },
              }}
            >
              Delete Account
            </Button>
          </ListItem>
        </List>
      </Container>
    </Container>
  );
};

export default AccountSettings;
