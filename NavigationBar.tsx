import React, { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'chat', label: 'Chat', icon: '💬' },
  { id: 'inbox', label: 'Inbox', icon: '📥' },
  { id: 'calendar', label: 'Calendar', icon: '📅' }
];

interface NavigationBarProps {
  activeNav?: string;
  onNavChange?: (navId: string) => void;
  onCalendarClick?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ 
  activeNav = 'chat',
  onNavChange,
  onCalendarClick
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(activeNav);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavClick = (navId: string) => {
    setActive(navId);
    if (navId === 'calendar' && onCalendarClick) {
      onCalendarClick();
    } else if (onNavChange) {
      onNavChange(navId);
    }
  };

  const NavButton: React.FC<{ item: NavItem; isActive: boolean }> = ({ item, isActive }) => (
    <button
      onClick={() => handleNavClick(item.id)}
      style={{
        flex: isMobile ? 1 : '1 1 0',
        height: '60px',
        padding: '18px',
        background: isActive ? '#283FE4' : 'rgba(255,255,255,0.32)',
        border: 'none',
        borderRadius: '4444px',
        outline: isActive ? '1px solid white' : 'none',
        boxShadow: isActive ? '1px 2px 4px rgba(0,0,0,0.10)' : 'none',
        cursor: 'pointer',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden',
        fontSize: '20px'
      }}
    >
      {/* Glow effect for active state */}
      {isActive && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: '-2px',
          width: '30px',
          height: '25px',
          background: 'white',
          boxShadow: '44px 44px 44px',
          filter: 'blur(22px)'
        }} />
      )}
      {item.icon}
    </button>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Top Navigation */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '20px',
          background: 'rgba(255,255,255,0.01)',
          backdropFilter: 'blur(11px)',
          WebkitBackdropFilter: 'blur(11px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              fontFamily: 'Neulis Cursive, cursive',
              fontSize: '28px',
              color: 'white',
              fontWeight: 500
            }}>
              raks
            </div>
            
            <div style={{ display: 'flex', gap: '16px', opacity: 0.44 }}>
              <a href="https://linkedin.com/in/raksha-t" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#020617"/>
                </svg>
              </a>
              <a href="https://twitter.com/rakshatated" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#020617"/>
                </svg>
              </a>
            </div>
          </div>
        </nav>

        {/* Mobile Bottom Navigation */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px',
          background: 'rgba(255,255,255,0.01)',
          backdropFilter: 'blur(11px)',
          WebkitBackdropFilter: 'blur(11px)',
          zIndex: 50
        }}>
          <div style={{
            display: 'flex',
            gap: '16px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {NAV_ITEMS.map(item => (
              <NavButton key={item.id} item={item} isActive={active === item.id} />
            ))}
          </div>
        </div>
      </>
    );
  }

  // Desktop Navigation
  return (
    <nav style={{
      position: 'fixed',
      top: '20px',
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: window.innerWidth > 1400 ? '563px' : window.innerWidth > 1100 ? '300px' : '150px',
        padding: '4px 12px',
        background: 'rgba(255,255,255,0.01)',
        backdropFilter: 'blur(11px)',
        WebkitBackdropFilter: 'blur(11px)'
      }}>
        
        {/* Logo */}
        <div style={{
          fontFamily: 'Neulis Cursive, cursive',
          fontSize: '36px',
          color: 'white',
          fontWeight: 500
        }}>
          raks
        </div>
        
        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          gap: '28px',
          width: '236px',
          height: '60px'
        }}>
          {NAV_ITEMS.map(item => (
            <NavButton key={item.id} item={item} isActive={active === item.id} />
          ))}
        </div>
        
        {/* Social Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '73px',
          opacity: 0.44
        }}>
          <a 
            href="https://linkedin.com/in/raksha-t" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ width: '29px', height: '29px', display: 'block', transition: 'opacity 0.3s' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.44')}
          >
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.9583 3.625C23.5993 3.625 24.214 3.87961 24.6672 4.33283C25.1204 4.78604 25.375 5.40073 25.375 6.04167V22.9583C25.375 23.5993 25.1204 24.214 24.6672 24.6672C24.214 25.1204 23.5993 25.375 22.9583 25.375H6.04167C5.40073 25.375 4.78604 25.1204 4.33283 24.6672C3.87961 24.214 3.625 23.5993 3.625 22.9583V6.04167C3.625 5.40073 3.87961 4.78604 4.33283 4.33283C4.78604 3.87961 5.40073 3.625 6.04167 3.625H22.9583ZM22.3542 22.3542V15.95C22.3542 14.9053 21.9391 13.9033 21.2004 13.1646C20.4617 12.4259 19.4597 12.0108 18.415 12.0108C17.3879 12.0108 16.1917 12.6392 15.6117 13.5817V12.2404H12.2404V22.3542H15.6117V16.3971C15.6117 15.4667 16.3608 14.7054 17.2913 14.7054C17.7399 14.7054 18.1702 14.8836 18.4874 15.2009C18.8047 15.5181 18.9829 15.9484 18.9829 16.3971V22.3542H22.3542ZM8.31333 10.3433C8.85172 10.3433 9.36806 10.1295 9.74876 9.74876C10.1295 9.36806 10.3433 8.85172 10.3433 8.31333C10.3433 7.18958 9.43708 6.27125 8.31333 6.27125C7.77174 6.27125 7.25233 6.4864 6.86936 6.86936C6.4864 7.25233 6.27125 7.77174 6.27125 8.31333C6.27125 9.43708 7.18958 10.3433 8.31333 10.3433ZM9.99292 22.3542V12.2404H6.64583V22.3542H9.99292Z" fill="#020617"/>
            </svg>
          </a>
          
          <a 
            href="https://twitter.com/rakshatated" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ width: '24px', height: '24px', display: 'block', transition: 'opacity 0.3s' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.44')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.5859 21.375L14.0885 10.4471L14.1013 10.4574L20.8613 2.625H18.6023L13.0954 9L8.72227 2.625H2.79766L9.79723 12.8276L9.79638 12.8267L2.41406 21.375H4.67309L10.7955 14.2824L15.6613 21.375H21.5859ZM7.82719 4.32954L18.3466 19.6705H16.5564L6.02852 4.32954H7.82719Z" fill="#020617"/>
            </svg>
          </a>
        </div>
        
      </div>
    </nav>
  );
};

