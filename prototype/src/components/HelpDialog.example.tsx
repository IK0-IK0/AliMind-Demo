import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Help as HelpIcon } from '@mui/icons-material';
import { HelpDialog } from './HelpDialog';

/**
 * Example usage of the HelpDialog component
 * 
 * This component demonstrates:
 * - Opening and closing the help dialog
 * - Handling the reset session callback
 * - Integration with a parent component
 */
export function HelpDialogExample() {
  const [open, setOpen] = useState(false);
  const [sessionResetCount, setSessionResetCount] = useState(0);

  const handleResetSession = () => {
    setSessionResetCount(prev => prev + 1);
    console.log('Session reset triggered from HelpDialog');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32', mb: 2 }}>
          HelpDialog Component Example
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
          Click the button below to open the help dialog and learn about AliMind's features.
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<HelpIcon />}
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: '#4CAF50',
            color: 'white',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            '&:hover': {
              bgcolor: '#43A047'
            }
          }}
        >
          Open Help Dialog
        </Button>

        {sessionResetCount > 0 && (
          <Box sx={{ mt: 3, p: 2, bgcolor: '#E8F5E9', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ color: '#2E7D32', fontWeight: 600 }}>
              Session has been reset {sessionResetCount} time{sessionResetCount > 1 ? 's' : ''}
            </Typography>
          </Box>
        )}
      </Box>

      <HelpDialog
        open={open}
        onClose={() => setOpen(false)}
        onResetSession={handleResetSession}
      />

      <Box sx={{ mt: 4, p: 3, bgcolor: '#F5F5F5', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Component Features:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Seven-Step Pipeline:</strong> Explains the computational pipeline used by AliMind
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>TPB/TTM Framework:</strong> Describes the psychological frameworks in simple terms
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Demo Limitations:</strong> Lists what the demo does and doesn't include
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Reset Session:</strong> Provides a button to clear all demo state
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>Expandable Sections:</strong> Uses Material-UI Accordions for organized content
            </Typography>
          </li>
        </ul>
      </Box>

      <Box sx={{ mt: 3, p: 3, bgcolor: '#FFF3E0', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#E65100' }}>
          Usage Notes:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              The <code>open</code> prop controls dialog visibility
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              The <code>onClose</code> callback is called when the user closes the dialog
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              The <code>onResetSession</code> callback is optional and called when the user clicks "Reset Session"
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              The dialog automatically closes after reset is triggered
            </Typography>
          </li>
        </ul>
      </Box>
    </Container>
  );
}
