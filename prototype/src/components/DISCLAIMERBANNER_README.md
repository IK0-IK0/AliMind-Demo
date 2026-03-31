# DisclaimerBanner Component

## Overview

The `DisclaimerBanner` component displays a prominent disclaimer message informing users that the demo is session-only with no data persistence. It includes a "Learn More" button that opens a modal dialog with detailed information about demo limitations.

## Purpose

This component addresses the requirement for prototype clarity by:
- Clearly communicating that the demo is session-only
- Explaining that all data resets on page reload
- Providing detailed information about demo limitations via a modal
- Setting appropriate user expectations for the prototype

## Features

- **Material-UI Alert Component**: Uses the `info` severity with custom styling
- **Learn More Button**: Opens a modal with detailed demo limitations
- **Modal Dialog**: Lists 5 key limitations with icons and descriptions
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Green/Teal Color Scheme**: Matches the application's design language

## Usage

### Basic Usage

```tsx
import { DisclaimerBanner } from '../components/DisclaimerBanner';

function DemoPage() {
  return (
    <Container>
      <DisclaimerBanner />
      {/* Your demo content */}
    </Container>
  );
}
```

### Integration in DemoPage

The component is integrated at the top of the DemoPage, just before the ChatbotShowcase:

```tsx
<Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
  Try asking about protein, calories, meal ideas, vitamins, or diet tips.
</Typography>

<DisclaimerBanner />
<ChatbotShowcase />
```

## Component Structure

### Main Alert Banner

- **Severity**: `info` (blue theme)
- **Icon**: `InfoIcon` from Material-UI
- **Message**: "This is a session-only demo. All data resets on page reload. No information is saved."
- **Button**: "Learn More" button with outlined style

### Modal Dialog

The modal displays the following limitations:

1. **Session-only storage**: All conversations and data are stored in browser memory only
2. **No data persistence**: Refreshing the page or closing the browser will reset all data
3. **Simulated responses**: The chatbot uses pre-programmed logic, not a live AI backend
4. **No user accounts**: This demo does not support user registration or authentication
5. **Limited functionality**: Advanced features like meal planning and progress tracking are not available

## Styling

### Alert Styling

```tsx
sx={{
  mb: 2,
  borderRadius: 2,
  bgcolor: '#E3F2FD',
  border: '1px solid #90CAF9',
}}
```

### Button Styling

```tsx
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
```

### Modal Styling

- **Title Background**: `#E8F5E9` (light green)
- **Title Color**: `#2E7D32` (dark green)
- **Border Radius**: `3` for rounded corners
- **List Icons**: `CheckCircleIcon` in green (`#4CAF50`)

## State Management

The component uses a single state variable:

```tsx
const [modalOpen, setModalOpen] = useState(false);
```

- `modalOpen`: Controls the visibility of the modal dialog
- `handleOpenModal()`: Sets `modalOpen` to `true`
- `handleCloseModal()`: Sets `modalOpen` to `false`

## Accessibility

- **ARIA Labels**: Buttons have proper labels for screen readers
- **Keyboard Navigation**: Modal can be closed with Escape key
- **Focus Management**: Focus is trapped within the modal when open
- **Semantic HTML**: Uses proper heading hierarchy and list structure

## Testing

The component includes unit tests that verify:

1. Component exports correctly
2. Disclaimer message content is accurate
3. Modal limitation items are defined
4. Button labels are correct
5. Modal title is correct

Run tests with:

```bash
npm test -- DisclaimerBanner.test.tsx
```

## Examples

See `DisclaimerBanner.example.tsx` for detailed usage examples including:

- Basic usage in a demo page
- Custom spacing and positioning
- Integration with multiple sections

## Dependencies

- `@mui/material`: Alert, Typography, Button, Dialog, Box, List components
- `@mui/icons-material`: Info and CheckCircle icons
- `react`: useState hook

## Design Decisions

1. **Blue Alert Theme**: Uses blue (`info` severity) instead of green to differentiate from success messages and match informational content
2. **Outlined Button**: Uses outlined style to be less prominent than primary actions
3. **Modal Instead of Inline**: Detailed limitations are in a modal to avoid cluttering the main page
4. **List Format**: Limitations are presented as a list with icons for easy scanning
5. **Green Modal Header**: Modal header uses green to maintain brand consistency

## Future Enhancements

Potential improvements for the full application:

- Add animation when the banner appears
- Include a "Don't show again" option for returning users
- Add analytics tracking for "Learn More" clicks
- Customize limitations based on which features are available in the demo
- Add a link to sign up for the full application

## Related Components

- **ChatbotShowcase**: The main demo component that this banner describes
- **DemoPage**: The page that contains both the banner and the chatbot

## Requirements Satisfied

This component satisfies task 8.1 from the prototype-application-modifications spec:

- ✅ Create DisclaimerBanner component
- ✅ Display: "This is a session-only demo. All data resets on page reload. No information is saved."
- ✅ Add "Learn More" button with modal explaining demo limitations
- ✅ Style with Material-UI Alert component
- ✅ Follow existing green/teal color scheme
- ✅ Integrate into DemoPage
