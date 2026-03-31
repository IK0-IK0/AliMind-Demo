import React, { useState, memo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Collapse,
  IconButton } from
'@mui/material';
import {
  PsychologyRounded as BrainIcon,
  TimelineRounded as TimelineIcon,
  EmojiObjectsRounded as LightbulbIcon,
  ExpandMore as ExpandMoreIcon } from
'@mui/icons-material';
export function Features() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };
  return (
    <Box
      id="features"
      sx={{
        py: {
          xs: 8,
          md: 12
        },
        bgcolor: '#FAFAFA'
      }}>
      
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            mb: 8
          }}>
          
          <Typography
            variant="h6"
            color="secondary"
            sx={{
              fontWeight: 600,
              mb: 1,
              textTransform: 'uppercase',
              letterSpacing: 1.5
            }}>
            
            How It Works
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#1B5E20',
              mb: 2
            }}>
            
            Science-backed behavior change
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#558B2F',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.7
            }}>
            
            NutriBot uses proven psychological frameworks to understand your unique situation
            and provide personalized guidance that matches where you are in your journey.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Card 1: Seven-Step Pipeline */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              onClick={() => handleToggle(0)}
              sx={{
                height: '100%',
                borderRadius: 4,
                border:
                expandedCard === 0 ?
                '2px solid #4CAF50' :
                '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 16px 32px rgba(76, 175, 80, 0.15)',
                  borderColor: '#81C784'
                },
                display: 'flex',
                flexDirection: 'column'
              }}>
              
              <CardContent
                sx={{
                  p: 3.5,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                
                <Avatar
                  sx={{
                    bgcolor: '#E8F5E9',
                    color: '#4CAF50',
                    width: 56,
                    height: 56,
                    mb: 2.5,
                    transition: 'transform 0.3s ease',
                    ...(expandedCard === 0 && {
                      transform: 'scale(1.1)'
                    })
                  }}>
                  
                  <TimelineIcon fontSize="medium" />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#1B5E20',
                    fontSize: '1.05rem'
                  }}>
                  
                  Seven-Step Smart Pipeline
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6,
                    mb: 1
                  }}>
                  
                  Our system analyzes your conversation through seven intelligent steps to provide truly personalized guidance.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 'auto',
                    pt: 1
                  }}>
                  
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#4CAF50',
                      fontWeight: 600
                    }}>
                    
                    {expandedCard === 0 ? 'Show less' : 'Learn more'}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      ml: 'auto',
                      transform:
                      expandedCard === 0 ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: '#4CAF50'
                    }}
                    aria-label="expand">
                    
                    <ExpandMoreIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Collapse in={expandedCard === 0}>
                  <Box
                    sx={{
                      pt: 2,
                      borderTop: '1px solid #E8F5E9',
                      mt: 1.5
                    }}>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2E7D32',
                        lineHeight: 1.7
                      }}>
                      
                      First, we understand your eating habits and goals. Then we identify what motivates you, 
                      what holds you back, and where you are in your change journey. Based on this, we choose 
                      the right approach, suggest practical strategies, recommend recipes that fit your life, 
                      and craft a response that speaks to your unique situation.
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2: TPB Constructs */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              onClick={() => handleToggle(1)}
              sx={{
                height: '100%',
                borderRadius: 4,
                border:
                expandedCard === 1 ?
                '2px solid #00897B' :
                '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 16px 32px rgba(0, 137, 123, 0.15)',
                  borderColor: '#4DB6AC'
                },
                display: 'flex',
                flexDirection: 'column'
              }}>
              
              <CardContent
                sx={{
                  p: 3.5,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                
                <Avatar
                  sx={{
                    bgcolor: '#E0F2F1',
                    color: '#00897B',
                    width: 56,
                    height: 56,
                    mb: 2.5,
                    transition: 'transform 0.3s ease',
                    ...(expandedCard === 1 && {
                      transform: 'scale(1.1)'
                    })
                  }}>
                  
                  <BrainIcon fontSize="medium" />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#1B5E20',
                    fontSize: '1.05rem'
                  }}>
                  
                  Understanding Your Mindset
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6,
                    mb: 1
                  }}>
                  
                  We identify three key factors that influence your eating choices: how you feel about healthy eating, 
                  what others think, and how confident you are.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 'auto',
                    pt: 1
                  }}>
                  
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#00897B',
                      fontWeight: 600
                    }}>
                    
                    {expandedCard === 1 ? 'Show less' : 'Learn more'}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      ml: 'auto',
                      transform:
                      expandedCard === 1 ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: '#00897B'
                    }}
                    aria-label="expand">
                    
                    <ExpandMoreIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Collapse in={expandedCard === 1}>
                  <Box
                    sx={{
                      pt: 2,
                      borderTop: '1px solid #E0F2F1',
                      mt: 1.5
                    }}>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2E7D32',
                        lineHeight: 1.7,
                        mb: 1.5
                      }}>
                      
                      <strong>Your Attitude:</strong> Do you see healthy eating as beneficial and enjoyable, or as restrictive and difficult?
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2E7D32',
                        lineHeight: 1.7,
                        mb: 1.5
                      }}>
                      
                      <strong>Social Influence:</strong> Do your family, friends, and community support your healthy eating goals?
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2E7D32',
                        lineHeight: 1.7
                      }}>
                      
                      <strong>Your Confidence:</strong> Do you feel you have the skills, time, and resources to eat healthier?
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3: TTM Stages */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              onClick={() => handleToggle(2)}
              sx={{
                height: '100%',
                borderRadius: 4,
                border:
                expandedCard === 2 ?
                '2px solid #43A047' :
                '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 16px 32px rgba(67, 160, 71, 0.15)',
                  borderColor: '#81C784'
                },
                display: 'flex',
                flexDirection: 'column'
              }}>
              
              <CardContent
                sx={{
                  p: 3.5,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                
                <Avatar
                  sx={{
                    bgcolor: '#E8F5E9',
                    color: '#43A047',
                    width: 56,
                    height: 56,
                    mb: 2.5,
                    transition: 'transform 0.3s ease',
                    ...(expandedCard === 2 && {
                      transform: 'scale(1.1)'
                    })
                  }}>
                  
                  <LightbulbIcon fontSize="medium" />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#1B5E20',
                    fontSize: '1.05rem'
                  }}>
                  
                  Your Change Journey
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6,
                    mb: 1
                  }}>
                  
                  Everyone is at a different stage in their health journey. We meet you where you are and 
                  provide guidance that matches your readiness to change.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 'auto',
                    pt: 1
                  }}>
                  
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#43A047',
                      fontWeight: 600
                    }}>
                    
                    {expandedCard === 2 ? 'Show less' : 'Learn more'}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      ml: 'auto',
                      transform:
                      expandedCard === 2 ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: '#43A047'
                    }}
                    aria-label="expand">
                    
                    <ExpandMoreIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Collapse in={expandedCard === 2}>
                  <Box
                    sx={{
                      pt: 2,
                      borderTop: '1px solid #E8F5E9',
                      mt: 1.5
                    }}>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2E7D32',
                        lineHeight: 1.7,
                        mb: 1.5
                      }}>
                      
                      <strong>Just Exploring:</strong> You're curious but not ready to commit yet. We help you understand the benefits.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2E7D32',
                        lineHeight: 1.7,
                        mb: 1.5
                      }}>
                      
                      <strong>Thinking About It:</strong> You're considering change but weighing pros and cons. We help you work through doubts.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2E7D32',
                        lineHeight: 1.7,
                        mb: 1.5
                      }}>
                      
                      <strong>Getting Ready:</strong> You're planning to start soon. We help you create a realistic action plan.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2E7D32',
                        lineHeight: 1.7,
                        mb: 1.5
                      }}>
                      
                      <strong>Taking Action:</strong> You're actively making changes. We provide practical tips and encouragement.
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#2E7D32',
                        lineHeight: 1.7
                      }}>
                      
                      <strong>Keeping It Up:</strong> You've made lasting changes. We help you stay on track and handle setbacks.
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>);

}