import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Stack,
  Fade,
  Typography } from
'@mui/material';
import {
  Send as SendIcon,
  SmartToy as SmartToyIcon,
  Person as PersonIcon } from
'@mui/icons-material';
type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
};
const SUGGESTIONS = [
'What should I eat for breakfast?',
'How much protein do I need?',
'Healthy snack ideas',
'Tell me about vitamins'];

export function ChatbotShowcase() {
  const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    text: "Hi there! I'm NutriBot 🌱. I can help you with meal ideas, macro tracking, or general nutrition advice. What's on your mind today?",
    sender: 'bot'
  }]
  );
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const generateBotResponse = (input: string) => {
    const lower = input.toLowerCase();
    if (lower.includes('protein')) {
      return "Protein is essential for muscle repair and keeping you full! Good sources include lean meats, tofu, lentils, and Greek yogurt. Aim for about 0.8-1g per pound of body weight if you're active. Want some high-protein recipe ideas?";
    }
    if (lower.includes('calories')) {
      return "To manage weight effectively, it's helpful to understand your Total Daily Energy Expenditure (TDEE). A safe caloric deficit for weight loss is usually 300-500 calories below your TDEE. Should we calculate yours?";
    }
    if (
    lower.includes('meal') ||
    lower.includes('recipe') ||
    lower.includes('breakfast') ||
    lower.includes('lunch') ||
    lower.includes('dinner') ||
    lower.includes('snack'))
    {
      return "How about a quinoa bowl with roasted sweet potatoes, black beans, avocado, and a lime-tahini dressing? It's packed with fiber, healthy fats, and complex carbs. Takes about 25 mins to make!";
    }
    if (lower.includes('vitamin')) {
      return "Vitamins are crucial! For example, Vitamin D supports bone health and immunity (found in fatty fish and fortified dairy), while Vitamin C aids iron absorption (found in citrus and bell peppers). Any specific vitamin you're curious about?";
    }
    if (lower.includes('weight') || lower.includes('diet')) {
      return 'A balanced diet is key to sustainable weight management. Focus on whole foods: lean proteins, plenty of vegetables, complex carbs, and healthy fats. Avoid restrictive diets—consistency is what matters most!';
    }
    return "That's a great question! As your nutrition assistant, I can help you build better eating habits step-by-step. Could you tell me a bit more about your current goals?";
  };
  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user'
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(text),
        sender: 'bot'
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          height: {
            xs: '500px',
            md: '600px'
          },
          bgcolor: '#FAFAFA'
        }}>
        
        {/* Chat Header */}
        <Box
          sx={{
            bgcolor: '#4CAF50',
            color: 'white',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
          
          <Avatar
            sx={{
              bgcolor: 'white',
              color: '#4CAF50'
            }}>
            
            <SmartToyIcon />
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                lineHeight: 1.2
              }}>
              
              NutriBot
            </Typography>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.9
              }}>
              
              Online • Replies instantly
            </Typography>
          </Box>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
          
          {messages.map((msg) =>
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent:
              msg.sender === 'user' ? 'flex-end' : 'flex-start',
              gap: 1.5
            }}>
            
              {msg.sender === 'bot' &&
            <Avatar
              sx={{
                bgcolor: '#E8F5E9',
                color: '#4CAF50',
                width: 32,
                height: 32
              }}>
              
                  <SmartToyIcon fontSize="small" />
                </Avatar>
            }
              <Paper
              elevation={0}
              sx={{
                p: 2,
                maxWidth: '75%',
                borderRadius:
                msg.sender === 'user' ?
                '20px 20px 4px 20px' :
                '20px 20px 20px 4px',
                bgcolor: msg.sender === 'user' ? '#00897B' : 'white',
                color: msg.sender === 'user' ? 'white' : '#2E7D32',
                border:
                msg.sender === 'bot' ?
                '1px solid rgba(0,0,0,0.05)' :
                'none'
              }}>
              
                <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5
                }}>
                
                  {msg.text}
                </Typography>
              </Paper>
              {msg.sender === 'user' &&
            <Avatar
              sx={{
                bgcolor: '#00897B',
                width: 32,
                height: 32
              }}>
              
                  <PersonIcon fontSize="small" />
                </Avatar>
            }
            </Box>
          )}

          {isTyping &&
          <Fade in={isTyping}>
              <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'center'
              }}>
              
                <Avatar
                sx={{
                  bgcolor: '#E8F5E9',
                  color: '#4CAF50',
                  width: 32,
                  height: 32
                }}>
                
                  <SmartToyIcon fontSize="small" />
                </Avatar>
                <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: '20px 20px 20px 4px',
                  bgcolor: 'white',
                  border: '1px solid rgba(0,0,0,0.05)',
                  display: 'flex',
                  gap: 0.5,
                  alignItems: 'center'
                }}>
                
                  <Box
                  sx={{
                    width: 6,
                    height: 6,
                    bgcolor: '#A5D6A7',
                    borderRadius: '50%',
                    animation: 'nutriPulse 1.5s infinite ease-in-out'
                  }} />
                
                  <Box
                  sx={{
                    width: 6,
                    height: 6,
                    bgcolor: '#A5D6A7',
                    borderRadius: '50%',
                    animation: 'nutriPulse 1.5s infinite ease-in-out 0.2s'
                  }} />
                
                  <Box
                  sx={{
                    width: 6,
                    height: 6,
                    bgcolor: '#A5D6A7',
                    borderRadius: '50%',
                    animation: 'nutriPulse 1.5s infinite ease-in-out 0.4s'
                  }} />
                
                </Paper>
              </Box>
            </Fade>
          }
          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <Box
          sx={{
            p: 2,
            bgcolor: 'white',
            borderTop: '1px solid rgba(0,0,0,0.08)'
          }}>
          
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 2,
              overflowX: 'auto',
              pb: 0.5,
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}>
            
            {SUGGESTIONS.map((suggestion, idx) =>
            <Chip
              key={idx}
              label={suggestion}
              onClick={() => handleSend(suggestion)}
              sx={{
                bgcolor: '#E8F5E9',
                color: '#2E7D32',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#C8E6C9',
                  transform: 'translateY(-1px)'
                }
              }} />

            )}
          </Stack>
          <Box
            sx={{
              display: 'flex',
              gap: 1
            }}>
            
            <TextField
              fullWidth
              placeholder="Ask about nutrition, meals, or calories..."
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(inputValue);
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                  bgcolor: '#FAFAFA'
                }
              }} />
            
            <IconButton
              color="primary"
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              sx={{
                bgcolor: '#4CAF50',
                color: 'white',
                width: 56,
                height: 56,
                '&:hover': {
                  bgcolor: '#43A047'
                },
                '&.Mui-disabled': {
                  bgcolor: '#E0E0E0',
                  color: '#9E9E9E'
                }
              }}
              aria-label="Send message">
              
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      <style>
        {`
          @keyframes nutriPulse {
            0%, 100% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </>);

}