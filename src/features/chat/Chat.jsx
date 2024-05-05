import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Avatar, Box, TextField, Button, Typography } from '@mui/material';
import styles from './chat.module.css';
import baseURL from '../../API/baseURL';
import { useSelector } from 'react-redux';

const socket = io('wss://fixflex.onrender.com', {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const [allChats, setAllChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const messageListRef = useRef(null);
  const selectedChatRef = useRef(selectedChat);

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('joinMyRoom');
      getAllChats();
    });

    socket.on('message', (value) => {
      receiveMessage(value);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);

  const getAllChats = async () => {
    try {
      const response = await baseURL.get('/chats');
      if (response?.data?.results) {
        formatChat(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const formatChat = async (chats) => {
    const transformedChats = await Promise.all(
      chats.map(async (chat) => {
        try {
          const response = await baseURL.get(
            `users/${chat.user === user._id ? chat.tasker : chat.user}`
          );
          const userData = response?.data?.data;
          const recipient = `${userData?.firstName} ${userData?.lastName}`;
          return {
            userid: chat.user,
            taskerId: chat.tasker,
            chatId: chat._id,
            recipient,
            messages: [],
          };
        } catch (error) {
          console.error('Error formatting chat:', error);
        }
      })
    );
    setAllChats(transformedChats);
    const { hash } = window.location;
    if (hash) {
      const chatId = hash.slice(1);
      const chatFound = transformedChats?.find((c) => c.chatId === chatId);
      if (chatFound) {
        handleSelectChat(chatFound);
      }
    }
  };

  const handleSelectChat = async (chat) => {
    if (!chat) return;
    try {
      const response = await baseURL.get(`/messages/chat/${chat.chatId}`);
      socket.emit('joinChatRoom', chat.chatId);
      if (response?.data) {
        const messageData = response.data.data.map((msg) => ({
          ...msg,
          sender:
            msg.sender === user._id
              ? `${user.firstName} ${user.lastName}`
              : chat.recipient,
        }));
        setSelectedChat({ ...chat, messages: messageData });
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const sendMessage = async () => {
    if (message && selectedChat) {
      setMessage('');
      try {
        const response = await baseURL.post('/messages', {
          chatId: selectedChat.chatId,
          message,
        });
        if (response?.data?.data) {
          const messageData = response.data.data;
          const newMessage = {
            ...messageData,
            sender:
              messageData.sender === user._id
                ? `${user.firstName} ${user.lastName}`
                : selectedChat.recipient,
          };
          setSelectedChat((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, newMessage],
          }));
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const receiveMessage = (messageData) => {
    const currentChat = selectedChatRef.current;

    if (messageData.sender === user._id || !currentChat) return;

    if (messageData.chatId !== currentChat.chatId) return;

    const newMessage = {
      ...messageData,
      sender:
        messageData.sender === user._id
          ? `${user.firstName} ${user.lastName}`
          : currentChat.recipient,
    };
    setSelectedChat({
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
    });
  };

  const getInitials = (recipient) =>
    recipient
      .split(' ')
      .map((n) => n[0])
      .join('');

  return (
    <Box className={styles.chatContainer}>
      <Box className={styles.chatList}>
        {allChats.map((chat) => (
          <Box
            key={chat.chatId}
            className={styles.chatListItem}
            onClick={() => handleSelectChat(chat)}
          >
            <Avatar sx={{ bgcolor: '#1B252E', color: 'white', mr: 2 }}>
              {getInitials(chat.recipient)}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant='h6' className={styles.chatName}>
                {chat.recipient}
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
          <Typography variant='h6'>
            {selectedChat && selectedChat.recipient}
          </Typography>
        </Box>
        {selectedChat ? (
          <>
            <Box className={styles.messageList} ref={messageListRef}>
              {selectedChat.messages.map((msg, index) => (
                <Box
                  key={index}
                  className={`${styles.message} ${
                    msg.sender === `${user.firstName} ${user.lastName}`
                      ? styles.messageSenderYou
                      : ''
                  }`}
                >
                  <Typography className={styles.messageText}>
                    {msg.message}
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
