import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DemoPage } from './pages/DemoPage';
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#2E7D32',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#00897B',
      light: '#4DB6AC',
      dark: '#00695C',
      contrastText: '#ffffff'
    },
    background: {
      default: '#FAFAFA',
      paper: '#ffffff'
    },
    text: {
      primary: '#1B5E20',
      secondary: '#558B2F'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800
    },
    h2: {
      fontWeight: 700
    },
    h3: {
      fontWeight: 700
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 24px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    }
  }
});
export function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'demo'>('landing');
  const navigateTo = (page: string) => {
    if (page === 'demo') {
      setCurrentPage('demo');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      setCurrentPage('landing');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
        
        <TopBar currentPage={currentPage} onNavigate={navigateTo} />

        {currentPage === 'landing' ?
        <>
            <Hero onTryDemo={() => navigateTo('demo')} />
            <Features />
            <HowItWorks />
            <ContactSection />
            <Footer onTryDemo={() => navigateTo('demo')} />
          </> :

        <DemoPage onBack={() => navigateTo('landing')} />
        }
      </Box>
    </ThemeProvider>);

}