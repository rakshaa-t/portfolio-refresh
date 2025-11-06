import { useMemo, useState, useEffect } from 'react';
import { Container, Theme } from './settings/types';
// %IMPORT_STATEMENT
import { PortfolioHeroSection } from './components/generated/PortfolioHeroSection'
import { GreexCaseStudy } from './components/generated/GreexCaseStudy'

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  // Check URL for case study route
  const [isCaseStudy, setIsCaseStudy] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const params = new URLSearchParams(window.location.search);
      const hasCaseParam = params.get('case') === 'greex';
      const hasPath = window.location.pathname.includes('/greex');
      const result = hasCaseParam || hasPath;
      setIsCaseStudy(result);
    };

    checkRoute();

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    if (isCaseStudy) {
      return <GreexCaseStudy />;
    }
    return <PortfolioHeroSection />; // %EXPORT_STATEMENT%
  }, [isCaseStudy]);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default App;