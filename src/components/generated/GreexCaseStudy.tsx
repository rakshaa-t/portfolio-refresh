"use client";

import * as React from "react";

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

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      const headerHeight = 71;
      const yOffset = -headerHeight - 20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
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
      <div style={{
        position: 'absolute',
        width: '1472px',
        height: '761px',
        left: '-227px',
        top: '281px',
        backgroundColor: '#373737',
        borderRadius: '4444px',
        filter: 'blur(200px)',
        pointerEvents: 'none',
        zIndex: -2
      }} />
      <div style={{
        position: 'absolute',
        width: '1629px',
        height: '842px',
        left: '474px',
        top: '537px',
        backgroundColor: '#2d2d2d',
        borderRadius: '4444px',
        filter: 'blur(200px)',
        pointerEvents: 'none',
        zIndex: -2
      }} />
      <div style={{
        position: 'absolute',
        width: '1728px',
        height: '760px',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '15692px',
        backgroundColor: '#dee1ed'
      }} />

      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 50,
        width: '100%',
        backdropFilter: 'blur(22px)',
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '44px',
        paddingRight: '44px',
        paddingTop: '12px',
        paddingBottom: '12px',
        boxSizing: 'border-box'
      }}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            // Navigate to homepage - use window.location for full page navigation
            // This ensures we go to the production/preview homepage URL
            window.location.href = '/';
          }}
          style={{
            fontFamily: 'Neulis Cursive, cursive, serif',
            fontSize: '36px',
            color: 'white',
            margin: 0,
            fontWeight: 500,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          raks
        </a>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '73px',
          opacity: 0.44
        }}>
          <a
            href="https://linkedin.com/in/raksha-t"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              width: '29px',
              height: '29px',
              position: 'relative',
              overflow: 'hidden',
              display: 'block'
            }}
          >
            <img alt="LinkedIn" src={imgLinkedIn} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </a>
          <a
            href="https://twitter.com/rakshatated"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            style={{
              width: '24px',
              height: '24px',
              position: 'relative',
              overflow: 'hidden',
              display: 'block'
            }}
          >
            <img alt="X" src={imgX} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </a>
        </div>
      </nav>

      {/* Sticky Navigation Menu - Hidden to prevent showing behind cards */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '930px',
        width: '866px',
        display: 'none'
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
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
          transform: 'translateX(-50%)',
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
          {['Overview', 'Strategy', 'Tele Bots', 'Product', 'Final Thoughts', 'Feedback'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              style={{
                fontFamily: activeSection === section ? 'Nexa, system-ui, sans-serif' : 'Nexa, system-ui, sans-serif',
                fontWeight: activeSection === section ? 'bold' : 'normal',
                fontSize: '16px',
                color: activeSection === section ? 'white' : 'rgba(255, 255, 255, 0.44)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.3s'
              }}
            >
              {section}
            </button>
          ))}
        </div>
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '997px',
          width: '626px',
          height: '0px'
        }}>
          <img alt="" src={imgGroup1171274695} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>

      {/* Hero Section */}
      <div id="overview" style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '194px',
        width: '1293px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'flex-start'
      }}>
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
      </div>

      {/* Project Image */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '367px',
        width: '1293px',
        height: '833px',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <img alt="Greex Project" src={imgRectangle1553} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
      </div>

      {/* What I did Section */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '1260px',
        width: '1293px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '315px'
      }}>
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
      </div>

      {/* Strategy Section */}
      <div id="strategy" style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '1918px',
        width: '1293px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        alignItems: 'flex-start'
      }}>
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
      </div>

      {/* Main Features & Star Feature */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '1635px',
        width: '1293px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
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
      </div>

      {/* MacBook Pro Image Section */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '2245px',
        width: '1293px',
        height: '603px',
        overflow: 'hidden'
      }}>
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
      </div>

      {/* Telegram Bots Section */}
      <div id="tele-bots" style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '2888px',
        width: '1293px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        alignItems: 'flex-start'
      }}>
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
      </div>

      {/* Telegram Bot Screenshots Gallery */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '3071px',
        width: '1289px',
        display: 'flex',
        flexDirection: 'column',
        height: '1072px',
        justifyContent: 'space-between'
      }}>
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
      </div>

      {/* Product Section */}
      <div id="product" style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '4203px',
        width: '1293px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        alignItems: 'flex-start'
      }}>
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
      </div>

      {/* Product Screenshots */}
      {[
        { src: imgCallOptionHover1, top: '4386px' },
        { src: imgCallOptionHover2, top: '5252px' },
        { src: imgCallOptionHover3, top: '6118px' },
        { src: imgCallOptionHover4, top: '6984px' },
        { src: imgCallOptionHover5, top: '7850px' }
      ].map((img, idx) => (
        <div key={idx} style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: img.top,
          width: '1281px',
          height: '828px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <img alt={`Call option ${idx + 1}`} src={img.src} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
        </div>
      ))}

      {/* Additional Product Images */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '8716px',
        width: '1282px',
        height: '829px'
      }}>
        <img alt="Greex Options trading" src={imgGreexOptionsTrading6611} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '9605px',
        width: '1282px',
        height: '303px'
      }}>
        <img alt="Frame" src={imgFrame75601} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Extended Telegram Bot Gallery */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '9968px',
        width: '1289px',
        display: 'flex',
        flexDirection: 'column',
        gap: '88px',
        alignItems: 'flex-start'
      }}>
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
      </div>

      {/* High-Fidelity Designs Section */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '12895px',
        width: '1281px',
        display: 'flex',
        flexDirection: 'column',
        height: '880px',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
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
      </div>

      {/* Screenshot Section */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '13837px',
        width: '1281px',
        height: '1047px'
      }}>
        <img alt="Screenshot" src={imgScreenshot20251030At41829Pm1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Testimonial Section */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
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
      }}>
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
      </div>

      {/* More Work Section */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '15814px',
        width: '970.38px',
        display: 'flex',
        flexDirection: 'column',
        height: '396.2px',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{
          fontFamily: 'Nexa, system-ui, sans-serif',
          fontSize: '22px',
          color: 'black',
          margin: 0,
          textAlign: 'center',
          width: '100%'
        }}>
          More work
        </h2>
        <div style={{
          display: 'flex',
          gap: '22px',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Ova Card */}
          <div style={{
            transform: 'rotate(-15deg)',
            width: '322.05px',
            height: '324.2px',
            position: 'relative'
          }}>
            <div style={{
              backdropFilter: 'blur(2px)',
              backgroundColor: 'white',
              height: '265.35px',
              borderRadius: '44px',
              boxShadow: '0px 182px 51px 0px rgba(0,0,0,0), 0px 117px 47px 0px rgba(0,0,0,0.01), 0px 66px 39px 0px rgba(0,0,0,0.05), 0px 29px 29px 0px rgba(0,0,0,0.09), 0px 7px 16px 0px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '18.74%',
                left: '0.03%',
                right: '-0.37%',
                bottom: '-0.22%',
                borderRadius: '44px',
                overflow: 'hidden'
              }}>
                <img alt="ova" src={imgRectangle1542} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '44px' }} />
              </div>
              <p style={{
                position: 'absolute',
                fontFamily: 'Nexa, system-ui, sans-serif',
                fontSize: '14px',
                color: 'black',
                left: '29.65px',
                top: '20.15px',
                margin: 0
              }}>
                ova : period tracking app
              </p>
            </div>
          </div>

          {/* IOC Card */}
          <div style={{
            transform: 'rotate(4.598deg)',
            width: '282.53px',
            height: '285.31px',
            position: 'relative'
          }}>
            <div style={{
              backdropFilter: 'blur(2px)',
              backgroundColor: 'white',
              height: '265.15px',
              borderRadius: '44px',
              boxShadow: '0px 182px 51px 0px rgba(0,0,0,0), 0px 117px 47px 0px rgba(0,0,0,0.01), 0px 66px 39px 0px rgba(0,0,0,0.05), 0px 29px 29px 0px rgba(0,0,0,0.09), 0px 7px 16px 0px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '18.47%',
                left: '0.26%',
                right: '-0.6%',
                bottom: '0.05%',
                borderRadius: '44px',
                overflow: 'hidden'
              }}>
                <img alt="ioc" src={imgRectangle1543} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '44px' }} />
              </div>
              <p style={{
                position: 'absolute',
                fontFamily: 'Nexa, system-ui, sans-serif',
                fontWeight: 'bold',
                fontSize: '14px',
                color: 'black',
                left: '50%',
                transform: 'translateX(-50%)',
                top: '17.4px',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '195.87px'
              }}>
                ioc : vendor management app
              </p>
            </div>
          </div>

          {/* Dealdoc Card */}
          <div style={{
            transform: 'rotate(-15deg)',
            width: '321.81px',
            height: '323.96px',
            position: 'relative'
          }}>
            <div style={{
              backdropFilter: 'blur(2px)',
              backgroundColor: 'white',
              border: '1px solid rgba(0, 0, 0, 0.18)',
              height: '265.15px',
              borderRadius: '44px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '0.76px',
                height: '216.05px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '263px',
                borderRadius: '44px',
                overflow: 'hidden'
              }}>
                <img alt="dealdoc" src={imgRectangle1544} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '44px' }} />
              </div>
              <p style={{
                position: 'absolute',
                fontFamily: 'Nexa, system-ui, sans-serif',
                fontSize: '14px',
                color: 'black',
                left: '26.62px',
                top: '15.48px',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '213.37px'
              }}>
                dealdoc : deal management platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Thoughts Section */}
      <div id="final-thoughts" style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '14996px',
        width: '1295px',
        display: 'flex',
        flexDirection: 'column',
        height: '282px',
        justifyContent: 'space-between'
      }}>
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
      </div>

      {/* Mobile Navigation Menu (for smaller screens) */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '1083px',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        borderRadius: '12px',
        padding: '12px 32px 18px',
        boxSizing: 'border-box',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '16px',
          textAlign: 'center',
          width: '475px'
        }}>
          {['Overview', 'Strategy', 'Product', 'Final Thoughts'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              style={{
                fontFamily: activeSection === section ? 'Nexa, system-ui, sans-serif' : 'Nexa, system-ui, sans-serif',
                fontWeight: activeSection === section ? 'bold' : 'normal',
                fontSize: '16px',
                color: activeSection === section ? 'white' : 'rgba(255, 255, 255, 0.28)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {section}
            </button>
          ))}
        </div>
        <div style={{
          position: 'absolute',
          left: '32px',
          top: '44px',
          width: '475px',
          height: '0px'
        }}>
          <img alt="" src={imgGroup1171274696} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>
    </div>
  );
};

