import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Fade,
  Stack,
  Chip
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import {
  initializeQuestionnaire,
  answerQuestion,
  getCurrentQuestion,
  getProgress,
  QuestionnaireState,
  ALL_QUESTIONS
} from '../services/questionnaireService';

type QuestionnaireFlowProps = {
  onComplete: (state: QuestionnaireState) => void;
};

export function QuestionnaireFlow({ onComplete }: QuestionnaireFlowProps) {
  const [state, setState] = useState<QuestionnaireState>(initializeQuestionnaire());
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showQuestion, setShowQuestion] = useState(true);

  const currentQuestion = getCurrentQuestion(state);
  const progress = getProgress(state);

  const handleAnswer = () => {
    if (!currentQuestion || !selectedValue) return;

    const value = parseInt(selectedValue);
    
    // Animate out
    setShowQuestion(false);
    
    setTimeout(() => {
      const newState = answerQuestion(state, currentQuestion.id, value);
      setState(newState);
      setSelectedValue('');
      
      if (newState.isComplete) {
        onComplete(newState);
      } else {
        setShowQuestion(true);
      }
    }, 300);
  };

  const getQuestionTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'tpb-attitude': 'Attitude',
      'tpb-subjective-norm': 'Social Support',
      'tpb-perceived-control': 'Confidence',
      'ttm': 'Readiness Stage'
    };
    return labels[type] || type;
  };

  const getQuestionTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      'tpb-attitude': '#FF6B6B',
      'tpb-subjective-norm': '#4ECDC4',
      'tpb-perceived-control': '#95E1D3',
      'ttm': '#FFA07A'
    };
    return colors[type] || '#4CAF50';
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '600px',
        p: 3
      }}
    >
      {/* Progress Bar */}
      <Box sx={{ width: '100%', maxWidth: 600, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>
            Question {state.currentQuestionIndex + 1} of {ALL_QUESTIONS.length}
          </Typography>
          <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 600 }}>
            {progress}% Complete
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: '#E0E0E0',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#4CAF50',
              borderRadius: 4
            }
          }}
        />
      </Box>

      {/* Question Card */}
      <Fade in={showQuestion} timeout={300}>
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 600,
            p: 4,
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.08)'
          }}
        >
          {/* Question Type Badge */}
          <Chip
            label={getQuestionTypeLabel(currentQuestion.type)}
            sx={{
              bgcolor: getQuestionTypeColor(currentQuestion.type),
              color: 'white',
              fontWeight: 600,
              mb: 3
            }}
          />

          {/* Question Text */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#2E7D32',
              mb: 4,
              lineHeight: 1.4
            }}
          >
            {currentQuestion.text}
          </Typography>

          {/* Answer Options */}
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <Stack spacing={2}>
                {currentQuestion.options.map((option, index) => (
                  <Paper
                    key={index}
                    elevation={selectedValue === option.value.toString() ? 3 : 0}
                    sx={{
                      border: selectedValue === option.value.toString()
                        ? '2px solid #4CAF50'
                        : '1px solid #E0E0E0',
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#4CAF50',
                        bgcolor: '#F1F8F4'
                      }
                    }}
                  >
                    <FormControlLabel
                      value={option.value.toString()}
                      control={
                        <Radio
                          sx={{
                            color: '#4CAF50',
                            '&.Mui-checked': {
                              color: '#4CAF50'
                            }
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            color: '#333',
                            py: 1
                          }}
                        >
                          {option.text}
                        </Typography>
                      }
                      sx={{
                        m: 0,
                        p: 2,
                        width: '100%',
                        '& .MuiFormControlLabel-label': {
                          flex: 1
                        }
                      }}
                    />
                  </Paper>
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>

          {/* Next Button */}
          <Button
            variant="contained"
            size="large"
            endIcon={state.currentQuestionIndex === ALL_QUESTIONS.length - 1 ? <CheckCircleIcon /> : <ArrowForwardIcon />}
            onClick={handleAnswer}
            disabled={!selectedValue}
            sx={{
              mt: 4,
              bgcolor: '#4CAF50',
              color: 'white',
              fontWeight: 600,
              py: 1.5,
              px: 4,
              borderRadius: 2,
              width: '100%',
              '&:hover': {
                bgcolor: '#43A047'
              },
              '&.Mui-disabled': {
                bgcolor: '#E0E0E0',
                color: '#9E9E9E'
              }
            }}
          >
            {state.currentQuestionIndex === ALL_QUESTIONS.length - 1 ? 'Complete' : 'Next Question'}
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
}
