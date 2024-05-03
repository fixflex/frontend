import React, { useState } from 'react';
import { Avatar, Box, TextField, Button, Typography } from '@mui/material';
import styles from './chat.module.css';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const chats = [
    {
      id: 5,
      name: 'Sophia Lee',
      messages: [
        { id: 1, text: 'Hey, are you free this weekend?', sender: 'Sophia' },
        { id: 2, text: "Yes, I am. What's up?", sender: 'You' },
      ],
    },
    {
      id: 6,
      name: 'Daniel Garcia',
      messages: [
        {
          id: 1,
          text: "Do you have the notes from yesterday's lecture?",
          sender: 'Daniel',
        },
        { id: 2, text: 'Yes, I can share them with you.', sender: 'You' },
      ],
    },
    {
      id: 7,
      name: 'Olivia Martinez',
      messages: [
        { id: 1, text: 'I need your advice on something.', sender: 'Olivia' },
        {
          id: 2,
          text: "Sure, I'm here to help. What's on your mind?",
          sender: 'You',
        },
      ],
    },
    {
      id: 8,
      name: 'Ethan Nguyen',
      messages: [
        {
          id: 1,
          text: 'Can you pick up some groceries on your way home?',
          sender: 'Ethan',
        },
        { id: 2, text: 'Of course, send me the list.', sender: 'You' },
      ],
    },
    {
      id: 9,
      name: 'Ava Smith',
      messages: [
        {
          id: 1,
          text: 'I heard about your promotion. Congratulations!',
          sender: 'Ava',
        },
        { id: 2, text: 'Thank you! It was unexpected.', sender: 'You' },
      ],
    },
  ];

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const sendMessage = () => {
    if (message) {
      const newMessage = { id: Date.now(), text: message, sender: 'You' };
      setSelectedChat((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, newMessage],
      }));
      setMessage('');
    }
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('');

  return (
    <Box className={styles.chatContainer}>
      <Box className={styles.chatList}>
        {chats.map((chat) => (
          <Box
            key={chat.id}
            className={styles.chatListItem}
            onClick={() => handleSelectChat(chat)}
          >
            <Avatar sx={{ bgcolor: '#1B252E', color: 'white', mr: 2 }}>
              {getInitials(chat.name)}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant='h6' className={styles.chatName}>
                {chat.name}
              </Typography>
              <Typography variant='body2' className={styles.chatLastMessage}>
                {chat.messages[chat.messages.length - 1].text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className={styles.chatDetails}>
        <Box className={styles.chatHeader}>
          <Avatar
            src='https://cdn-icons-png.freepik.com/512/147/147142.png'
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography variant='h6'>{selectedChat.name}</Typography>
        </Box>
        {selectedChat ? (
          <>
            <Box className={styles.messageList}>
              {selectedChat.messages.map((msg, index) => (
                <Box
                  key={index}
                  className={`${styles.message} ${
                    msg.sender === 'You' ? styles.messageSenderYou : ''
                  }`}
                >
                  <Typography className={styles.messageText}>
                    {msg.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: '#F0F2F5',
                borderRadius: '16px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <TextField
                fullWidth
                variant='outlined'
                placeholder='Type a message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  fieldset: { border: 'none' },
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  marginRight: '8px',
                }}
              />
              <Button
                variant='contained'
                color='primary'
                onClick={sendMessage}
                sx={{
                  borderRadius: '16px',
                  textTransform: 'none',
                  boxShadow: 'none',
                  backgroundColor: '#1B252E',
                }}
              >
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant='body1' className={styles.selectChatMessage}>
            Select a chat to view messages.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Chat;
