import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Container,
  useScrollTrigger,
  Slide } from
'@mui/material';
import {
  SmartToy as SmartToyIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  Mail as MailIcon,
  Close as CloseIcon } from
'@mui/icons-material';
type TopBarProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};
const navItems = [
{
  label: 'Home',
  sectionId: 'hero',
  icon: <HomeIcon />
},
{
  label: 'Features',
  sectionId: 'features',
  icon: <StarIcon />
},
{
  label: 'How It Works',
  sectionId: 'how-it-works',
  icon: <SettingsIcon />
},
{
  label: 'Contact',
  sectionId: 'contact',
  icon: <MailIcon />
}];

export function TopBar({ currentPage, onNavigate }: TopBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50
  });
  const handleScrollTo = (sectionId: string) => {
    if (currentPage !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setDrawerOpen(false);
  };
  return (
    <>
      <AppBar
        position="sticky"
        elevation={trigger ? 4 : 0}
        sx={{
          bgcolor: trigger ?
          'rgba(255,255,255,0.97)' :
          'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease'
        }}>
        
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              py: 0.5
            }}>
            
            {/* Brand */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                mr: 4
              }}
              onClick={() => {
                onNavigate('landing');
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}>
              
              <SmartToyIcon
                sx={{
                  color: '#4CAF50',
                  fontSize: 32
                }} />
              
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: '#1B5E20',
                  letterSpacing: '-0.5px'
                }}>
                
                NutriBot
              </Typography>
            </Box>

            {/* Desktop Nav Links */}
            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex'
                },
                gap: 1,
                flex: 1
              }}>
              
              {navItems.map((item) =>
              <Button
                key={item.label}
                onClick={() => handleScrollTo(item.sectionId)}
                sx={{
                  color: '#2E7D32',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  px: 2,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#E8F5E9',
                    color: '#1B5E20'
                  },
                  transition: 'all 0.2s ease'
                }}>
                
                  {item.label}
                </Button>
              )}
            </Box>

            {/* Try Demo Button (Desktop) */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => onNavigate('demo')}
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex'
                },
                borderRadius: '24px',
                px: 3,
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)'
                },
                transition: 'all 0.2s ease'
              }}>
              
              Try Demo
            </Button>

            {/* Mobile Hamburger */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none'
                },
                ml: 'auto',
                color: '#2E7D32'
              }}
              aria-label="Open navigation menu">
              
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: '#FAFAFA'
          }
        }}>
        
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
            
            <SmartToyIcon
              sx={{
                color: '#4CAF50'
              }} />
            
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#1B5E20'
              }}>
              
              NutriBot
            </Typography>
          </Box>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu">
            
            <CloseIcon />
          </IconButton>
        </Box>

        <List
          sx={{
            px: 1
          }}>
          
          {navItems.map((item) =>
          <ListItem key={item.label} disablePadding>
              <ListItemButton
              onClick={() => handleScrollTo(item.sectionId)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&:hover': {
                  bgcolor: '#E8F5E9'
                }
              }}>
              
                <ListItemIcon
                sx={{
                  color: '#4CAF50',
                  minWidth: 40
                }}>
                
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 600,
                  color: '#2E7D32'
                }} />
              
              </ListItemButton>
            </ListItem>
          )}
        </List>

        <Box
          sx={{
            p: 2,
            mt: 'auto'
          }}>
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              onNavigate('demo');
              setDrawerOpen(false);
            }}
            sx={{
              borderRadius: '24px',
              py: 1.5,
              fontWeight: 700
            }}>
            
            Try Demo
          </Button>
        </Box>
      </Drawer>
    </>);

}