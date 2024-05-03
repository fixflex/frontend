import React, { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PlaceIcon from '@mui/icons-material/Place';
import styles from './chat.module.css';

const ChatComponent = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const chats = [
    {
      id: 1,
      name: 'Alice Smith',
      lastMessage: 'Hey, how are you?',
      location: 'Flexible',
    },
    {
      id: 2,
      name: 'John Doe',
      lastMessage: 'Project update?',
      location: 'Cairo',
    },
    // More chats can be added here
  ];

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <Box className={styles.chatContainer}>
      <Box className={styles.chatList}>
        {chats.map((chat) => (
          <Card
            key={chat.id}
            className={styles.chatCard}
            onClick={() => handleSelectChat(chat)}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                className={styles.chatCardTitle}
              >
                {chat.name}
              </Typography>
              <Box
                sx={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}
              >
                <PersonIcon />
                <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                  {chat.lastMessage}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PlaceIcon />
                <Typography variant='body2' ml={2} sx={{ fontWeight: 'bold' }}>
                  {chat.location}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box className={styles.chatDetails}>
        {selectedChat ? (
          <Card elevation={3} className={styles.chatPaper}>
            <Typography variant='h5'>{selectedChat.name}</Typography>
            <Typography variant='body2'>{selectedChat.lastMessage}</Typography>
          </Card>
        ) : (
          <Typography variant='body1' className={styles.selectChatMessage}>
            Select a chat to view messages.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatComponent;
