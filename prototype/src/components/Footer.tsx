import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Button,
  Divider } from
'@mui/material';
import { SmartToy as SmartToyIcon } from '@mui/icons-material';
type FooterProps = {
  onTryDemo: () => void;
};
export function Footer({ onTryDemo }: FooterProps) {
  return (
    <Box
      sx={{
        bgcolor: '#1B5E20',
        color: 'white',
        pt: 8,
        pb: 4
      }}>
      
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            mb: 6
          }}>
          
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2
              }}>
              
              <SmartToyIcon
                sx={{
                  color: '#A5D6A7',
                  fontSize: 32
                }} />
              
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: 'white'
                }}>
                
                NutriBot
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: '#A5D6A7',
                mb: 3,
                lineHeight: 1.6,
                maxWidth: 300
              }}>
              
              Your personal AI nutrition assistant. Making healthy eating
              simple, accessible, and personalized for everyone.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'white'
              }}>
              
              Product
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
              }}>
              
              <Link
                href="#features"
                underline="hover"
                sx={{
                  color: '#A5D6A7'
                }}>
                
                Features
              </Link>
              <Link
                href="#how-it-works"
                underline="hover"
                sx={{
                  color: '#A5D6A7'
                }}>
                
                How It Works
              </Link>
              <Link
                component="button"
                underline="hover"
                onClick={onTryDemo}
                sx={{
                  color: '#A5D6A7',
                  textAlign: 'left'
                }}>
                
                Try Demo
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'white'
              }}>
              
              Company
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
              }}>
              
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: '#A5D6A7'
                }}>
                
                About Us
              </Link>
              <Link
                href="#contact"
                underline="hover"
                sx={{
                  color: '#A5D6A7'
                }}>
                
                Contact
              </Link>
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: '#A5D6A7'
                }}>
                
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'white'
              }}>
              
              Ready to start?
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#A5D6A7',
                mb: 2
              }}>
              
              Join thousands of others who have transformed their diets with
              NutriBot.
            </Typography>
            <Button
              variant="contained"
              onClick={onTryDemo}
              sx={{
                bgcolor: '#A5D6A7',
                color: '#1B5E20',
                fontWeight: 700,
                '&:hover': {
                  bgcolor: 'white'
                }
              }}>
              
              Try NutriBot Free
            </Button>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor: 'rgba(255,255,255,0.1)',
            mb: 3
          }} />
        

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
          
          <Typography
            variant="body2"
            sx={{
              color: '#A5D6A7'
            }}>
            
            © {new Date().getFullYear()} NutriBot. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#A5D6A7'
            }}>
            
            Designed with ❤️ for better health.
          </Typography>
        </Box>
      </Container>
    </Box>);

}