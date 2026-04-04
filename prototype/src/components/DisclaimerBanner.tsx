import React, { useState } from 'react';
import {
  Alert,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

export function DisclaimerBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Alert
        severity="info"
        icon={<InfoIcon />}
        sx={{
          mb: 2,
          borderRadius: 2,
          bgcolor: '#E3F2FD',
          border: '1px solid #90CAF9',
          '& .MuiAlert-message': {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#1565C0' }}>
            This is a session-only demo. All data resets on page reload. No information is saved.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={handleOpenModal}
          sx={{
            color: '#1565C0',
            borderColor: '#1565C0',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              borderColor: '#0D47A1',
              bgcolor: 'rgba(21, 101, 192, 0.04)'
            }
          }}
        >
          Learn More
        </Button>
      </Alert>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            m: { xs: 0, sm: 2 }
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: '#E8F5E9',
            color: '#2E7D32',
            fontWeight: 700,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            p: { xs: 2, sm: 3 }
          }}
        >
          Demo Limitations
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: { xs: 2, sm: 3 } }}>
          <Typography variant="body1" sx={{ mb: 2, color: '#555', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            This is a demonstration version of AliMind with the following limitations:
          </Typography>
          <List>
            <ListItem sx={{ py: 0.5, px: { xs: 0, sm: 2 } }}>
              <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: { xs: 18, sm: 20 } }} />
              </ListItemIcon>
              <ListItemText
                primary="Session-only storage"
                secondary="All conversations and data are stored in browser memory only"
                primaryTypographyProps={{ variant: 'body2', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                secondaryTypographyProps={{ variant: 'caption', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5, px: { xs: 0, sm: 2 } }}>
              <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: { xs: 18, sm: 20 } }} />
              </ListItemIcon>
              <ListItemText
                primary="No data persistence"
                secondary="Refreshing the page or closing the browser will reset all data"
                primaryTypographyProps={{ variant: 'body2', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                secondaryTypographyProps={{ variant: 'caption', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5, px: { xs: 0, sm: 2 } }}>
              <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: { xs: 18, sm: 20 } }} />
              </ListItemIcon>
              <ListItemText
                primary="Simulated responses"
                secondary="The chatbot uses pre-programmed logic, not a live AI backend"
                primaryTypographyProps={{ variant: 'body2', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                secondaryTypographyProps={{ variant: 'caption', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5, px: { xs: 0, sm: 2 } }}>
              <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: { xs: 18, sm: 20 } }} />
              </ListItemIcon>
              <ListItemText
                primary="No user accounts"
                secondary="This demo does not support user registration or authentication"
                primaryTypographyProps={{ variant: 'body2', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                secondaryTypographyProps={{ variant: 'caption', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5, px: { xs: 0, sm: 2 } }}>
              <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: { xs: 18, sm: 20 } }} />
              </ListItemIcon>
              <ListItemText
                primary="Limited functionality"
                secondary="Advanced features like meal planning and progress tracking are not available"
                primaryTypographyProps={{ variant: 'body2', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                secondaryTypographyProps={{ variant: 'caption', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ mt: 2, color: '#666', fontStyle: 'italic', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            The full application will include persistent storage, real AI integration, user accounts, and comprehensive nutrition tracking features.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 2 }, pt: 0 }}>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            fullWidth={false}
            sx={{
              bgcolor: '#4CAF50',
              color: 'white',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '0.875rem' },
              px: { xs: 2, sm: 3 },
              '&:hover': {
                bgcolor: '#43A047'
              }
            }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
