# Install New Dependencies

The page transition animations require `framer-motion`. Please run:

```bash
cd prototype
npm install
```

This will install the newly added `framer-motion` package.

## What was added:

- **framer-motion**: For smooth page transition animations between landing page and demo page
  - Landing page slides in from left when navigating from demo
  - Demo page slides in from right when navigating from landing
  - 0.3s smooth fade + slide transitions
