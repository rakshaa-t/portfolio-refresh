"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import useScroll from "../../hooks/useScroll";

// Image assets from Figma MCP
const imgRectangle1553 = "https://www.figma.com/api/mcp/asset/3a49c6e6-b7c9-4cde-b76b-a62035d160d9";
const imgMacBookPro1612 = "https://www.figma.com/api/mcp/asset/cabc1275-335c-4394-aff8-389d326436fc";
const imgMaskGroup21 = "https://www.figma.com/api/mcp/asset/6ab40a60-3842-41f8-adee-3d08f73418e4";
const imgLandingPage1 = "https://www.figma.com/api/mcp/asset/53a5a5a8-ac1f-456a-a4bc-22878178b7cc";
const imgDashboard1 = "https://www.figma.com/api/mcp/asset/dfa05a46-317f-499e-bdec-95036b37a475";
const imgSelectCoin1 = "https://www.figma.com/api/mcp/asset/024669ed-9ee7-4839-a0fe-42308b05e4dd";
const imgLiveTracking1 = "https://www.figma.com/api/mcp/asset/1ac28f1f-efd0-41a3-9a0c-72ec6baddae6";
const imgLearnToEarn1 = "https://www.figma.com/api/mcp/asset/1622ed6a-b33e-40fe-ad29-982eeca2024d";
const imgLanding1 = "https://www.figma.com/api/mcp/asset/b5a98f24-573a-4019-9b7c-850322a760fa";
const imgLeaderboard1 = "https://www.figma.com/api/mcp/asset/8fac8db3-28c1-4ba9-89c3-eda8a77cfa3f";
const img22 = "https://www.figma.com/api/mcp/asset/fc89f118-33a6-41de-90f2-9a58ecc2eaa4";
const img21 = "https://www.figma.com/api/mcp/asset/9e6217b9-e58f-4326-b23f-854289b5abd9";
const imgCallOptionHover1 = "https://www.figma.com/api/mcp/asset/287a05f1-a4b1-4e92-81c1-923f5d4bbef3";
const imgCallOptionHover2 = "https://www.figma.com/api/mcp/asset/a85d741b-7eda-4628-b5fc-23f536bcec85";
const imgCallOptionHover3 = "https://www.figma.com/api/mcp/asset/b91eaf50-258e-41f3-b075-455f0704b168";
const imgCallOptionHover4 = "https://www.figma.com/api/mcp/asset/3d54af99-ce33-4f9b-ad49-2a71978bf764";
const imgCallOptionHover5 = "https://www.figma.com/api/mcp/asset/77f88f79-eb3a-47b5-b156-ab60888ff0ba";
const imgFrame75601 = "https://www.figma.com/api/mcp/asset/896012a7-d2a3-425c-8dc8-f9a65bd24558";
const imgGreexOptionsTrading6611 = "https://www.figma.com/api/mcp/asset/16064e6b-6392-459b-9aec-2c3a0673b829";
const imgLandingPage2 = "https://www.figma.com/api/mcp/asset/db653706-9b9a-4e62-83b4-63d0f5669caf";
const imgDashboard2 = "https://www.figma.com/api/mcp/asset/21ac8eae-c325-4d47-b354-554f9d772c13";
const imgSelectCoin2 = "https://www.figma.com/api/mcp/asset/b2a8c3d3-e9e1-4240-bd7f-c517d341956a";
const imgLiveTracking2 = "https://www.figma.com/api/mcp/asset/b04de2e3-ceeb-4020-b542-273e485df870";
const imgLearnToEarn2 = "https://www.figma.com/api/mcp/asset/c6e6a420-2748-4078-ad74-5c3094b053c3";
const imgLanding2 = "https://www.figma.com/api/mcp/asset/b0858933-0d56-42b9-9240-4adc30f44904";
const imgLeaderboard2 = "https://www.figma.com/api/mcp/asset/aa3751ae-c5bc-4c82-9dda-a964c43cc6f6";
const img23 = "https://www.figma.com/api/mcp/asset/50831d91-3b14-41ce-a8ac-f2264de340c7";
const img24 = "https://www.figma.com/api/mcp/asset/6b253b6e-78c3-4325-ab17-58d01bb97f68";
const imgLanding3 = "https://www.figma.com/api/mcp/asset/8c2508dd-0113-4fb4-9f65-2cc6de89ec67";
const imgLeaderboard3 = "https://www.figma.com/api/mcp/asset/6bd1c687-06ec-4a44-8a00-f9d79f8bd496";
const img25 = "https://www.figma.com/api/mcp/asset/7d6d8e50-7633-4e2c-b497-a6f542295627";
const img26 = "https://www.figma.com/api/mcp/asset/b4576607-fe63-41c7-9353-a0e03c3c683d";
const img27 = "https://www.figma.com/api/mcp/asset/68029f07-6286-4001-b5fd-8f5966b202dd";
const imgLeaderboard4 = "https://www.figma.com/api/mcp/asset/e613c28c-3a03-44ad-af89-b92ace74105d";
const imgLanding4 = "https://www.figma.com/api/mcp/asset/83f5f77c-874a-43a0-85a4-d2e30459ccc5";
const img28 = "https://www.figma.com/api/mcp/asset/07893053-faca-4e1b-aee0-6b2ada035045";
const img29 = "https://www.figma.com/api/mcp/asset/db512b73-855b-49a6-9c46-5aa44bdc5ce7";
const img30 = "https://www.figma.com/api/mcp/asset/509adcae-b726-44f7-91c3-b6ead08abb08";
const img31 = "https://www.figma.com/api/mcp/asset/d6522f4c-fe86-4630-b085-0ff457eb0b64";
const imgLeaderboard5 = "https://www.figma.com/api/mcp/asset/257f5661-fb53-400b-8863-0f8faa83824f";
const img32 = "https://www.figma.com/api/mcp/asset/8cca311e-5d9f-4a24-bec4-ca2a56cef601";
const img33 = "https://www.figma.com/api/mcp/asset/301ae03a-2db1-4d6a-8bff-0255e3938ddd";
const imgLanding5 = "https://www.figma.com/api/mcp/asset/18402f35-e7a7-4a3e-a0b2-d908ae037352";
const imgCallOptionHover6 = "https://www.figma.com/api/mcp/asset/3f479ff7-12ec-4063-9086-40a8b1f181e9";
const imgScreenshot20251030At41829Pm1 = "https://www.figma.com/api/mcp/asset/8d7b97dc-03e8-4446-98d6-f0866a3b8656";
const imgRectangle1542 = "https://www.figma.com/api/mcp/asset/2f0c653c-d87b-4bbf-8081-dd8c2aa5097f";
const imgRectangle1543 = "https://www.figma.com/api/mcp/asset/862e3dd1-fc67-4ebb-98ec-6563c34b3f53";
const imgRectangle1544 = "https://www.figma.com/api/mcp/asset/b43616c4-a2f2-4a0f-8aa8-3d98d00021fb";
const imgGroup1171274695 = "https://www.figma.com/api/mcp/asset/8cd249e4-b63f-4aa7-8cf5-d26d385009d1";
const imgGroup1171274696 = "https://www.figma.com/api/mcp/asset/0c9c7dd8-e336-432d-9b29-9f67fa311124";
const imgLinkedIn = "https://www.figma.com/api/mcp/asset/8748859f-b381-442f-9373-04682fed260a";
const imgX = "https://www.figma.com/api/mcp/asset/e4a3a7ec-771c-4706-a077-3f43fb090d56";

export const GreexCaseStudy: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState("Overview");
  const [heroImageLoaded, setHeroImageLoaded] = React.useState(false);
  const [isManualScroll, setIsManualScroll] = React.useState(false);
  
  // Scroll tracking for navigation bar
  const { y, directionY } = useScroll();
  const headerTriggerY = 50;

  // Scroll-based section detection
  React.useEffect(() => {
    const sections = ['overview', 'strategy', 'product', 'final-thoughts'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px', // Trigger when section top is 100px from viewport top
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Don't override manual tab selection during scroll animation
      if (isManualScroll) return;
      
      // Find the section that's currently most visible at the top
      let activeEntry: IntersectionObserverEntry | null = null;
      let maxTopRatio = -1;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const topRatio = Math.max(0, (window.innerHeight - rect.top) / window.innerHeight);
          
          // Prefer sections that are closer to the top of the viewport
          if (rect.top <= 200 && topRatio > maxTopRatio) {
            maxTopRatio = topRatio;
            activeEntry = entry;
          }
        }
      }

      // If no section is at the top, find the first intersecting section
      if (activeEntry === null) {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeEntry = entry;
            break;
          }
        }
      }

      if (activeEntry !== null) {
        const target = activeEntry.target;
        if (target instanceof HTMLElement) {
          const sectionId = target.id;
          // Map section IDs to display names
          const sectionMap: { [key: string]: string } = {
            'overview': 'Overview',
            'strategy': 'Strategy',
            'product': 'Product',
            'final-thoughts': 'Final Thoughts'
          };
          if (sectionMap[sectionId]) {
            setActiveSection(sectionMap[sectionId]);
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Also check on scroll for more accurate detection
    const handleScroll = () => {
      // Don't override manual tab selection during scroll animation
      if (isManualScroll) return;
      
      const scrollPosition = window.scrollY + 200; // Offset for header
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            const sectionMap: { [key: string]: string } = {
              'overview': 'Overview',
              'strategy': 'Strategy',
              'product': 'Product',
              'final-thoughts': 'Final Thoughts'
            };
            if (sectionMap[sections[i]]) {
              setActiveSection(sectionMap[sections[i]]);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isManualScroll]);

  const scrollToSection = (sectionId: string) => {
    // Set active immediately when clicked
    setActiveSection(sectionId);
    
    // Prevent scroll handler from overriding during scroll animation
    setIsManualScroll(true);
    
    // Map section names to their actual IDs
    const sectionIdMap: { [key: string]: string } = {
      'Overview': 'overview',
      'Strategy': 'strategy',
      'Product': 'product',
      'Final Thoughts': 'final-thoughts'
    };
    
    const actualId = sectionIdMap[sectionId] || sectionId.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(actualId);
    
    if (element) {
      const headerHeight = 71;
      const yOffset = -headerHeight - 20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Reset manual scroll flag after scroll animation completes
      // Use longer timeout for sections further down the page
      const timeout = actualId === 'final-thoughts' ? 1500 : 1000;
      setTimeout(() => {
        setIsManualScroll(false);
      }, timeout);
    } else {
      // If element not found, still keep manual scroll flag for a bit
      setTimeout(() => {
        setIsManualScroll(false);
      }, 1000);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#111111', 
      position: 'relative', 
      width: '100%', 
      minHeight: '16763px',
      overflowX: 'hidden',
      maxWidth: '1728px',
      margin: '0 auto'
    }}>
      {/* Background Blurs */}
      <motion.div 
        initial={{ x: '-50%' }}
        animate={{ x: '-50%' }}
        style={{
          position: 'absolute',
          width: '1472px',
          height: '761px',
          left: '50%',
          top: '281px',
          backgroundColor: '#373737',
          borderRadius: '4444px',
          filter: 'blur(200px)',
          pointerEvents: 'none',
          zIndex: -2
        }}
      />
      <motion.div 
        initial={{ x: '-50%' }}
        animate={{ x: '-50%' }}
        style={{
          position: 'absolute',
          width: '1629px',
          height: '842px',
          left: '50%',
          top: '537px',
          backgroundColor: '#2d2d2d',
          borderRadius: '4444px',
          filter: 'blur(200px)',
          pointerEvents: 'none',
          zIndex: -2
        }}
      />
      {/* Navigation - Responsive */}
      <nav className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        y > headerTriggerY && directionY === 'down' ? '-translate-y-[128px]' : 'translate-y-0'
      }`}>
        {/* Backdrop blur with gradient fade */}
        <div className="absolute inset-0 z-[-1] backdrop-blur-[11px] [mask-image:linear-gradient(to_top,transparent,black_65%)]" 
          style={{
            background: 'rgba(255,255,255,0.01)'
          }}
        />
        
        {/* Mobile Header - visible on mobile, hidden on desktop */}
        <div className="flex md:hidden items-center justify-center h-full w-full p-3 gap-[200px]">
            {/* Logo - "raks" */}
          <div className="text-center text-white text-4xl font-medium break-words" style={{ fontFamily: 'Neulis Cursive, cursive, serif' }}>
              raks
          </div>

            {/* Social Icons (Mobile) */}
          <div className="flex items-center gap-4 opacity-44">
              <a
                href="https://linkedin.com/in/raksha-t"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: '29px',
                  height: '29px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.9583 3.625C23.5993 3.625 24.214 3.87961 24.6672 4.33283C25.1204 4.78604 25.375 5.40073 25.375 6.04167V22.9583C25.375 23.5993 25.1204 24.214 24.6672 24.6672C24.214 25.1204 23.5993 25.375 22.9583 25.375H6.04167C5.40073 25.375 4.78604 25.1204 4.33283 24.6672C3.87961 24.214 3.625 23.5993 3.625 22.9583V6.04167C3.625 5.40073 3.87961 4.78604 4.33283 4.33283C4.78604 3.87961 5.40073 3.625 6.04167 3.625H22.9583ZM22.3542 22.3542V15.95C22.3542 14.9053 21.9391 13.9033 21.2004 13.1646C20.4617 12.4259 19.4597 12.0108 18.415 12.0108C17.3879 12.0108 16.1917 12.6392 15.6117 13.5817V12.2404H12.2404V22.3542H15.6117V16.3971C15.6117 15.4667 16.3608 14.7054 17.2913 14.7054C17.7399 14.7054 18.1702 14.8836 18.4874 15.2009C18.8047 15.5181 18.9829 15.9484 18.9829 16.3971V22.3542H22.3542ZM8.31333 10.3433C8.85172 10.3433 9.36806 10.1295 9.74876 9.74876C10.1295 9.36806 10.3433 8.85172 10.3433 8.31333C10.3433 7.18958 9.43708 6.27125 8.31333 6.27125C7.77174 6.27125 7.25233 6.4864 6.86936 6.86936C6.4864 7.25233 6.27125 7.77174 6.27125 8.31333C6.27125 9.43708 7.18958 10.3433 8.31333 10.3433ZM9.99292 22.3542V12.2404H6.64583V22.3542H9.99292Z" fill="var(--color-dark-900, #020617)" />
                </svg>
              </a>

              <a
                href="https://twitter.com/rakshatated"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                style={{
                  width: '24px',
                  height: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.5859 21.375L14.0885 10.4471L14.1013 10.4574L20.8613 2.625H18.6023L13.0954 9L8.72227 2.625H2.79766L9.79723 12.8276L9.79638 12.8267L2.41406 21.375H4.67309L10.7955 14.2824L15.6613 21.375H21.5859ZM7.82719 4.32954L18.3466 19.6705H16.5564L6.02852 4.32954H7.82719Z" fill="var(--color-dark-900, #020617)" />
                </svg>
              </a>
            </div>
          </div>

        {/* Desktop Navigation - hidden on mobile, visible on desktop (md:) */}
        <div className="hidden md:flex w-full px-20 py-2.5 justify-between items-center">
            {/* Logo - "raks" */}
          <div className="text-center text-white text-4xl font-medium break-words" style={{ fontFamily: 'Neulis Cursive, cursive, serif' }}>
            raks
            </div>

            {/* Social Icons */}
          <div className="w-[73px] opacity-44 flex justify-between items-center">
              {/* LinkedIn Icon */}
              <a
                href="https://linkedin.com/in/raksha-t"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:opacity-100 transition-opacity"
                style={{
                  width: '29px',
                  height: '29px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.9583 3.625C23.5993 3.625 24.214 3.87961 24.6672 4.33283C25.1204 4.78604 25.375 5.40073 25.375 6.04167V22.9583C25.375 23.5993 25.1204 24.214 24.6672 24.6672C24.214 25.1204 23.5993 25.375 22.9583 25.375H6.04167C5.40073 25.375 4.78604 25.1204 4.33283 24.6672C3.87961 24.214 3.625 23.5993 3.625 22.9583V6.04167C3.625 5.40073 3.87961 4.78604 4.33283 4.33283C4.78604 3.87961 5.40073 3.625 6.04167 3.625H22.9583ZM22.3542 22.3542V15.95C22.3542 14.9053 21.9391 13.9033 21.2004 13.1646C20.4617 12.4259 19.4597 12.0108 18.415 12.0108C17.3879 12.0108 16.1917 12.6392 15.6117 13.5817V12.2404H12.2404V22.3542H15.6117V16.3971C15.6117 15.4667 16.3608 14.7054 17.2913 14.7054C17.7399 14.7054 18.1702 14.8836 18.4874 15.2009C18.8047 15.5181 18.9829 15.9484 18.9829 16.3971V22.3542H22.3542ZM8.31333 10.3433C8.85172 10.3433 9.36806 10.1295 9.74876 9.74876C10.1295 9.36806 10.3433 8.85172 10.3433 8.31333C10.3433 7.18958 9.43708 6.27125 8.31333 6.27125C7.77174 6.27125 7.25233 6.4864 6.86936 6.86936C6.4864 7.25233 6.27125 7.77174 6.27125 8.31333C6.27125 9.43708 7.18958 10.3433 8.31333 10.3433ZM9.99292 22.3542V12.2404H6.64583V22.3542H9.99292Z" fill="var(--color-dark-900, #020617)" />
                </svg>
              </a>

              {/* X (Twitter) Icon */}
              <a
                href="https://twitter.com/rakshatated"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:opacity-100 transition-opacity"
                style={{
                  width: '24px',
                  height: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.5859 21.375L14.0885 10.4471L14.1013 10.4574L20.8613 2.625H18.6023L13.0954 9L8.72227 2.625H2.79766L9.79723 12.8276L9.79638 12.8267L2.41406 21.375H4.67309L10.7955 14.2824L15.6613 21.375H21.5859ZM7.82719 4.32954L18.3466 19.6705H16.5564L6.02852 4.32954H7.82719Z" fill="var(--color-dark-900, #020617)" />
                </svg>
              </a>
            </div>
          </div>
        </nav>

      {/* Sticky Navigation Menu - Hidden to prevent showing behind cards */}
      <div style={{
        position: 'absolute',
        left: '50%',
        
        top: '930px',
        width: '866px',
        display: 'none'
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          
          top: '930px',
          width: '866px',
          height: '112px',
          backgroundColor: 'rgba(17, 17, 17, 0.22)',
          backdropFilter: 'blur(2px)',
          filter: 'blur(50px)'
        }} />
        <div style={{
          position: 'absolute',
          left: '50%',
          
          top: '953px',
          backdropFilter: 'blur(22px)',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: '16px',
          padding: '12px 32px 18px',
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}>
          {['Overview', 'Strategy', 'Tele Bots', 'Product', 'Final Thoughts', 'Feedback'].map((section) => {
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                style={{
                  fontFamily: 'Nexa, system-ui, sans-serif',
                  fontWeight: isActive ? '700' : '400',
                  fontSize: '16px',
                  color: isActive ? 'white' : 'rgba(255, 255, 255, 0.44)',
                  background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  backdropFilter: isActive ? 'blur(8px)' : 'none',
                  WebkitBackdropFilter: isActive ? 'blur(8px)' : 'none',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  paddingTop: isActive ? '14px' : '12px',
                  paddingBottom: isActive ? '14px' : '12px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  margin: 0,
                  lineHeight: '1',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle'
                }}
              >
                <span style={{ 
                  display: 'inline-block',
                  lineHeight: '1',
                  verticalAlign: 'middle'
                }}>
                  {section}
                </span>
              </button>
            );
          })}
        </div>
        <div style={{
          position: 'absolute',
          left: '50%',
          
          top: '997px',
          width: '626px',
          height: '0px'
        }}>
          <img alt="" src={imgGroup1171274695} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        id="overview" 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '194px',
          width: '1293px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'flex-start'
        }}
      >
        <h1 style={{
          fontFamily: 'Nexa, system-ui, sans-serif',
          fontWeight: 'bold',
          fontSize: '22px',
          color: 'white',
          margin: 0,
          width: '100%'
        }}>
          Greex : A defi Trading platform
        </h1>
        <p style={{
          fontFamily: 'Outfit, system-ui, sans-serif',
          fontWeight: 300,
          fontSize: '17px',
          color: 'rgba(255, 255, 255, 0.8)',
          margin: 0,
          width: '100%',
          lineHeight: '24px'
        }}>
          Greex was an interesting case study because this was my stepping stone in the world of crypto. Intended to be a defi trading platform for options and futures. The USP was that they were looking to add pre built strategies within the platform that users could apply to their trades and get insights on which trade would bring what kind of impact. This was directed towards users that needed help with understanding aspects of trading options and futures and the probabilities that come with each trade.
        </p>
      </motion.div>

      {/* Project Image */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '367px',
          width: '1293px',
          height: '833px',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Blurred version - shows while image loads */}
        <img 
          alt="Greex Project" 
          src={imgRectangle1553} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            borderRadius: '12px',
            position: 'absolute',
            inset: 0,
            filter: heroImageLoaded ? 'blur(0px)' : 'blur(20px)',
            transform: heroImageLoaded ? 'scale(1)' : 'scale(1.1)',
            transition: 'filter 0.6s ease-out, transform 0.6s ease-out, opacity 0.6s ease-out',
            opacity: 1,
            zIndex: 1
          }} 
        />
        {/* Full quality image - fades in when loaded */}
        <img 
          alt="Greex Project" 
          src={imgRectangle1553} 
          onLoad={() => setHeroImageLoaded(true)}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            borderRadius: '12px',
            position: 'absolute',
            inset: 0,
            opacity: heroImageLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease-out',
            zIndex: 2
          }} 
        />
      </motion.div>

      {/* What I did Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '1260px',
          width: '1293px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          height: '315px'
        }}
      >
        {/* Title */}
        <div style={{
          alignSelf: 'stretch',
          color: 'white',
          fontSize: '22px',
          fontFamily: 'Nexa, system-ui, sans-serif',
          fontWeight: '700',
          wordWrap: 'break-word'
        }}>
          What I did
        </div>

        {/* Container for borders and content */}
        <div style={{ position: 'relative', width: '1293px', height: '266px' }}>
          {/* Top border */}
          <div style={{
            width: '1293px',
            height: '88px',
            position: 'absolute',
            top: '0',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            border: '1px white solid'
          }} />

          {/* Row 1 Content - positioned over top border */}
          <div style={{
            width: '1235px',
            position: 'absolute',
            top: '0',
            left: '29px',
            height: '88px',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex'
          }}>
            <div style={{
              color: 'rgba(214.88, 214.88, 214.88, 0.80)',
              fontSize: '17px',
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              Product Design
            </div>
            <div style={{
              color: 'white',
              fontSize: '17px',
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              UX flows , UI design , Mobile Responsive Design
            </div>
          </div>

          {/* Middle border */}
          <div style={{
            width: '1293px',
            height: '90px',
            position: 'absolute',
            top: '88px',
            borderLeft: '1px white solid',
            borderRight: '1px white solid'
          }} />

          {/* Row 2 Content - positioned inside middle border */}
          <div style={{
            width: '1235px',
            left: '29px',
            top: '122.5px',
            position: 'absolute',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            display: 'flex'
          }}>
            <div style={{
              color: 'rgba(214.88, 214.88, 214.88, 0.80)',
              fontSize: '17px',
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              Game Design
            </div>
            <div style={{
              color: 'white',
              fontSize: '17px',
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              Designed Telegram bots for quick gamified trading experiences and parlays
            </div>
          </div>

          {/* Bottom border */}
          <div style={{
            width: '1293px',
            height: '88px',
            position: 'absolute',
            top: '178px',
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px',
            border: '1px white solid'
          }} />

          {/* Row 3 Content - positioned over bottom border */}
          <div style={{
            width: '1235px',
            position: 'absolute',
            top: '178px',
            left: '29px',
            height: '88px',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex'
          }}>
            <div style={{
              color: 'rgba(214.88, 214.88, 214.88, 0.80)',
              fontSize: '17px',
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              Design System
            </div>
            <div style={{
              color: 'white',
              fontSize: '17px',
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              Foundations (Tokens for color, typography, spacing, radii, grid, and breakpoints) and Components (Reusable UI)
            </div>
          </div>
        </div>
      </motion.div>

      {/* Strategy Section */}
      <motion.div 
        id="strategy" 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '1918px',
          width: '1293px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          alignItems: 'flex-start'
        }}
      >
        <h2 style={{
          fontFamily: 'Nexa, system-ui, sans-serif',
          fontWeight: 'bold',
          fontSize: '22px',
          color: 'white',
          margin: 0
        }}>
          Strategy
        </h2>
        <div style={{
          fontFamily: 'Outfit, system-ui, sans-serif',
          fontWeight: 300,
          fontSize: '17px',
          color: 'rgba(255, 255, 255, 0.8)',
          lineHeight: '24px',
          width: '100%'
        }}>
          <p style={{ marginBottom: '18px' }}>
            The goal was clear - we had to design the website in such a way that visually conveys the strategies + data in a simplified manner and allows an at-glance understanding of Strategies like Long Call Butterfly Spread, Bear Put Spread, Bull Call Spread etc.
          </p>
          <p style={{ marginBottom: '18px' }}>
            There was a lot of display of data that needed to be designed in cards that looked clean and provided the user with all necessary raw material to make the trade decision. Due to a lot of data the goal was to allow progress disclosure of information vs dumping all the data on a trade screen unlike what the traditional trading platforms do.
          </p>
          <p>
            For there Telegram bots we decided to go with the vision of using "Greek Mythology" as our inspiration, combing "greeks" - the term of the trading world and combing those two to be our anchor for the design system. As for the UI design dark theme was the trend for crypto startups in 2024 and we decided to primarily focus on dark theme + a variation of light theme for future use.
          </p>
        </div>
      </motion.div>

      {/* Main Features & Star Feature */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '1635px',
          width: '1293px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '223px',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '637px'
        }}>
          <h3 style={{
            fontFamily: 'Nexa, system-ui, sans-serif',
            fontWeight: 'bold',
            fontSize: '22px',
            color: 'white',
            margin: 0
          }}>
            Main Features
          </h3>
          <div style={{
            backgroundColor: '#111111',
            border: '1px solid white',
            height: '172px',
            borderRadius: '8px',
            padding: '26px 32px',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            <ul style={{
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontWeight: 300,
              fontSize: '17px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '24px',
              margin: 0,
              paddingLeft: '25.5px',
              listStyle: 'disc'
            }}>
              <li>Browse and apply prebuilt trading strategies</li>
              <li>View strategy logic, risk profile, and expected outcomes</li>
              <li>Place trades confidently through a simplified execution UI</li>
              <li>Track trades and performance in real time through a clear portfolio dashboard</li>
            </ul>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '223px',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '608px'
        }}>
          <h3 style={{
            fontFamily: 'Nexa, system-ui, sans-serif',
            fontWeight: 'bold',
            fontSize: '22px',
            color: 'white',
            margin: 0
          }}>
            Star Feature
          </h3>
          <div style={{
            backgroundColor: '#111111',
            border: '1px solid white',
            height: '172px',
            borderRadius: '8px',
            padding: '38px 34px',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            <p style={{
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontWeight: 300,
              fontSize: '17px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '24px',
              margin: 0,
              width: '540px'
            }}>
              The strategic decision to educate users while letting them act and make pre built strategies that users can apply to their trades whilst also educating them on how those strategies worked and the probobality of PNL they bring
            </p>
          </div>
        </div>
      </motion.div>

      {/* MacBook Pro Image Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '2245px',
          width: '1293px',
          height: '603px',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img alt="MacBook Pro" src={imgMacBookPro1612} style={{ width: '100%', height: '86.63%', position: 'absolute', top: '3.9%', left: 0 }} />
        </div>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '329px',
          height: '186px'
        }}>
          <img alt="Mask group" src={imgMaskGroup21} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </motion.div>

      {/* Telegram Bots Section */}
      <motion.div 
        id="tele-bots" 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '2888px',
          width: '1293px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          alignItems: 'flex-start'
        }}
      >
        <h2 style={{
          fontFamily: 'Nexa, system-ui, sans-serif',
          fontWeight: 'bold',
          fontSize: '22px',
          color: 'white',
          margin: 0
        }}>
          Tele Bots
        </h2>
        <p style={{
          fontFamily: 'Outfit, system-ui, sans-serif',
          fontWeight: 300,
          fontSize: '17px',
          color: 'white',
          lineHeight: '24px',
          margin: 0,
          width: '100%'
        }}>
          For the desktop trading platform we knew what we wanted to go with which was standard trading screens, strategy cards, line and candle graphs, and trade screens. However where we had more creative freedom was with the Telegram bots as they were supposed to be gamified trading mini apps for enthusiasts and rookies. Since these were gamified experiences we used an experimental approach for LED style CTAs, louder graphics and colors.
        </p>
      </motion.div>

      {/* Telegram Bot Screenshots Gallery */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '3071px',
          width: '1289px',
          display: 'flex',
          flexDirection: 'column',
          height: '1072px',
          justifyContent: 'space-between'
        }}
      >
        <div style={{
          display: 'flex',
          gap: '41px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          {[
            { src: imgLandingPage1, name: 'Landing Page' },
            { src: imgDashboard1, name: 'Dashboard' },
            { src: imgSelectCoin1, name: 'Select coin' },
            { src: imgLiveTracking1, name: 'Live Tracking' },
            { src: imgLearnToEarn1, name: 'Learn to earn' }
          ].map((img, idx) => (
            <div key={idx} style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              height: '488px',
              borderRadius: '22px',
              width: '225px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img alt={img.name} src={img.src} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '22px' }} />
            </div>
          ))}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '1028px'
        }}>
          {[
            { src: imgLanding1, name: 'Landing' },
            { src: imgLeaderboard1, name: 'Leaderboard' },
            { src: img22, name: '#2' },
            { src: img21, name: '#2' }
          ].map((img, idx) => (
            <div key={idx} style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              height: idx === 1 || idx === 3 ? '490px' : '488px',
              borderRadius: '22px',
              width: idx === 1 || idx === 3 ? '226px' : '225px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img alt={img.name} src={img.src} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '22px' }} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Product Section */}
      <motion.div 
        id="product" 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '4203px',
          width: '1293px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          alignItems: 'flex-start'
        }}
      >
        <h2 style={{
          fontFamily: 'Nexa, system-ui, sans-serif',
          fontWeight: 'bold',
          fontSize: '22px',
          color: 'white',
          margin: 0
        }}>
          Product
        </h2>
        <p style={{
          fontFamily: 'Outfit, system-ui, sans-serif',
          fontWeight: 300,
          fontSize: '17px',
          color: 'white',
          lineHeight: '24px',
          margin: 0,
          width: '100%'
        }}>
          We studied the flow of options and futures trading flow and decided to start with the trading screens first , when I was onboarded a lot of trading screens were already designed so I had to pick up from where it was left off. The trading screens had to include basic actions like call and put, browse through markets and have data visuals in the form og graphs and cards. The challenge was to make the trade screens as less bloated as possible.
        </p>
      </motion.div>

      {/* Product Screenshots */}
      {[
        { src: imgCallOptionHover1, top: '4386px' },
        { src: imgCallOptionHover2, top: '5252px' },
        { src: imgCallOptionHover3, top: '6118px' },
        { src: imgCallOptionHover4, top: '6984px' },
        { src: imgCallOptionHover5, top: '7850px' }
      ].map((img, idx) => (
        <motion.div 
          key={idx} 
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          whileInView={{ opacity: 1, y: 0, x: '-50%' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
          style={{
          position: 'absolute',
          left: '50%',
          top: img.top,
          width: '1281px',
          height: '828px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <img alt={`Call option ${idx + 1}`} src={img.src} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
        </motion.div>
      ))}

      {/* Additional Product Images */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '8716px',
          width: '1282px',
          height: '829px'
        }}
      >
        <img alt="Greex Options trading" src={imgGreexOptionsTrading6611} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '9605px',
          width: '1282px',
          height: '303px'
        }}
      >
        <img alt="Frame" src={imgFrame75601} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>

      {/* Extended Telegram Bot Gallery */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '9968px',
          width: '1289px',
          display: 'flex',
          flexDirection: 'column',
          gap: '88px',
          alignItems: 'flex-start'
        }}
      >
        {/* Row 1 */}
        <div style={{
          display: 'flex',
          gap: '41px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          {[
            { src: imgLandingPage2, name: 'Landing Page' },
            { src: imgDashboard2, name: 'Dashboard' },
            { src: imgSelectCoin2, name: 'Select coin' },
            { src: imgLiveTracking2, name: 'Live Tracking' },
            { src: imgLearnToEarn2, name: 'Learn to earn' }
          ].map((img, idx) => (
            <div key={idx} style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              height: idx === 2 ? '494px' : '488px',
              borderRadius: '22px',
              width: '225px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img alt={img.name} src={img.src} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '22px' }} />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {[
            { src: imgLanding2, name: 'Landing' },
            { src: imgLeaderboard2, name: 'Leaderboard' },
            { src: img23, name: '#2' },
            { src: img24, name: '#2' },
            { src: img24, name: '#2' }
          ].map((img, idx) => (
            <div key={idx} style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              height: idx === 1 || idx === 3 || idx === 4 ? '490px' : '488px',
              borderRadius: '22px',
              width: idx === 1 || idx === 3 || idx === 4 ? '226px' : '225px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img alt={img.name} src={img.src} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '22px' }} />
            </div>
          ))}
        </div>

        {/* Row 3 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {[
            { src: imgLanding3, name: 'Landing' },
            { src: imgLeaderboard3, name: 'Leaderboard' },
            { src: img25, name: '#2' },
            { src: img26, name: '#2' },
            { src: img27, name: '#2' }
          ].map((img, idx) => (
            <div key={idx} style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              height: idx === 1 || idx === 3 || idx === 4 ? '490px' : '488px',
              borderRadius: '22px',
              width: idx === 1 || idx === 3 || idx === 4 ? '226px' : '225px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img alt={img.name} src={img.src} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '22px' }} />
            </div>
          ))}
        </div>

        {/* Row 4 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {[
            { src: imgLeaderboard4, name: 'Leaderboard' },
            { src: imgLanding4, name: 'Landing' },
            { src: img28, name: '#2' },
            { src: img29, name: '#2' },
            { src: img30, name: '#2' }
          ].map((img, idx) => (
            <div key={idx} style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              height: idx === 0 || idx === 3 || idx === 4 ? '490px' : '488px',
              borderRadius: '22px',
              width: idx === 0 || idx === 3 || idx === 4 ? '226px' : '225px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img alt={img.name} src={img.src} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '22px' }} />
            </div>
          ))}
        </div>

        {/* Row 5 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {[
            { src: img31, name: '#2' },
            { src: imgLeaderboard5, name: 'Leaderboard' },
            { src: img32, name: '#2' },
            { src: img33, name: '#2' },
            { src: imgLanding5, name: 'Landing' }
          ].map((img, idx) => (
            <div key={idx} style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              height: idx === 0 || idx === 1 || idx === 2 || idx === 3 ? '490px' : '488px',
              borderRadius: '22px',
              width: idx === 0 || idx === 1 || idx === 2 || idx === 3 ? '226px' : '225px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img alt={img.name} src={img.src} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '22px' }} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* High-Fidelity Designs Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '12895px',
          width: '1281px',
          display: 'flex',
          flexDirection: 'column',
          height: '880px',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <h2 style={{
          fontFamily: 'Nexa, system-ui, sans-serif',
          fontWeight: 'bold',
          fontSize: '22px',
          color: 'white',
          margin: 0,
          height: '33px'
        }}>
          High-Fidelity Designs
        </h2>
        <div style={{
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          width: '100%',
          aspectRatio: '4096/2648',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img alt="Call option hover" src={imgCallOptionHover6} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
        </div>
      </motion.div>

      {/* Screenshot Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '13837px',
          width: '1281px',
          height: '1047px'
        }}
      >
        <img alt="Screenshot" src={imgScreenshot20251030At41829Pm1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>

      {/* Testimonial Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '15338px',
          width: '1288px',
          backgroundColor: '#0c0c0c',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '40px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '165px',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '1137px'
        }}>
          <p style={{
            fontFamily: 'Nexa, system-ui, sans-serif',
            fontWeight: 'bold',
            fontSize: '32px',
            color: 'white',
            margin: 0,
            width: '100%'
          }}>
            "Raksha is a great asset to any agile team looking to overhaul designs, bringing creativity and a results-oriented approach"
          </p>
          <p style={{
            fontFamily: 'Outfit, system-ui, sans-serif',
            fontWeight: 'normal',
            fontSize: '22px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
            width: '100%'
          }}>
            - Sarthak Sharma, ex Co-founder, Greex
          </p>
        </div>
      </motion.div>

      {/* Final Thoughts Section */}
      <motion.div 
        id="final-thoughts" 
        initial={{ opacity: 0, y: 20, x: '-50%' }}
        whileInView={{ opacity: 1, y: 0, x: '-50%' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          
          top: '14996px',
          width: '1295px',
          display: 'flex',
          flexDirection: 'column',
          height: '282px',
          justifyContent: 'space-between'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          alignItems: 'flex-start',
          width: '100%'
        }}>
          <h2 style={{
            fontFamily: 'Nexa, system-ui, sans-serif',
            fontWeight: 'bold',
            fontSize: '22px',
            color: 'white',
            margin: 0
          }}>
            The Team
          </h2>
          <p style={{
            fontFamily: 'Outfit, system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '17px',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '24px',
            margin: 0,
            width: '100%'
          }}>
            Thanks to key members of the team : Raj Karan ( Founder), Sarthak (Co-founder), Rohit Goel (CTO) , Yashovardhan (Senior Dev), and Roman Oshyyko (Designer from external Agency), Bohdan Barykin (External Agency)
          </p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          alignItems: 'flex-start',
          width: '100%'
        }}>
          <h2 style={{
            fontFamily: 'Nexa, system-ui, sans-serif',
            fontWeight: 'bold',
            fontSize: '22px',
            color: 'white',
            margin: 0
          }}>
            Final Thoughts
          </h2>
          <p style={{
            fontFamily: 'Outfit, system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '17px',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '24px',
            margin: 0,
            width: '100%'
          }}>
            The platform was successfully designed and tested, with strong feedback during early demos. Although the company shut down due to investor issues, the product foundation remains one of my proudest projects - a complete, self-driven deep-dive into a complex domain translated into a clean, functional product experience.
          </p>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu (for smaller screens) - Sticky */}
      <motion.div 
        initial={{ x: '-50%' }}
        animate={{ x: '-50%' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          left: '50%',
          bottom: '40px',
          zIndex: 40,
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '16px 16px',
          boxSizing: 'border-box',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          fontSize: '16px',
          margin: 0,
          padding: 0
        }}>
          {['Overview', 'Strategy', 'Product', 'Final Thoughts'].map((section) => {
            const isActive = activeSection === section;
            return (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: 'Nexa, system-ui, sans-serif',
                  fontWeight: isActive ? 'bold' : 'normal',
                  fontSize: '16px',
                  color: isActive ? 'white' : 'rgba(255, 255, 255, 0.44)',
                  background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  backdropFilter: isActive ? 'blur(8px)' : 'none',
                  WebkitBackdropFilter: isActive ? 'blur(8px)' : 'none',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  paddingTop: isActive ? '9px' : '8px',
                  paddingBottom: isActive ? '7px' : '8px',
                  paddingLeft: isActive ? '16px' : '8px',
                  paddingRight: isActive ? '16px' : '8px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '32px',
                  height: '32px',
                  lineHeight: '1.2',
                  margin: 0,
                  boxSizing: 'border-box'
                }}
              >
                {section}
              </motion.button>
            );
          })}
        </div>
        
        {/* Scroll to top button - dynamically sized */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: y > 500 ? 32 : 0,
            opacity: y > 500 ? 1 : 0,
            marginLeft: 0
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.4, 0, 0.2, 1],
            opacity: { duration: 0.2 }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '32px',
            width: '32px',
            flexShrink: 0,
            margin: 0,
            padding: 0
          }}
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              flexShrink: 0,
              pointerEvents: y > 500 ? 'auto' : 'none'
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} color="white" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

