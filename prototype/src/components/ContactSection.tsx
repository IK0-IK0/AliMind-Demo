import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Avatar } from
'@mui/material';
import {
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Send as SendIcon } from
'@mui/icons-material';
export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setErrors({});
    }
  };
  return (
    <Box
      id="contact"
      sx={{
        py: {
          xs: 10,
          md: 16
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
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#1B5E20',
              mb: 2.5
            }}>
            
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#558B2F',
              maxWidth: 550,
              mx: 'auto',
              lineHeight: 1.7,
              fontWeight: 400
            }}>
            
            Have a question, suggestion, or just want to say hello? We'd love to
            hear from you.
          </Typography>
        </Box>

        <Grid container spacing={6} justifyContent="center">
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                height: '100%'
              }}>
              
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateX(6px)',
                    boxShadow: '0 8px 20px rgba(76, 175, 80, 0.1)',
                    borderColor: '#81C784'
                  }
                }}>
                
                <Avatar
                  sx={{
                    bgcolor: '#E8F5E9',
                    color: '#4CAF50',
                    width: 56,
                    height: 56
                  }}>
                  
                  <EmailIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: '#1B5E20'
                    }}>
                    
                    Email Us
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#558B2F'
                    }}>
                    
                    hello@nutribot.app
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateX(6px)',
                    boxShadow: '0 8px 20px rgba(0, 137, 123, 0.1)',
                    borderColor: '#4DB6AC'
                  }
                }}>
                
                <Avatar
                  sx={{
                    bgcolor: '#E0F2F1',
                    color: '#00897B',
                    width: 56,
                    height: 56
                  }}>
                  
                  <PhoneIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: '#1B5E20'
                    }}>
                    
                    Call Us
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#558B2F'
                    }}>
                    
                    +1 (555) 123-4567
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateX(6px)',
                    boxShadow: '0 8px 20px rgba(67, 160, 71, 0.1)',
                    borderColor: '#81C784'
                  }
                }}>
                
                <Avatar
                  sx={{
                    bgcolor: '#E8F5E9',
                    color: '#43A047',
                    width: 56,
                    height: 56
                  }}>
                  
                  <LocationIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: '#1B5E20'
                    }}>
                    
                    Location
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#558B2F'
                    }}>
                    
                    San Francisco, CA
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 4,
                  md: 6
                },
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.06)'
              }}>
              
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#1B5E20',
                  mb: 4
                }}>
                
                Send us a message
              </Typography>
              <form onSubmit={handleSubmit} noValidate>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3.5
                  }}>
                  
                  <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                    }
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: '#4CAF50'
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#4CAF50'
                      }
                    }} />
                  
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                    }
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: '#4CAF50'
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#4CAF50'
                      }
                    }} />
                  
                  <TextField
                    label="Your Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value
                    })
                    }
                    error={!!errors.message}
                    helperText={errors.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: '#4CAF50'
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#4CAF50'
                      }
                    }} />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      borderRadius: '24px',
                      py: 1.5,
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}>
                    
                    Send Message
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={submitted}
        autoHideDuration={4000}
        onClose={() => setSubmitted(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        
        <Alert
          onClose={() => setSubmitted(false)}
          severity="success"
          variant="filled"
          sx={{
            borderRadius: 2
          }}>
          
          Message sent! We'll get back to you soon. 🌱
        </Alert>
      </Snackbar>
    </Box>);

}