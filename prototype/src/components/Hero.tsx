import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
type HeroProps = {
  onTryDemo: () => void;
};
export function Hero({ onTryDemo }: HeroProps) {
  return (
    <Box
      id="hero"
      sx={{
        pt: {
          xs: 10,
          md: 16
        },
        pb: {
          xs: 10,
          md: 14
        },
        background:
        'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #B2DFDB 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
      
      {/* Decorative shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
          'radial-gradient(circle, rgba(76,175,80,0.12) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0
        }} />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
          'radial-gradient(circle, rgba(0,137,123,0.08) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0
        }} />
      

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
        
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: {
              xs: '2.5rem',
              sm: '3.5rem',
              md: '4.5rem'
            },
            color: '#1B5E20',
            mb: 3,
            lineHeight: 1.15
          }}>
          
          Conversational AI for <br />
          <Box
            component="span"
            sx={{
              color: '#00897B'
            }}>
            
            Dietary Behavior Change
          </Box>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: '#2E7D32',
            mb: 2,
            fontWeight: 400,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6
          }}>
          
          Meet NutriBot — a theory-driven nutrition assistant that understands your barriers, 
          readiness for change, and personal context through natural conversation.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#388E3C',
            mb: 1,
            fontWeight: 500,
            maxWidth: '750px',
            mx: 'auto',
            lineHeight: 1.5,
            fontSize: {
              xs: '1rem',
              sm: '1.1rem',
              md: '1.25rem'
            }
          }}>
          
          Designed for Filipino young adults and adults aged 18-40 in Davao City
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#558B2F',
            mb: 6,
            fontStyle: 'italic',
            maxWidth: '650px',
            mx: 'auto',
            fontSize: {
              xs: '0.9rem',
              sm: '1rem'
            }
          }}>
          
          Note: This is a session-only demo. Your conversations will not be saved.
        </Typography>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          spacing={2}
          justifyContent="center"
          alignItems="center">
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onTryDemo}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '30px',
              boxShadow: '0 8px 16px rgba(76, 175, 80, 0.25)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 20px rgba(76, 175, 80, 0.3)'
              },
              transition: 'all 0.3s ease'
            }}>
            
            Try It Now
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '30px',
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
                backgroundColor: 'rgba(0, 137, 123, 0.04)'
              }
            }}
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({
                behavior: 'smooth'
              });
            }}>
            
            Learn More
          </Button>
        </Stack>
      </Container>
    </Box>);

}