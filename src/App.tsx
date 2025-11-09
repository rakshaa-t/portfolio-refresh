import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Theme } from './settings/types';
// %IMPORT_STATEMENT
import { PortfolioHeroSection } from './components/generated/PortfolioHeroSection'
import { GreexCaseStudy } from './components/generated/GreexCaseStudy'

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.p
          className="text-white/60 text-sm font-light"
          style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  useEffect(() => {
    // Wait for fonts and initial render
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Show loader for at least 800ms for smooth transition

    // Also check if fonts are loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTimeout(() => setIsLoading(false), 300);
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    // On feature/greex-page branch: Always show Greex case study
    return <GreexCaseStudy />;
  }, []);

  if (container === 'centered') {
    return (
      <>
        <AnimatePresence>
          {isLoading && <LoadingSpinner />}
        </AnimatePresence>
        <div className="h-full w-full flex flex-col items-center justify-center">
          {generatedComponent}
        </div>
      </>
    );
  } else {
    return (
      <>
        <AnimatePresence>
          {isLoading && <LoadingSpinner />}
        </AnimatePresence>
        {generatedComponent}
      </>
    );
  }
}

export default App;