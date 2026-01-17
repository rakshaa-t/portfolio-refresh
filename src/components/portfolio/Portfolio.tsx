import React from 'react';
import { useNavigate } from 'react-router-dom';

// Marquee Header
const Marquee: React.FC = () => {
  const text = "PORTFOLIO.RAKSHA.DESIGN • PORTFOLIO.RAKSHA.DESIGN • PORTFOLIO.RAKSHA.DESIGN • PORTFOLIO.RAKSHA.DESIGN • ";

  return (
    <div className="marquee-wrapper">
      <div className="marquee">
        <span>{text}<span className="new-badge">NEW!</span></span>
        <span>{text}<span className="new-badge">NEW!</span></span>
      </div>
    </div>
  );
};

// Hero Section - I COMMIT CODE equivalent
const HeroSection: React.FC = () => {
  return (
    <div className="section-row">
      <div className="section-label">
        I design<br />things
      </div>
      <div className="section-content">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          <div className="pixel-avatar">
            <img src="/images/raksha.jpg" alt="Raksha" />
          </div>
          <div>
            <p>
              I'm <strong>Raksha</strong>. I'm a product designer
              and brand strategist based in India.
            </p>
            <p>
              I like my coffee strong, my designs minimal,
              my projects <a href="#projects">meaningful</a>, and
              my <a href="https://instagram.com/raksha" target="_blank" rel="noopener noreferrer">photos</a> aesthetic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Employment Section - I'M EMPLOYABLE equivalent
const EmploymentSection: React.FC = () => {
  return (
    <div className="section-row">
      <div className="section-label">
        I'm<br />employable
      </div>
      <div className="section-content">
        <p>
          I work as a <a href="#">Product Designer</a> where I'm helping
          create intuitive digital experiences that users love.
        </p>
        <p>
          I've worked on projects like <a href="/ova">Ova</a>, a period
          tracking app designed with empathy, <a href="/greex">Greex</a>,
          a DeFi trading platform, and <a href="/ioc">IOC</a>, a vendor
          management system.
        </p>
        <p>
          I also do <a href="#">brand strategy</a> work, helping startups
          build their visual identity from the ground up.
        </p>
      </div>
    </div>
  );
};

// Projects Table - I CODE FOR FUN equivalent
const ProjectsSection: React.FC = () => {
  const navigate = useNavigate();

  const projects = [
    { name: 'OVA', description: 'Period tracking app', route: '/ova' },
    { name: 'GREEX', description: 'DeFi trading platform', route: '/greex' },
    { name: 'IOC', description: 'Vendor management', route: '/ioc' },
    { name: 'DEALDOC', description: 'Document management', route: '/dealdoc' },
  ];

  return (
    <div className="section-row" id="projects">
      <div className="section-label">
        I design<br />for fun
      </div>
      <div className="section-content">
        <p>
          I've designed (and continue to refine) some cool projects.
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Project</th>
              <th style={{ textAlign: 'right' }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.name}
                onClick={() => navigate(project.route)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <a onClick={(e) => e.preventDefault()}>{project.name}</a>
                </td>
                <td className="stars" style={{ textAlign: 'right' }}>
                  {project.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="dither-pattern" style={{ marginTop: '-1px' }}></div>
      </div>
    </div>
  );
};

// Writing Section - I WRITE WORDS equivalent
const WritingSection: React.FC = () => {
  const articles = [
    { title: 'Design process for Ova', date: 'Coming soon', url: '#' },
    { title: 'Building a brand from scratch', date: 'Coming soon', url: '#' },
    { title: 'My design toolkit 2024', date: 'Coming soon', url: '#' },
  ];

  return (
    <div className="section-row">
      <div className="section-label">
        I write<br />words
      </div>
      <div className="section-content">
        <ul className="writing-list">
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} className="title">{article.title}</a>
              <span className="date">{article.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Social Section - I AM ON THE INTERNET equivalent
const SocialSection: React.FC = () => {
  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/rakshaa-t',
      icon: <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/raksha',
      icon: <svg viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/raksha',
      icon: <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com/raksha',
      icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/raksha',
      icon: <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    },
    {
      name: 'Email',
      url: 'mailto:hello@raksha.design',
      icon: <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    },
  ];

  return (
    <div className="section-row">
      <div className="section-label">
        I am on<br />the internet
      </div>
      <div className="section-content">
        <div className="social-grid">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="dither-pattern" style={{ marginTop: '-1px' }}></div>
      </div>
    </div>
  );
};

// Footer with ASCII art
const FooterSection: React.FC = () => {
  return (
    <div style={{ padding: '60px 24px', textAlign: 'center' }}>
      <a href="#" className="play-button">
        ▶ View Projects
      </a>

      <div style={{ marginTop: '80px' }}>
        <pre className="ascii-art">{`
████████╗██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗███████╗
╚══██╔══╝██║  ██║██╔══██╗████╗  ██║██║ ██╔╝██╔════╝
   ██║   ███████║███████║██╔██╗ ██║█████╔╝ ███████╗
   ██║   ██╔══██║██╔══██║██║╚██╗██║██╔═██╗ ╚════██║
   ██║   ██║  ██║██║  ██║██║ ╚████║██║  ██╗███████║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
        `}</pre>
        <pre className="ascii-art ascii-fade">{`
████████╗██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗███████╗
╚══██╔══╝██║  ██║██╔══██╗████╗  ██║██║ ██╔╝██╔════╝
   ██║   ███████║███████║██╔██╗ ██║█████╔╝ ███████╗
        `}</pre>
        <pre className="ascii-art ascii-fade-2">{`
████████╗██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗███████╗
╚══██╔══╝██║  ██║██╔══██╗████╗  ██║██║ ██╔╝██╔════╝
        `}</pre>
        <pre className="ascii-art ascii-fade-3">{`
████████╗██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗███████╗
        `}</pre>
      </div>
    </div>
  );
};

// Main Portfolio Component
export const Portfolio: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Marquee />
      <main>
        <HeroSection />
        <EmploymentSection />
        <ProjectsSection />
        <WritingSection />
        <SocialSection />
        <FooterSection />
      </main>
    </div>
  );
};
