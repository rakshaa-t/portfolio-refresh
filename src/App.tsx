import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Portfolio } from './components/portfolio';
// Keep case study routes
import { GreexCaseStudy } from './components/generated/GreexCaseStudy';
import { OvaCaseStudy } from './components/generated/OvaCaseStudy';
import { IOCCaseStudy } from './components/generated/IOCCaseStudy';
import { DealdocCaseStudy } from './components/generated/DealdocCaseStudy';
import { AIPortfolioCaseStudy } from './components/generated/AIPortfolioCaseStudy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* New minimal portfolio homepage */}
        <Route path="/" element={<Portfolio />} />

        {/* Case study routes */}
        <Route path="/greex" element={<GreexCaseStudy />} />
        <Route path="/ova" element={<OvaCaseStudy />} />
        <Route path="/ioc" element={<IOCCaseStudy />} />
        <Route path="/dealdoc" element={<DealdocCaseStudy />} />
        <Route path="/ai-portfolio" element={<AIPortfolioCaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
