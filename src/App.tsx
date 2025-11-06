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
    setIsCaseStudy(
      window.location.pathname.includes('/greex') || 
      window.location.search.includes('case=greex')
    );
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