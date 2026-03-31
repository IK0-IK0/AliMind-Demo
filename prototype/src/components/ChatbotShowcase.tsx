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
  Typography,
  Button,
  Alert,
  Divider,
  LinearProgress } from
'@mui/material';
import {
  Send as SendIcon,
  SmartToy as SmartToyIcon,
  Person as PersonIcon,
  RestartAlt as RestartAltIcon } from
'@mui/icons-material';
import { processChatMessage, ChatbotResponse } from '../services/chatbotService';
import { TPBScores } from '../services/tpbInference';
import { TTMStage } from '../services/ttmInference';
import {
  initializeQuestionnaire,
  answerQuestion,
  getCurrentQuestion,
  getProgress,
  getQuestionNumberDisplay,
  calculateInterimScores,
  QuestionnaireState
} from '../services/questionnaireService';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  metadata?: {
    tpbScores?: TPBScores;
    ttmStage?: TTMStage;
    interventionMode?: string;
  };
};

type ChatbotShowcaseProps = {
  onResetSession?: () => void;
  initialTPBScores?: TPBScores;
  initialTTMStage?: TTMStage;
  onQuestionnaireStart?: () => void;
  isFullscreen?: boolean;
  onBackToHome?: () => void;
};

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: "Hi there! I'm NutriBot 🌱. Before we start, I'd like to ask you 20 questions to better understand your situation and readiness for change. This will help me provide personalized guidance. Ready to begin?",
  sender: 'bot'
};



export function ChatbotShowcase({ onResetSession, initialTPBScores, initialTTMStage, onQuestionnaireStart, isFullscreen = false, onBackToHome }: ChatbotShowcaseProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTPBScores, setCurrentTPBScores] = useState<TPBScores | null>(initialTPBScores || null);
  const [currentTTMStage, setCurrentTTMStage] = useState<TTMStage | null>(initialTTMStage || null);
  const [questionnaireState, setQuestionnaireState] = useState<QuestionnaireState | null>(null);
  const [waitingForStart, setWaitingForStart] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setCurrentTPBScores(null);
    setCurrentTTMStage(null);
    setInputValue('');
    setQuestionnaireState(null);
    setWaitingForStart(true);
    if (onResetSession) {
      onResetSession();
    }
  };

  const startQuestionnaire = () => {
    setWaitingForStart(false);
    const qState = initializeQuestionnaire();
    setQuestionnaireState(qState);
    
    // Trigger fullscreen animation
    if (onQuestionnaireStart) {
      onQuestionnaireStart();
    }
    
    // Ask first question after animation
    setTimeout(() => {
      const firstQuestion = getCurrentQuestion(qState);
      if (firstQuestion) {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: `Great! Let's begin.\n\n${getQuestionNumberDisplay(qState)}: ${firstQuestion.text}`,
          sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
      }
    }, 500);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user'
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Check if waiting for user to start questionnaire
    if (waitingForStart) {
      const lowerText = text.toLowerCase();
      if (lowerText.includes('yes') || lowerText.includes('ready') || lowerText.includes('start') || lowerText.includes('begin')) {
        setTimeout(() => {
          startQuestionnaire();
          setIsTyping(false);
        }, 500);
        return;
      } else {
        setTimeout(() => {
          const botMessage: Message = {
            id: Date.now().toString(),
            text: "No problem! Just let me know when you're ready to start by typing 'yes' or 'ready'.",
            sender: 'bot'
          };
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
        }, 500);
        return;
      }
    }

    // Handle questionnaire flow
    if (questionnaireState && questionnaireState.isActive) {
      const currentQuestion = getCurrentQuestion(questionnaireState);
      if (currentQuestion) {
        // Process answer
        const newState = answerQuestion(questionnaireState, currentQuestion.id, text);
        setQuestionnaireState(newState);
        
        // Update interim scores in real-time
        const interimScores = calculateInterimScores(newState);
        if (interimScores.tpbScores) {
          setCurrentTPBScores(interimScores.tpbScores);
        }
        if (interimScores.ttmStage) {
          setCurrentTTMStage(interimScores.ttmStage);
        }

        setTimeout(() => {
          if (newState.isComplete) {
            // Questionnaire complete - DON'T show recipes yet
            setCurrentTPBScores(newState.tpbScores);
            setCurrentTTMStage(newState.ttmStage);
            
            const completionMessage: Message = {
              id: Date.now().toString(),
              text: `Thank you for completing the questionnaire! 🎉\n\nI now have a good understanding of your situation:\n\n📊 Your Profile:\n- Attitude: ${newState.tpbScores?.attitude}/100\n- Social Support: ${newState.tpbScores?.subjectiveNorm}/100\n- Confidence: ${newState.tpbScores?.perceivedControl}/100\n- Readiness Stage: ${newState.ttmStage?.description}\n\nHow can I help you with your nutrition goals today?`,
              sender: 'bot',
              metadata: {
                tpbScores: newState.tpbScores || undefined,
                ttmStage: newState.ttmStage || undefined
              }
            };
            setMessages(prev => [...prev, completionMessage]);
          } else {
            // Ask next question
            const nextQuestion = getCurrentQuestion(newState);
            if (nextQuestion) {
              const botMessage: Message = {
                id: Date.now().toString(),
                text: `${getQuestionNumberDisplay(newState)}: ${nextQuestion.text}`,
                sender: 'bot'
              };
              setMessages(prev => [...prev, botMessage]);
            }
          }
          setIsTyping(false);
        }, 800);
        return;
      }
    }

    // Normal chat flow (after questionnaire) - NOW with personalized responses
    const delay = 1000 + Math.random() * 1000;
    
    setTimeout(() => {
      try {
        // Use current TPB/TTM scores if available, otherwise infer from message
        const response: ChatbotResponse = processChatMessage(text);
        
        // Update scores only if they changed (from message inference)
        if (!currentTPBScores) {
          setCurrentTPBScores(response.tpbScores);
        }
        if (!currentTTMStage) {
          setCurrentTTMStage(response.ttmStage);
        }

        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: response.message,
          sender: 'bot',
          metadata: {
            tpbScores: currentTPBScores || response.tpbScores,
            ttmStage: currentTTMStage || response.ttmStage,
            interventionMode: response.interventionMode
          }
        };
        setMessages((prev) => [...prev, botResponse]);
      } catch (error) {
        console.error('Error processing message:', error);
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I apologize, but I encountered an error processing your message. Please try again.',
          sender: 'bot'
        };
        setMessages((prev) => [...prev, errorResponse]);
      } finally {
        setIsTyping(false);
      }
    }, delay);
  };
  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        gap: isFullscreen ? 0 : 2, 
        flexDirection: { xs: 'column', lg: 'row' }, 
        flex: 1, 
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Main Chat Interface */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: isFullscreen ? 0 : 2,
            overflow: 'hidden',
            border: isFullscreen ? 'none' : '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flex: 1,
            bgcolor: '#FAFAFA'
          }}>
          
          {/* Chat Header */}
          <Box
            sx={{
              bgcolor: '#4CAF50',
              color: 'white',
              p: { xs: 1.5, sm: 2 },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 2 }
            }}>
            
            <Avatar
              sx={{
                bgcolor: 'white',
                color: '#4CAF50',
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 }
              }}>
              
              <SmartToyIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                
                NutriBot
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  display: { xs: 'none', sm: 'block' }
                }}>
                
                TPB/TTM-Based Nutrition Assistant
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isFullscreen && onBackToHome && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<RestartAltIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
                  onClick={onBackToHome}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                    px: { xs: 1, sm: 2 },
                    minWidth: { xs: 'auto', sm: 'auto' },
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Back to Home</Box>
                  <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Back</Box>
                </Button>
              )}
              <Button
                variant="outlined"
                size="small"
                startIcon={<RestartAltIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
                onClick={handleReset}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                  px: { xs: 1, sm: 2 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Reset Session</Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Reset</Box>
              </Button>
            </Box>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: { xs: 2, sm: 3 },
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
                gap: { xs: 1, sm: 1.5 }
              }}>
              
                {msg.sender === 'bot' &&
              <Avatar
                sx={{
                  bgcolor: '#E8F5E9',
                  color: '#4CAF50',
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 }
                }}>
                
                    <SmartToyIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                  </Avatar>
              }
                <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  maxWidth: { xs: '80%', sm: '75%' },
                  borderRadius:
                  msg.sender === 'user' ?
                  '12px 12px 4px 12px' :
                  '12px 12px 12px 4px',
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
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                  
                    {msg.text}
                  </Typography>
                </Paper>
                {msg.sender === 'user' &&
              <Avatar
                sx={{
                  bgcolor: '#00897B',
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 }
                }}>
                
                    <PersonIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
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
                    borderRadius: '12px 12px 12px 4px',
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
              p: { xs: 1.5, sm: 2 },
              bgcolor: 'white',
              borderTop: '1px solid rgba(0,0,0,0.08)'
            }}>
            
            <Box
              sx={{
                display: 'flex',
                gap: 1
              }}>
              
              <TextField
                fullWidth
                placeholder="Tell me about your eating habits or nutrition goals..."
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputValue);
                  }
                }}
                disabled={isTyping}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: '#FAFAFA',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  },
                  '& .MuiInputBase-input': {
                    py: { xs: 1.5, sm: 2 }
                  }
                }} />
              
              <IconButton
                color="primary"
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                sx={{
                  bgcolor: '#4CAF50',
                  color: 'white',
                  width: { xs: 48, sm: 56 },
                  height: { xs: 48, sm: 56 },
                  '&:hover': {
                    bgcolor: '#43A047'
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#E0E0E0',
                    color: '#9E9E9E'
                  }
                }}
                aria-label="Send message">
                
                <SendIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Sidebar Panel - TPB/TTM Scores */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: isFullscreen ? 0 : 2,
            p: { xs: 2, sm: 3 },
            width: { xs: '100%', lg: '350px' },
            height: '100%',
            border: isFullscreen ? 'none' : '1px solid rgba(0,0,0,0.08)',
            borderLeft: isFullscreen ? '1px solid rgba(0,0,0,0.08)' : undefined,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflow: 'auto'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2E7D32', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Your Profile
          </Typography>

          <Divider />

          {/* Questionnaire Progress */}
          {questionnaireState && questionnaireState.isActive && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#555' }}>
                Questionnaire Progress
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                {getQuestionNumberDisplay(questionnaireState)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getProgress(questionnaireState)}
                sx={{
                  mt: 1,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#E0E0E0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#4CAF50'
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 600, mt: 0.5, display: 'block' }}>
                {getProgress(questionnaireState)}% Complete
              </Typography>
            </Box>
          )}

          {questionnaireState && questionnaireState.isActive && <Divider />}

          {/* TTM Stage */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#555' }}>
              Readiness Stage (TTM)
            </Typography>
            {currentTTMStage ? (
              <Box>
                <Chip
                  label={currentTTMStage.description}
                  sx={{
                    bgcolor: '#E8F5E9',
                    color: '#2E7D32',
                    fontWeight: 600,
                    mb: 1,
                    width: '100%',
                    justifyContent: 'flex-start'
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Stage Progress
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {(() => {
                      const stageMap: Record<string, number> = {
                        'preContemplation': 20,
                        'contemplation': 40,
                        'preparation': 60,
                        'action': 80,
                        'maintenance': 100
                      };
                      return stageMap[currentTTMStage.stage] || 0;
                    })()}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(() => {
                    const stageMap: Record<string, number> = {
                      'preContemplation': 20,
                      'contemplation': 40,
                      'preparation': 60,
                      'action': 80,
                      'maintenance': 100
                    };
                    return stageMap[currentTTMStage.stage] || 0;
                  })()}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: '#E0E0E0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#4CAF50'
                    }
                  }}
                />
                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem', display: 'block', mt: 0.5 }}>
                  Confidence: {currentTTMStage.confidence}%
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: '#999', fontStyle: 'italic' }}>
                Start chatting to see your readiness stage
              </Typography>
            )}
          </Box>

          <Divider />

          {/* TPB Scores */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
              Behavioral Factors (TPB)
            </Typography>
            {currentTPBScores ? (
              <Stack spacing={2}>
                {/* Attitude */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Attitude
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {currentTPBScores.attitude}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={currentTPBScores.attitude}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: currentTPBScores.attitude >= 67 ? '#4CAF50' : currentTPBScores.attitude >= 34 ? '#FFA726' : '#EF5350'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                    How you feel about healthy eating
                  </Typography>
                </Box>

                {/* Subjective Norm */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Subjective Norm
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {currentTPBScores.subjectiveNorm}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={currentTPBScores.subjectiveNorm}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: currentTPBScores.subjectiveNorm >= 67 ? '#4CAF50' : currentTPBScores.subjectiveNorm >= 34 ? '#FFA726' : '#EF5350'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                    Support from family and friends
                  </Typography>
                </Box>

                {/* Perceived Control */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Perceived Behavioral Control
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {currentTPBScores.perceivedControl}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={currentTPBScores.perceivedControl}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: currentTPBScores.perceivedControl >= 67 ? '#4CAF50' : currentTPBScores.perceivedControl >= 34 ? '#FFA726' : '#EF5350'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                    Your ability to make changes
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* Overall TPB Confidence */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      Overall Confidence
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      {currentTPBScores.confidence}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={currentTPBScores.confidence}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: currentTPBScores.confidence >= 67 ? '#4CAF50' : currentTPBScores.confidence >= 34 ? '#FFA726' : '#EF5350'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                    Average of all behavioral factors
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ color: '#999', fontStyle: 'italic' }}>
                Start chatting to see your behavioral profile
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 'auto' }}>
            <Divider sx={{ mb: 2 }} />
            <Alert severity="warning" sx={{ fontSize: '0.75rem' }}>
              <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, mb: 0.5 }}>
                Disclaimer
              </Typography>
              <Typography variant="caption">
                This advice is for informational purposes only and is not medical guidance. Please consult with a healthcare professional for personalized advice.
              </Typography>
            </Alert>
          </Box>
        </Paper>
      </Box>

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