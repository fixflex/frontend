// Reviews.js
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styles from './ratings.module.css';

const reviewsData = [
  {
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    name: 'Alice Smith',
    comment: 'Great experience, will definitely use it again!',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1611432579699-484f7990b127',
    name: 'Emma Johnson',
    comment: "Outstanding service, I'm impressed!",
  },
  {
    avatar: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50',
    name: 'Michael Brown',
    comment: 'Highly recommended, top-notch service!',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6',
    name: 'Sophia Davis',
    comment: 'Excellent quality and speedy service!',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1595211877493-41a4e5f236b3',
    name: 'William Wilson',
    comment: "Couldn't be happier with their service!",
  },
  {
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    name: 'Olivia Lee',
    comment: 'Impressed with their professionalism!',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
    name: 'Daniel Martinez',
    comment: 'They exceeded my expectations!',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1543949806-2c9935e6aa78',
    name: 'Isabella Johnson',
    comment: 'Fantastic service, highly recommended!',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3',
    name: 'Liam Anderson',
    comment: "The best service I've ever received!",
  },
  {
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    name: 'Sophie Clark',
    comment: 'A truly exceptional experience, Thanks!',
  },
];

const ReviewCard = ({ review }) => {
  const stars = Array(5)
    .fill(null)
    .map((_, index) => <StarIcon key={index} className={styles.star} />);

  return (
    <Card className={styles.card}>
      <CardContent>
        <Box className={styles.rating}>{stars}</Box>
        <Box className={styles.userInfo}>
          <Avatar className={styles.avatar} src={review.avatar} />
          <Typography variant='subtitle2'>{review.name}</Typography>
        </Box>
        <Typography className={styles.comment}>{review.comment}</Typography>
      </CardContent>
    </Card>
  );
};

const Ratings = () => {
  return (
    <Box className={styles.container}>
      <Typography variant='h4' gutterBottom sx={{ mb: 3 }}>
        Here are some of our reviews
      </Typography>
      <Typography variant='subtitle1' gutterBottom sx={{ mb: 5 }}>
        Over 2000+ happy customers recommend Fix Flex
      </Typography>
      <Grid container spacing={2}>
        {reviewsData.map((review, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <ReviewCard review={review} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Ratings;
