import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar } from
'@mui/material';
import {
  PsychologyRounded as BrainIcon,
  TimelineRounded as TimelineIcon,
  EmojiObjectsRounded as LightbulbIcon } from
'@mui/icons-material';
export function Features() {
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
            
            The Science
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#1B5E20',
              mb: 2
            }}>
            
            Behavioral Science in Action
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#558B2F',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.7
            }}>
            
            AliMind uses proven psychological frameworks to understand your unique situation
            and provide personalized guidance that matches where you are in your journey.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Card 1: Seven-Step Pipeline */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 2,
                border: '1px solid rgba(0,0,0,0.06)',
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
                    mb: 2.5
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
                    lineHeight: 1.6
                  }}>
                  
                  Our system analyzes your conversation through seven intelligent steps to provide truly personalized guidance tailored to your needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2: TPB Constructs */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 2,
                border: '1px solid rgba(0,0,0,0.06)',
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
                    mb: 2.5
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
                    lineHeight: 1.6
                  }}>
                  
                  We identify three key factors that influence your eating choices: your feelings about healthy eating, social support, and confidence level.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3: TTM Stages */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 2,
                border: '1px solid rgba(0,0,0,0.06)',
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
                    mb: 2.5
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
                    lineHeight: 1.6
                  }}>
                  
                  Everyone is at a different stage in their health journey. We meet you where you are and provide guidance that matches your readiness.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>);

}