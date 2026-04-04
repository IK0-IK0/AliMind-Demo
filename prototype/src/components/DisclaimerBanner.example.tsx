/**
 * DisclaimerBanner Component Examples
 * 
 * This file demonstrates the usage of the DisclaimerBanner component
 * which displays a session-only demo disclaimer with a "Learn More" modal.
 */

import { Box, Container, Typography } from '@mui/material';
import { DisclaimerBanner } from './DisclaimerBanner';

/**
 * Example 1: Basic Usage
 * 
 * The DisclaimerBanner is typically placed at the top of a demo page
 * to inform users about the limitations of the demo.
 */
export function BasicUsageExample() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Demo Page
      </Typography>
      
      <DisclaimerBanner />
      
      <Box sx={{ mt: 3, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Typography>
          Your demo content goes here...
        </Typography>
      </Box>
    </Container>
  );
}

/**
 * Example 2: With Custom Spacing
 * 
 * You can wrap the DisclaimerBanner in a Box to control spacing
 * and positioning within your layout.
 */
export function CustomSpacingExample() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Application Demo
      </Typography>
      
      <Box sx={{ my: 4 }}>
        <DisclaimerBanner />
      </Box>
      
      <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Interactive Demo
        </Typography>
        <Typography>
          This is where your interactive demo content would be displayed.
        </Typography>
      </Box>
    </Container>
  );
}

/**
 * Example 3: Multiple Sections
 * 
 * The DisclaimerBanner can be used at the top of a page with multiple sections.
 */
export function MultipleSectionsExample() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, textAlign: 'center', color: '#2E7D32' }}>
          AliMind Demo
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: '#666' }}>
          Experience the power of AI-driven nutrition guidance
        </Typography>
        
        <DisclaimerBanner />
        
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Chat Interface
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try our conversational AI assistant
            </Typography>
          </Box>
          
          <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Meal Planning
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get personalized meal recommendations
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/**
 * Key Features:
 * 
 * 1. Material-UI Alert Component
 *    - Uses the 'info' severity for appropriate styling
 *    - Custom styling with green/teal color scheme
 * 
 * 2. Learn More Button
 *    - Opens a modal dialog with detailed demo limitations
 *    - Styled to match the application's design language
 * 
 * 3. Modal Dialog
 *    - Lists all demo limitations with icons
 *    - Provides context about the full application features
 *    - Easy to close with "Got it" button
 * 
 * 4. Responsive Design
 *    - Works well on mobile, tablet, and desktop
 *    - Follows Material-UI responsive patterns
 * 
 * 5. Accessibility
 *    - Proper ARIA labels and roles
 *    - Keyboard navigation support
 *    - Screen reader friendly
 */
