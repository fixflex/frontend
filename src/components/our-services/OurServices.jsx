import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  ElectricalServices,
  Plumbing,
  CarpenterOutlined,
  CleaningServicesOutlined,
  HomeRepairServiceOutlined,
  BathtubOutlined,
  GridViewOutlined,
  FormatPaintOutlined,
  MeetingRoomOutlined,
  HighlightAltOutlined,
} from '@mui/icons-material';
import styles from './services.module.css';

const services = [
  {
    icon: <ElectricalServices className={styles.taskIcon} />,
    text: 'Electrical',
  },
  { icon: <Plumbing className={styles.taskIcon} />, text: 'Plumbing' },
  {
    icon: <CarpenterOutlined className={styles.taskIcon} />,
    text: 'Carpentry',
  },
  {
    icon: <CleaningServicesOutlined className={styles.taskIcon} />,
    text: 'Cleaning',
  },
  {
    icon: <HomeRepairServiceOutlined className={styles.taskIcon} />,
    text: 'General Repairs',
  },
  { icon: <GridViewOutlined className={styles.taskIcon} />, text: 'Flooring' },
  {
    icon: <BathtubOutlined className={styles.taskIcon} />,
    text: 'Bathroom Renovations',
  },
  {
    icon: <FormatPaintOutlined className={styles.taskIcon} />,
    text: 'Painting and Wall Finishes',
  },
  {
    icon: <MeetingRoomOutlined className={styles.taskIcon} />,
    text: 'Windows and Doors installation',
  },
  {
    icon: <HighlightAltOutlined className={styles.taskIcon} />,
    text: 'Interior Design',
  },
];

const OurServices = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }} className={styles.servicesContainer}>
      <Typography
        variant='h4'
        gutterBottom
        sx={{ mb: 3 }}
        className={styles.browseTitle}
      >
        Browse Our services by category
      </Typography>
      <Typography variant='subtitle1' gutterBottom sx={{ mb: 5 }}>
        Get an offer from 1800+ handymen available
      </Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2.4}
            key={index}
            sx={{ textAlign: 'center', p: 4 }}
            className={styles.fadeIn}
          >
            {service.icon}
            <Typography variant='body1' sx={{ mt: 1, mb: 1 }}>
              {service.text}
            </Typography>
            <Typography variant='caption'>1.853 skills</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurServices;
