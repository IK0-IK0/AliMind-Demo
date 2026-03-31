# HelpDialog Component

## Overview

The `HelpDialog` component is a comprehensive help and information dialog that explains the NutriBot demo's features, theoretical framework, and limitations. It provides users with guidance on how to use the demo and what to expect from the system.

## Features

- **Seven-Step Pipeline Explanation**: Detailed breakdown of the computational pipeline used by NutriBot
- **TPB/TTM Framework Description**: User-friendly explanation of the Theory of Planned Behavior and Transtheoretical Model
- **Demo Limitations**: Clear list of what the demo does and doesn't include
- **Reset Session Functionality**: Allows users to clear all demo state and start fresh
- **Expandable Sections**: Uses Material-UI Accordions for organized, collapsible content
- **Consistent Design**: Follows the green/teal color scheme used throughout the application

## Props

```typescript
type HelpDialogProps = {
  open: boolean;              // Controls dialog visibility
  onClose: () => void;        // Called when dialog is closed
  onResetSession?: () => void; // Optional callback for session reset
};
```

## Usage

### Basic Usage

```tsx
import { useState } from 'react';
import { HelpDialog } from './components/HelpDialog';

function MyComponent() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setHelpOpen(true)}>
        Help
      </Button>
      
      <HelpDialog
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
      />
    </>
  );
}
```

### With Reset Session Callback

```tsx
import { useState } from 'react';
import { HelpDialog } from './components/HelpDialog';

function MyComponent() {
  const [helpOpen, setHelpOpen] = useState(false);

  const handleResetSession = () => {
    // Clear all state
    console.log('Session reset');
  };

  return (
    <>
      <Button onClick={() => setHelpOpen(true)}>
        Help
      </Button>
      
      <HelpDialog
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        onResetSession={handleResetSession}
      />
    </>
  );
}
```

## Content Sections

### 1. Seven-Step Pipeline

Explains the computational pipeline:
1. **Context Collection**: Extracts dietary habits, barriers, and goals
2. **TPB Inference**: Calculates Attitude, Social Support, and Confidence scores
3. **TTM Stage Classification**: Determines readiness for change
4. **Intervention Mode Selection**: Chooses appropriate intervention strategy
5. **TPB-Targeted Intervention**: Identifies weakest behavioral factor
6. **Recipe Generation**: Recommends Filipino dishes
7. **Response Generation**: Synthesizes analyses into natural language

### 2. TPB/TTM Framework

Describes the psychological frameworks:

**Theory of Planned Behavior (TPB)**:
- Attitude: How you feel about healthy eating
- Social Support: Influence from family and friends
- Confidence: Belief in your ability to make changes

**Transtheoretical Model (TTM)**:
- Pre-contemplation: Not yet considering change
- Contemplation: Thinking about change but not committed
- Preparation: Planning to change soon
- Action: Actively making changes
- Maintenance: Sustaining changes over time

### 3. Demo Limitations

Lists what the demo doesn't include:
- No real AI (uses simplified keyword-based inference)
- Simplified inference (basic pattern matching)
- No persistence (memory-only storage)
- Hardcoded recipes (fixed database)

## Styling

The component uses Material-UI components with custom styling:
- **Primary Color**: Green (#4CAF50, #2E7D32)
- **Accent Color**: Teal (#00897B)
- **Warning Color**: Orange (#F57C00, #E65100)
- **Background Colors**: Light green (#E8F5E9, #F1F8E9)
- **Border Radius**: 3 (dialog), 2 (accordions)

## Accessibility

- Uses semantic HTML with proper ARIA labels
- Keyboard navigation supported (Tab, Enter, Escape)
- Focus management handled by Material-UI Dialog
- Screen reader friendly with descriptive text

## Testing

The component includes comprehensive unit tests:
- Rendering when open/closed
- Callback invocation (onClose, onResetSession)
- Content display (all sections)
- Accordion expand/collapse behavior
- Graceful handling of missing props

Run tests:
```bash
npm test HelpDialog.test.tsx
```

## Example

See `HelpDialog.example.tsx` for a complete working example demonstrating:
- Opening and closing the dialog
- Handling reset session callback
- Integration with parent component state

## Dependencies

- `@mui/material`: Dialog, Accordion, Button, Typography, etc.
- `@mui/icons-material`: Icons for visual elements
- `react`: useState for accordion state management

## Notes

- The dialog is fully responsive and works on mobile, tablet, and desktop
- The first accordion (Seven-Step Pipeline) is expanded by default
- Clicking "Reset Session" automatically closes the dialog
- The component is designed to be used in the DemoPage context
- All content is hardcoded (no dynamic content loading)

## Future Enhancements

Potential improvements for the full application:
- Add video tutorials or animated explanations
- Include interactive examples of TPB/TTM scoring
- Add links to research papers or documentation
- Provide context-sensitive help based on user's current stage
- Add a "Quick Start" guide for first-time users
