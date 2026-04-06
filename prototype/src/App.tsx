import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DemoPage } from './pages/DemoPage';
import { initializeBERTModels } from './services/bertInferenceBrowser';
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
  // Initialize BERT models when app starts
  useEffect(() => {
    console.log('🚀 Starting BERT model initialization...');
    initializeBERTModels()
      .then(() => {
        console.log('✅ BERT models loaded successfully!');
      })
      .catch((error) => {
        console.error('❌ Failed to load BERT models:', error);
        console.log('⚠️ Will fall back to keyword-based inference');
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPageWrapper />} />
      </Routes>
    </AnimatePresence>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  const navigateToDemo = () => {
    navigate('/demo');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <TopBar currentPage="landing" onNavigate={(page) => page === 'demo' && navigate('/demo')} />
        <Hero onTryDemo={navigateToDemo} />
        <Features />
        <HowItWorks />
        <ContactSection />
        <Footer onTryDemo={navigateToDemo} />
      </Box>
    </motion.div>
  );
}

function DemoPageWrapper() {
  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
        <TopBar currentPage="demo" onNavigate={(page) => page !== 'demo' && navigate('/')} />
        <DemoPage onBack={navigateToLanding} />
      </Box>
    </motion.div>
  );
}