import React, { useState, useEffect } from 'react';

export const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer style={{
      width: '100%',
      maxWidth: '1200px',
      padding: isMobile ? '40px 20px' : '60px 20px',
      margin: '100px auto 0'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? '30px' : '40px'
      }}>
        
        {/* Signature / Logo */}
        <svg 
          width={isMobile ? '100' : '200'} 
          height={isMobile ? '30' : '60'} 
          viewBox="0 0 200 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transition: 'transform 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fontFamily="'Neulis Cursive', cursive" 
            fontSize="32" 
            fill="rgba(41,41,41,0.88)"
          >
            Raksha T
          </text>
        </svg>
        
        {/* Footer Text */}
        <div style={{
          fontSize: isMobile ? '12px' : '14px',
          textAlign: 'center',
          color: 'rgba(41,41,41,0.88)',
          fontFamily: 'Outfit, sans-serif',
          lineHeight: isMobile ? '20px' : '24px'
        }}>
          <p style={{ margin: 0 }}>made with magicpath.ai + cursor</p>
        </div>
        
        {/* Footer Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '12px' : '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <FooterLink href="https://linkedin.com/in/raksha-t" text="linkedin" />
          {!isMobile && <span style={{ color: 'rgba(41,41,41,0.4)', fontWeight: 300 }}>·</span>}
          <FooterLink href="https://twitter.com/rakshatated" text="x" />
          {!isMobile && <span style={{ color: 'rgba(41,41,41,0.4)', fontWeight: 300 }}>·</span>}
          <FooterLink href="mailto:raksha@example.com" text="email" />
        </div>
        
        {/* Copyright */}
        <div style={{
          fontSize: '12px',
          color: 'rgba(41,41,41,0.5)',
          textAlign: 'center',
          fontFamily: 'Outfit, sans-serif'
        }}>
          © 2025 Raksha T. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  text: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: '#283FE4',
        textDecoration: 'none',
        fontFamily: 'Outfit, sans-serif',
        position: 'relative',
        transition: 'opacity 0.3s',
        opacity: isHovered ? 0.8 : 1
      }}
    >
      {text}
      <div style={{
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        width: isHovered ? '100%' : '0',
        height: '1px',
        background: '#283FE4',
        transition: 'width 0.3s'
      }} />
    </a>
  );
};

