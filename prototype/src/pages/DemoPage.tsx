import React, { useState } from 'react';
import { Box, Container, Button, Typography, Collapse } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Help as HelpIcon } from '@mui/icons-material';
import { ChatbotShowcase } from '../components/ChatbotShowcase';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { HelpDialog } from '../components/HelpDialog';
import { ShapeGrid } from '../components/ShapeGrid';

type DemoPageProps = {
  onBack: () => void;
};

export function DemoPage({ onBack }: DemoPageProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleResetSession = () => {
    setResetTrigger(prev => prev + 1);
    setIsFullscreen(false);
  };

  const handleQuestionnaireStart = () => {
    setIsFullscreen(true);
  };

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
        overflow: isFullscreen ? 'hidden' : 'auto',
        minHeight: 0,
        position: 'relative'
      }}>
      
      {/* Triangle Grid Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }}>
        <ShapeGrid
          shape="triangle"
          borderColor="#ffffff"
          hoverFillColor="#ffffff"
          squareSize={100}
          direction="right"
          speed={0.5}
          hoverTrailAmount={0}
        />
      </Box>
      
      <Container
        maxWidth={isFullscreen ? false : "xl"}
        disableGutters={isFullscreen}
        sx={{
          pt: isFullscreen ? 0 : 3,
          pb: isFullscreen ? 0 : 6,
          px: isFullscreen ? 0 : undefined,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: isFullscreen ? 'hidden' : 'auto',
          minHeight: 0,
          position: 'relative',
          zIndex: 1
        }}>
        
        <Collapse in={!isFullscreen} timeout={500}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
              sx={{
                color: '#2E7D32',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#E8F5E9'
                }
              }}>
              
              Back to Home
            </Button>
            <Button
              startIcon={<HelpIcon />}
              onClick={() => setHelpOpen(true)}
              variant="outlined"
              sx={{
                color: '#2E7D32',
                borderColor: '#2E7D32',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#E8F5E9',
                  borderColor: '#1B5E20'
                }
              }}>
              
              Help
            </Button>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1B5E20',
              mb: 1,
              textAlign: 'center'
            }}>
            
            AliMind Demo
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#558B2F',
              mb: 3,
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto'
            }}>
            
            Chat with AliMind! Answer 20 questions to get personalized nutrition guidance based on your readiness and behavioral factors.
          </Typography>

          <DisclaimerBanner />
        </Collapse>

        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            mt: isFullscreen ? 0 : 2,
            overflow: 'hidden',
            height: isFullscreen ? '100%' : 'auto',
            minHeight: 0
          }}>
          <ChatbotShowcase 
            key={resetTrigger} 
            onResetSession={handleResetSession}
            onQuestionnaireStart={handleQuestionnaireStart}
            isFullscreen={isFullscreen}
            onBackToHome={onBack}
          />
        </Box>

        {/* Floating Back Button - Only in Fullscreen */}
        {isFullscreen && (
          <Box
            sx={{
              position: 'fixed',
              top: 88,
              right: 0,
              zIndex: 1000,
              '&:hover .back-button': {
                transform: 'translateX(0)',
                opacity: 1
              }
            }}
          >
            <Button
              className="back-button"
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: '#2E7D32',
                fontWeight: 600,
                borderRadius: '8px 0 0 8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transform: 'translateX(calc(100% - 12px))',
                opacity: 0.3,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: '#E8F5E9',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                }
              }}>
              Back to Home
            </Button>
          </Box>
        )}
      </Container>

      <HelpDialog
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        onResetSession={handleResetSession}
      />
    </Box>);

}