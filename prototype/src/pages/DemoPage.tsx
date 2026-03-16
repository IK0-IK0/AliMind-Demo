import React from 'react';
import { Box, Container, Button, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { ChatbotShowcase } from '../components/ChatbotShowcase';
type DemoPageProps = {
  onBack: () => void;
};
export function DemoPage({ onBack }: DemoPageProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#FAFAFA'
      }}>
      
      <Container
        maxWidth="md"
        sx={{
          pt: 3,
          pb: 6
        }}>
        
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            mb: 3,
            color: '#2E7D32',
            fontWeight: 600,
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#E8F5E9'
            }
          }}>
          
          Back to Home
        </Button>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1B5E20',
            mb: 1,
            textAlign: 'center'
          }}>
          
          NutriBot Demo
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#558B2F',
            mb: 4,
            textAlign: 'center',
            maxWidth: 500,
            mx: 'auto'
          }}>
          
          Try asking about protein, calories, meal ideas, vitamins, or diet
          tips. NutriBot is here to help!
        </Typography>

        <ChatbotShowcase />
      </Container>
    </Box>);

}