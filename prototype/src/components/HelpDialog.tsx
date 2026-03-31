import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Psychology as PsychologyIcon,
  Restaurant as RestaurantIcon,
  Timeline as TimelineIcon,
  Warning as WarningIcon,
  RestartAlt as RestartAltIcon
} from '@mui/icons-material';

type HelpDialogProps = {
  open: boolean;
  onClose: () => void;
  onResetSession?: () => void;
};

export function HelpDialog({ open, onClose, onResetSession }: HelpDialogProps) {
  const [expanded, setExpanded] = useState<string | false>('pipeline');

  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleReset = () => {
    if (onResetSession) {
      onResetSession();
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={false}
      slotProps={{
        paper: {
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            m: { xs: 0, sm: 2 },
            maxHeight: { xs: '100%', sm: 'calc(100% - 64px)' }
          }
        }
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: '#E8F5E9',
          color: '#2E7D32',
          fontWeight: 700,
          pb: 2,
          p: { xs: 2, sm: 3 }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PsychologyIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>About NutriBot Demo</Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 2, p: { xs: 2, sm: 3 } }}>
        <Typography variant="body1" sx={{ mb: 3, color: '#555', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          NutriBot is a conversational AI nutrition assistant that uses psychological frameworks to provide personalized dietary guidance based on your readiness for change and behavioral barriers.
        </Typography>

        {/* Seven-Step Pipeline */}
        <Accordion
          expanded={expanded === 'pipeline'}
          onChange={handleAccordionChange('pipeline')}
          sx={{ mb: 1, boxShadow: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: '#F1F8E9',
              '&:hover': { bgcolor: '#E8F5E9' },
              px: { xs: 2, sm: 2 }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimelineIcon sx={{ color: '#4CAF50', fontSize: { xs: 20, sm: 24 } }} />
              <Typography sx={{ fontWeight: 600, color: '#2E7D32', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Seven-Step Pipeline
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 2, sm: 2 } }}>
            <Typography variant="body2" sx={{ mb: 2, color: '#666', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              NutriBot processes your messages through a seven-step computational pipeline:
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <Box
                    sx={{
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      fontWeight: 600
                    }}
                  >
                    1
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary="Context Collection"
                  secondary="Extracts dietary habits, barriers, and goals from your conversation"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <Box
                    sx={{
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      fontWeight: 600
                    }}
                  >
                    2
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary="TPB Inference"
                  secondary="Calculates your Attitude, Social Support, and Confidence scores"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <Box
                    sx={{
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      fontWeight: 600
                    }}
                  >
                    3
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary="TTM Stage Classification"
                  secondary="Determines your readiness for change (Pre-contemplation to Maintenance)"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <Box
                    sx={{
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      fontWeight: 600
                    }}
                  >
                    4
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary="Intervention Mode Selection"
                  secondary="Chooses appropriate intervention strategy based on your stage"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <Box
                    sx={{
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      fontWeight: 600
                    }}
                  >
                    5
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary="TPB-Targeted Intervention"
                  secondary="Identifies your weakest behavioral factor and selects appropriate techniques"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <Box
                    sx={{
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      fontWeight: 600
                    }}
                  >
                    6
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary="Recipe Generation"
                  secondary="Recommends Filipino dishes based on your constraints and preferences"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <Box
                    sx={{
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      fontWeight: 600
                    }}
                  >
                    7
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary="Response Generation"
                  secondary="Synthesizes all analyses into personalized, natural language guidance"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* TPB/TTM Framework */}
        <Accordion
          expanded={expanded === 'framework'}
          onChange={handleAccordionChange('framework')}
          sx={{ mb: 1, boxShadow: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: '#F1F8E9',
              '&:hover': { bgcolor: '#E8F5E9' },
              px: { xs: 2, sm: 2 }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PsychologyIcon sx={{ color: '#4CAF50', fontSize: { xs: 20, sm: 24 } }} />
              <Typography sx={{ fontWeight: 600, color: '#2E7D32', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                TPB/TTM Framework
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 2, sm: 2 } }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2E7D32', mb: 1, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
                Theory of Planned Behavior (TPB)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#666', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                TPB identifies three key factors that influence your dietary behavior:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText
                    primary="Attitude"
                    secondary="How you feel about healthy eating (positive or negative beliefs)"
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                      secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                    }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText
                    primary="Social Support"
                    secondary="Influence from family, friends, and social environment"
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                      secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                    }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText
                    primary="Confidence"
                    secondary="Your belief in your ability to make dietary changes"
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                      secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                    }}
                  />
                </ListItem>
              </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2E7D32', mb: 1, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
                Transtheoretical Model (TTM)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: '#666', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                TTM classifies your readiness for change into five stages:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText
                    primary="Pre-contemplation"
                    secondary="Not yet considering change"
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                      secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                    }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText
                    primary="Contemplation"
                    secondary="Thinking about change but not committed"
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                      secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                    }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText
                    primary="Preparation"
                    secondary="Planning to change soon"
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                      secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                    }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText
                    primary="Action"
                    secondary="Actively making changes"
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                      secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                    }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25, px: 0 }}>
                  <ListItemText
                    primary="Maintenance"
                    secondary="Sustaining changes over time"
                    slotProps={{
                      primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                      secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                    }}
                  />
                </ListItem>
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Demo Limitations */}
        <Accordion
          expanded={expanded === 'limitations'}
          onChange={handleAccordionChange('limitations')}
          sx={{ mb: 2, boxShadow: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: '#FFF3E0',
              '&:hover': { bgcolor: '#FFE0B2' },
              px: { xs: 2, sm: 2 }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningIcon sx={{ color: '#F57C00', fontSize: { xs: 20, sm: 24 } }} />
              <Typography sx={{ fontWeight: 600, color: '#E65100', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Demo Limitations
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 2, sm: 2 } }}>
            <List dense>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <RestaurantIcon sx={{ color: '#F57C00', fontSize: { xs: 18, sm: 20 } }} />
                </ListItemIcon>
                <ListItemText
                  primary="No Real AI"
                  secondary="Uses simplified keyword-based inference, not a live AI language model"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <RestaurantIcon sx={{ color: '#F57C00', fontSize: { xs: 18, sm: 20 } }} />
                </ListItemIcon>
                <ListItemText
                  primary="Simplified Inference"
                  secondary="TPB/TTM scores are calculated using basic pattern matching"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <RestaurantIcon sx={{ color: '#F57C00', fontSize: { xs: 18, sm: 20 } }} />
                </ListItemIcon>
                <ListItemText
                  primary="No Persistence"
                  secondary="All data is stored in memory only and resets on page reload"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
              <ListItem sx={{ py: 0.5, px: 0 }}>
                <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                  <RestaurantIcon sx={{ color: '#F57C00', fontSize: { xs: 18, sm: 20 } }} />
                </ListItemIcon>
                <ListItemText
                  primary="Hardcoded Recipes"
                  secondary="Uses a fixed database of Filipino dishes, not dynamic recipe generation"
                  slotProps={{
                    primary: { sx: { fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } } },
                    secondary: { sx: { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }
                  }}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
            This is a demonstration prototype
          </Typography>
          <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
            The full application will include real AI integration, persistent storage, comprehensive nutrition tracking, and personalized meal planning features.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: { xs: 2, sm: 2 }, pt: 0, gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
          variant="outlined"
          fullWidth={false}
          sx={{
            color: '#F57C00',
            borderColor: '#F57C00',
            fontWeight: 600,
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '0.875rem' },
            width: { xs: '100%', sm: 'auto' },
            '&:hover': {
              borderColor: '#E65100',
              bgcolor: 'rgba(245, 124, 0, 0.04)'
            }
          }}
        >
          Reset Session
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth={false}
          sx={{
            bgcolor: '#4CAF50',
            color: 'white',
            fontWeight: 600,
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '0.875rem' },
            px: { xs: 2, sm: 3 },
            width: { xs: '100%', sm: 'auto' },
            '&:hover': {
              bgcolor: '#43A047'
            }
          }}
        >
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
}
