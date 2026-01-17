import React from 'react';
import { Hero } from './Hero';
import { Experience } from './Experience';
import { Projects } from './Projects';
import { Footer } from './Footer';

export const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Footer />
      </main>
    </div>
  );
};
