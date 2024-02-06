import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  TextField,
  FormControlLabel,
  Button,
  RadioGroup,
  FormControl,
  Radio,
  Divider,
} from '@mui/material';
import styles from './postTask.module.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Typography variant='h6' sx={{ mt: 1 }} className={styles.topTitle}>
        Let's start with the basics!
      </Typography>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function PostTask() {
  const [value, setValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const totalSteps = 4;

  const handleNext = () => {
    if (value < totalSteps - 1) {
      setValue(value + 1);
    }
  };

  const handleBack = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const isStepComplete = () => {
    // Here, you should check for the validity of the current step before allowing to proceed.
    // This function must be implemented based on your form validation logic.
    return true; // Placeholder logic
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        height: 'auto',
        bgcolor: 'background.paper',
      }}
      className={styles.tabContainer}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        aria-label='Vertical tabs'
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className={styles.tabTitle}
      >
        <Tab
          label='Title & Date'
          {...a11yProps(0)}
          className={styles.tabButton}
        />
        <Tab label='Location' {...a11yProps(1)} className={styles.tabButton} />
        <Tab label='Details' {...a11yProps(2)} className={styles.tabButton} />
        <Tab label='Budget' {...a11yProps(3)} className={styles.tabButton} />
      </Tabs>
      <Box sx={{ width: '60%' }}>
        <TabPanel value={value} index={0} className={styles.titleTab}>
          <Typography variant='h6' className={styles.tabTitle}>
            In a few words, what do you need done?{' '}
          </Typography>
          <TextField
            fullWidth
            label='Eg: I need to move my sofa'
            variant='outlined'
            margin='normal'
            className={styles.taskTitle}
          />

          <Box>
            <Typography variant='h6' sx={{ mt: 1 }} className={styles.tabTitle}>
              When do you need this done?
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin: '2rem 0',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Select date'
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Divider
                orientation='vertical'
                flexItem
                textAlign='center'
                sx={{ fontSize: '0.8rem', margin: '0 1rem' }}
              >
                OR
              </Divider>
              <Button
                variant='outlined'
                className={styles.flexButton}
                onClick={() => {
                  // Handle the 'I'm flexible' logic here
                  console.log("User indicated they're flexible with the date");
                }}
              >
                I'm flexible
              </Button>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant='h6'>Provide more details</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label='Write a summary of the key details'
            variant='outlined'
            margin='normal'
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant='h6'>Tell us where</Typography>
          <FormControl component='fieldset'>
            <RadioGroup row>
              <FormControlLabel
                value='in-person'
                control={<Radio />}
                label='In-person'
              />
              <FormControlLabel
                value='online'
                control={<Radio />}
                label='Online'
              />
            </RadioGroup>
          </FormControl>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography variant='h6'>Suggest your budget</Typography>
          <TextField
            fullWidth
            label='What is your budget?'
            variant='outlined'
            margin='normal'
            InputProps={{
              startAdornment: <Typography variant='h6'>$</Typography>,
            }}
          />
        </TabPanel>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color='inherit'
            disabled={value === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            variant='contained'
            onClick={handleNext}
            disabled={value === totalSteps - 1 || !isStepComplete()}
          >
            {value === totalSteps - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
