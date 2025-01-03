import { Box } from '@mui/material'
import TextField from '@mui/material/TextField';
import { useEffect, useRef } from 'react';

const ChatRoom = () => {
  const messageContainerRef = useRef<HTMLElement>()

  const messages = [
    {
      id: 1,
      created_at: new Date(),
      message: "Hello, how are you?",
      sender_name: "Alice"
    },
    {
      id: 2,
      created_at: new Date(),
      message: "I'm good, thanks! How about you?",
      sender_name: "Bob"
    },
    {
      id: 3,
      created_at: new Date(),
      message: "I'm doing well, thank you!",
      sender_name: "Alice"
    },
    {
      id: 4,
      created_at: new Date(),
      message: "Hello, how are you?",
      sender_name: "Alice"
    },
    {
      id: 5,
      created_at: new Date(),
      message: "I'm good, thanks! How about you?",
      sender_name: "Bob"
    },
    {
      id: 6,
      created_at: new Date(),
      message: "I'm doing well, thank you!",
      sender_name: "Alice"
    },
    {
      id: 7,
      created_at: new Date(),
      message: "Hello, how are you?",
      sender_name: "Alice"
    },
    {
      id: 8,
      created_at: new Date(),
      message: "I'm good, thanks! How about you?",
      sender_name: "Bob"
    },
    {
      id: 9,
      created_at: new Date(),
      message: "I'm doing well, thank you!",
      sender_name: "Alice"
    },
    {
      id: 10,
      created_at: new Date(),
      message: "Hello, how are you?",
      sender_name: "Alice"
    },
    {
      id: 11,
      created_at: new Date(),
      message: "I'm good, thanks! How about you?",
      sender_name: "Bob"
    },
    {
      id: 12,
      created_at: new Date(),
      message: "I'm doing well, thank you!",
      sender_name: "Alice"
    },
    {
      id: 13,
      created_at: new Date(),
      message: "Hello, how are you?",
      sender_name: "Alice"
    },
    {
      id: 14,
      created_at: new Date(),
      message: "I'm good, thanks! How about you?",
      sender_name: "Bob"
    },
    {
      id: 15,
      created_at: new Date(),
      message: "I'm doing well, thank you!",
      sender_name: "Alice"
    },
    {
      id: 16,
      created_at: new Date(),
      message: "Hello, how are you?",
      sender_name: "Alice"
    },
    {
      id: 17,
      created_at: new Date(),
      message: "I'm good, thanks! How about you?",
      sender_name: "Bob"
    },
    {
      id: 18,
      created_at: new Date(),
      message: "I'm doing well, thank you!",
      sender_name: "Alice"
    },
  ]

  useEffect(() => {
    if (messageContainerRef && messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [])

  return (
    <Box className="flex flex-col justify-end h-full p-4">
      <Box className='overflow-y-auto h-[90%]' ref={messageContainerRef}>
        {messages.map((message) => (
          <Box key={message.id} className='bg-gray-200 p-2 rounded-lg mb-2'>
            <p className='text-sm font-semibold'>{message.sender_name} {message.id}</p>
            <p>{message.message}</p>
          </Box>
        ))}
      </Box>
        <TextField
            className='w-[98%]'
            id="outlined-required"
            defaultValue="Hello World"
        />
    </Box>
  )
}

export default ChatRoom