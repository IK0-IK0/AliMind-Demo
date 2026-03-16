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
  FavoriteRounded as HeartIcon,
  PsychologyRounded as BrainIcon,
  FitnessCenterRounded as FitnessIcon,
  LocalDiningRounded as DiningIcon,
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
            
            Why It Matters
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#1B5E20',
              mb: 2
            }}>
            
            The importance of good nutrition
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#558B2F',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.7
            }}>
            
            Proper nutrition is the foundation of a healthy life. Here's why
            paying attention to what you eat can transform your well-being.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={3}>
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
                  
                  <HeartIcon fontSize="medium" />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#1B5E20',
                    fontSize: '1.05rem'
                  }}>
                  
                  Prevents Chronic Disease
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6,
                    mb: 1
                  }}>
                  
                  A balanced diet reduces the risk of heart disease, diabetes,
                  and obesity.
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
                      
                      Studies show that diets rich in fruits, vegetables, whole
                      grains, and lean proteins can reduce the risk of chronic
                      diseases by up to 80%. Small, consistent changes in your
                      diet can have a profound impact on your long-term health.
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={3}>
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
                  
                  Boosts Mental Clarity
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6,
                    mb: 1
                  }}>
                  
                  The right nutrients fuel your brain for better focus, mood,
                  and cognitive function.
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
                        lineHeight: 1.7
                      }}>
                      
                      Omega-3 fatty acids, B vitamins, and antioxidants are
                      essential for brain health. A nutrient-rich diet can
                      improve memory, reduce brain fog, and even help prevent
                      age-related cognitive decline.
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md={3}>
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
                  
                  <FitnessIcon fontSize="medium" />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#1B5E20',
                    fontSize: '1.05rem'
                  }}>
                  
                  Fuels Physical Performance
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6,
                    mb: 1
                  }}>
                  
                  Proper nutrition maximizes energy, endurance, and recovery for
                  an active lifestyle.
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
                        lineHeight: 1.7
                      }}>
                      
                      Whether you're an athlete or just staying active, the
                      right balance of carbs, protein, and fats can dramatically
                      improve your performance. Proper hydration and
                      micronutrients also play a key role in recovery.
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              onClick={() => handleToggle(3)}
              sx={{
                height: '100%',
                borderRadius: 4,
                border:
                expandedCard === 3 ?
                '2px solid #00796B' :
                '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 16px 32px rgba(0, 121, 107, 0.15)',
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
                    color: '#00796B',
                    width: 56,
                    height: 56,
                    mb: 2.5,
                    transition: 'transform 0.3s ease',
                    ...(expandedCard === 3 && {
                      transform: 'scale(1.1)'
                    })
                  }}>
                  
                  <DiningIcon fontSize="medium" />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: '#1B5E20',
                    fontSize: '1.05rem'
                  }}>
                  
                  Builds Healthy Habits
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#558B2F',
                    lineHeight: 1.6,
                    mb: 1
                  }}>
                  
                  Understanding nutrition empowers you to make lasting, positive
                  changes every day.
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
                      color: '#00796B',
                      fontWeight: 600
                    }}>
                    
                    {expandedCard === 3 ? 'Show less' : 'Learn more'}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      ml: 'auto',
                      transform:
                      expandedCard === 3 ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: '#00796B'
                    }}
                    aria-label="expand">
                    
                    <ExpandMoreIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Collapse in={expandedCard === 3}>
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
                        lineHeight: 1.7
                      }}>
                      
                      Knowledge is power. When you understand how food affects
                      your body, you naturally make better choices. NutriBot
                      helps you build these habits one meal at a time, without
                      overwhelming you with information.
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