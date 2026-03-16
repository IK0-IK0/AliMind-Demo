import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Grow } from '@mui/material';
import {
  Chat as ChatIcon,
  Lightbulb as LightbulbIcon,
  BarChart as BarChartIcon } from
'@mui/icons-material';
export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  return (
    <Box
      id="how-it-works"
      sx={{
        py: {
          xs: 8,
          md: 12
        },
        bgcolor: '#E8F5E9'
      }}>
      
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            mb: {
              xs: 6,
              md: 8
            }
          }}>
          
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#1B5E20',
              mb: 2
            }}>
            
            How NutriBot Works
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              color: '#2E7D32',
              maxWidth: 500,
              mx: 'auto',
              lineHeight: 1.6
            }}>
            
            Three simple steps to a healthier you. No complicated apps or
            tedious calorie counting.
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch">
          
          {/* Step 1 */}
          <Grid item xs={12} md={4}>
            <Box
              onMouseEnter={() => setActiveStep(0)}
              onMouseLeave={() => setActiveStep(null)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                height: '100%'
              }}>
              
              <Paper
                elevation={activeStep === 0 ? 8 : 0}
                sx={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: activeStep === 0 ? '#2E7D32' : '#4CAF50',
                  color: 'white',
                  mb: 3,
                  boxShadow:
                  activeStep === 0 ?
                  '0 12px 24px rgba(46, 125, 50, 0.4)' :
                  '0 8px 16px rgba(76, 175, 80, 0.3)',
                  border: '4px solid white',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeStep === 0 ? 'scale(1.15)' : 'scale(1)',
                  position: 'relative'
                }}>
                
                <ChatIcon fontSize="large" />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: 'white',
                    color: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}>
                  
                  1
                </Box>
              </Paper>

              <Paper
                elevation={activeStep === 0 ? 4 : 0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: activeStep === 0 ? 'white' : 'transparent',
                  transition: 'all 0.35s ease',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#1B5E20'
                  }}>
                  
                  Ask a Question
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6
                  }}>
                  
                  Type your nutrition question, dietary preference, or health
                  goal into the chat.
                </Typography>
                <Grow in={activeStep === 0} timeout={400}>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      p: 1.5,
                      bgcolor: '#E8F5E9',
                      borderRadius: 2,
                      color: '#2E7D32',
                      fontStyle: 'italic',
                      border: '1px dashed #A5D6A7'
                    }}>
                    
                    💬 "How much protein should I eat daily?"
                  </Typography>
                </Grow>
              </Paper>
            </Box>
          </Grid>

          {/* Step 2 */}
          <Grid item xs={12} md={4}>
            <Box
              onMouseEnter={() => setActiveStep(1)}
              onMouseLeave={() => setActiveStep(null)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                height: '100%'
              }}>
              
              <Paper
                elevation={activeStep === 1 ? 8 : 0}
                sx={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: activeStep === 1 ? '#00695C' : '#00897B',
                  color: 'white',
                  mb: 3,
                  boxShadow:
                  activeStep === 1 ?
                  '0 12px 24px rgba(0, 105, 92, 0.4)' :
                  '0 8px 16px rgba(0, 137, 123, 0.3)',
                  border: '4px solid white',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeStep === 1 ? 'scale(1.15)' : 'scale(1)',
                  position: 'relative'
                }}>
                
                <LightbulbIcon fontSize="large" />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: 'white',
                    color: '#00897B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}>
                  
                  2
                </Box>
              </Paper>

              <Paper
                elevation={activeStep === 1 ? 4 : 0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: activeStep === 1 ? 'white' : 'transparent',
                  transition: 'all 0.35s ease',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#1B5E20'
                  }}>
                  
                  Get Personalized Advice
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6
                  }}>
                  
                  NutriBot analyzes your needs and provides science-backed,
                  actionable recommendations.
                </Typography>
                <Grow in={activeStep === 1} timeout={400}>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      p: 1.5,
                      bgcolor: '#E0F2F1',
                      borderRadius: 2,
                      color: '#00695C',
                      fontStyle: 'italic',
                      border: '1px dashed #80CBC4'
                    }}>
                    
                    💡 Tailored meal plans, macro breakdowns, and tips just for
                    you.
                  </Typography>
                </Grow>
              </Paper>
            </Box>
          </Grid>

          {/* Step 3 */}
          <Grid item xs={12} md={4}>
            <Box
              onMouseEnter={() => setActiveStep(2)}
              onMouseLeave={() => setActiveStep(null)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                height: '100%'
              }}>
              
              <Paper
                elevation={activeStep === 2 ? 8 : 0}
                sx={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: activeStep === 2 ? '#33691E' : '#43A047',
                  color: 'white',
                  mb: 3,
                  boxShadow:
                  activeStep === 2 ?
                  '0 12px 24px rgba(51, 105, 30, 0.4)' :
                  '0 8px 16px rgba(67, 160, 71, 0.3)',
                  border: '4px solid white',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeStep === 2 ? 'scale(1.15)' : 'scale(1)',
                  position: 'relative'
                }}>
                
                <BarChartIcon fontSize="large" />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: 'white',
                    color: '#43A047',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}>
                  
                  3
                </Box>
              </Paper>

              <Paper
                elevation={activeStep === 2 ? 4 : 0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: activeStep === 2 ? 'white' : 'transparent',
                  transition: 'all 0.35s ease',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#1B5E20'
                  }}>
                  
                  Track Your Progress
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6
                  }}>
                  
                  Follow tailored meal plans and watch your health improve over
                  time.
                </Typography>
                <Grow in={activeStep === 2} timeout={400}>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      p: 1.5,
                      bgcolor: '#E8F5E9',
                      borderRadius: 2,
                      color: '#33691E',
                      fontStyle: 'italic',
                      border: '1px dashed #A5D6A7'
                    }}>
                    
                    📊 See your nutrition habits improve week over week.
                  </Typography>
                </Grow>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>);

}