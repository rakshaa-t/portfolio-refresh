"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const DealdocCaseStudy: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full bg-[#111111] overflow-x-hidden min-h-screen">
      {/* Background Blurs */}
      <div className="hidden lg:block absolute w-[1472px] h-[761px] left-1/2 -translate-x-1/2 top-[281px] bg-[#373737] rounded-[4444px] blur-[200px] pointer-events-none z-[-2]" />

      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 w-full">
        <div className="absolute inset-0 z-[-1] backdrop-blur-[11px] [mask-image:linear-gradient(to_top,transparent,black_65%)]"
          style={{ background: 'rgba(255,255,255,0.01)' }}
        />
        <div className="flex items-center justify-between w-full px-6 md:px-20 py-4">
          <a href="/" className="text-center text-white text-4xl font-medium no-underline hover:opacity-80 transition-opacity cursor-pointer" style={{ fontFamily: 'neulis-cursive, "Neulis Cursive", Caveat, Pacifico, cursive' }}>
            raks
          </a>
          <div className="flex items-center gap-4 opacity-44">
            <a href="https://linkedin.com/in/raksha-t" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-100 transition-opacity">
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.9583 3.625C23.5993 3.625 24.214 3.87961 24.6672 4.33283C25.1204 4.78604 25.375 5.40073 25.375 6.04167V22.9583C25.375 23.5993 25.1204 24.214 24.6672 24.6672C24.214 25.1204 23.5993 25.375 22.9583 25.375H6.04167C5.40073 25.375 4.78604 25.1204 4.33283 24.6672C3.87961 24.214 3.625 23.5993 3.625 22.9583V6.04167C3.625 5.40073 3.87961 4.78604 4.33283 4.33283C4.78604 3.87961 5.40073 3.625 6.04167 3.625H22.9583ZM22.3542 22.3542V15.95C22.3542 14.9053 21.9391 13.9033 21.2004 13.1646C20.4617 12.4259 19.4597 12.0108 18.415 12.0108C17.3879 12.0108 16.1917 12.6392 15.6117 13.5817V12.2404H12.2404V22.3542H15.6117V16.3971C15.6117 15.4667 16.3608 14.7054 17.2913 14.7054C17.7399 14.7054 18.1702 14.8836 18.4874 15.2009C18.8047 15.5181 18.9829 15.9484 18.9829 16.3971V22.3542H22.3542ZM8.31333 10.3433C8.85172 10.3433 9.36806 10.1295 9.74876 9.74876C10.1295 9.36806 10.3433 8.85172 10.3433 8.31333C10.3433 7.18958 9.43708 6.27125 8.31333 6.27125C7.77174 6.27125 7.25233 6.4864 6.86936 6.86936C6.4864 7.25233 6.27125 7.77174 6.27125 8.31333C6.27125 9.43708 7.18958 10.3433 8.31333 10.3433ZM9.99292 22.3542V12.2404H6.64583V22.3542H9.99292Z" fill="white" />
              </svg>
            </a>
            <a href="https://twitter.com/rakshatated" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M21.5859 21.375L14.0885 10.4471L14.1013 10.4574L20.8613 2.625H18.6023L13.0954 9L8.72227 2.625H2.79766L9.79723 12.8276L9.79638 12.8267L2.41406 21.375H4.67309L10.7955 14.2824L15.6613 21.375H21.5859ZM7.82719 4.32954L18.3466 19.6705H16.5564L6.02852 4.32954H7.82719Z" fill="white" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative w-full px-4 md:px-6 lg:px-0 pt-24 md:pt-28 lg:pt-[194px] pb-20 flex flex-col items-center">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-full md:max-w-[90vw] lg:max-w-[1293px] flex flex-col gap-4 md:gap-5 items-start mb-6 md:mb-8 lg:mb-10"
        >
          <h1 className="text-lg md:text-xl lg:text-[22px] font-bold text-white w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            Dealdoc : Deal Management Platform
          </h1>
          <p className="text-sm md:text-base lg:text-[17px] font-light text-white/80 w-full leading-6 md:leading-7" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
            Dealdoc was a project I worked on with Arash and Sunny (founders from SF) in early 2025. They had a working deal management product but wanted to level it up. I audited their platform, redesigned the homepage, and added an AI command center with suggestion pills to make deal workflows smoother.
          </p>
        </motion.div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full max-w-full md:max-w-[90vw] lg:max-w-[1293px] aspect-[16/10] rounded-xl overflow-hidden mb-6 md:mb-8 lg:mb-10"
        >
          <img
            alt="Dealdoc Project"
            src="https://res.cloudinary.com/dky01erho/image/upload/v1761388291/656_3x_shots_so_qced29.png"
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>

        {/* What I did Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-full md:max-w-[90vw] lg:max-w-[1293px] flex flex-col gap-4 md:gap-5 lg:gap-6 items-start mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-lg md:text-xl lg:text-[22px] font-bold text-white w-full" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            What I did
          </h2>

          <div className="relative w-full border border-white rounded-lg" style={{ padding: '24px' }}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-6 border-b border-white gap-2">
              <div className="text-base text-white/80" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                Platform Audit
              </div>
              <div className="text-base text-white md:text-right" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                Full UX audit of existing deal management flows
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-start py-6 border-b border-white gap-2">
              <div className="text-base text-white/80" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                Homepage Redesign
              </div>
              <div className="text-base text-white md:text-right md:max-w-[60%]" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                New landing page with clearer value proposition and better conversion flow
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-6 gap-2">
              <div className="text-base text-white/80" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                AI Command Center
              </div>
              <div className="text-base text-white md:text-right md:max-w-[60%]" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                Suggestion pills and AI-assisted deal workflows
              </div>
            </div>
          </div>
        </motion.div>

        {/* Approach Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-full md:max-w-[90vw] lg:max-w-[1293px] flex flex-col gap-4 md:gap-5 items-start mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-lg md:text-xl lg:text-[22px] font-bold text-white" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            The Approach
          </h2>
          <div className="text-sm md:text-base lg:text-[17px] font-light text-white/80 leading-6 md:leading-7 w-full" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
            <p className="mb-4 md:mb-5">
              The interesting part was making the AI functionality feel seamless - not like a forced feature but actually useful for investors moving through their pipeline. I went developer-first with the UI: clean, minimal, keyboard shortcuts, fast navigation.
            </p>
            <p>
              Honestly, I didn't know deal management could be so complex. Learning about startup handovers and how investors actually track deals was fascinating. Totally different world from consumer products.
            </p>
          </div>
        </motion.div>

        {/* Main Features & Star Feature */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-full md:max-w-[90vw] lg:max-w-[1293px] flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-8 lg:justify-between items-start lg:items-stretch mb-8 md:mb-10 lg:mb-12"
        >
          <div className="flex flex-col gap-4 md:gap-5 w-full lg:w-[48%]">
            <h3 className="text-lg md:text-xl lg:text-[22px] font-bold text-white" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
              Key Features
            </h3>
            <div className="bg-[#111111] border border-white rounded-lg p-6 md:p-7 w-full h-full">
              <ul className="text-sm md:text-base font-light text-white/80 leading-6 md:leading-7 list-disc pl-6" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                <li>AI command center with suggestion pills</li>
                <li>Keyboard shortcuts for power users</li>
                <li>Clean, minimal deal pipeline view</li>
                <li>Fast navigation between deals</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-5 w-full lg:w-[48%]">
            <h3 className="text-lg md:text-xl lg:text-[22px] font-bold text-white" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
              Design Philosophy
            </h3>
            <div className="bg-[#111111] border border-white rounded-lg p-6 md:p-8 w-full h-full">
              <p className="text-sm md:text-base font-light text-white/80 leading-6 md:leading-7" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                Developer-first UI means respecting power users. No hand-holding tutorials, no bloated onboarding. Clean interfaces that get out of the way and let people work.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Learnings Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-full md:max-w-[90vw] lg:max-w-[1293px] flex flex-col gap-4 md:gap-5 items-start mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-lg md:text-xl lg:text-[22px] font-bold text-white" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
            Key Learnings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {[
              {
                title: 'AI Should Feel Natural',
                desc: 'The best AI features are ones users don\'t think about. Suggestion pills that appear at the right time, not flashy AI branding everywhere.'
              },
              {
                title: 'B2B is Different',
                desc: 'Consumer product thinking doesn\'t always translate. Investors need efficiency and data density, not delightful animations.'
              },
              {
                title: 'Domain Learning',
                desc: 'Understanding deal pipelines, startup handovers, and investor workflows opened up a whole new design vocabulary.'
              },
              {
                title: 'Power User Focus',
                desc: 'When your users are busy investors, every extra click is friction. Keyboard shortcuts and fast navigation matter.'
              }
            ].map((item, idx) => (
              <div key={idx} className="border border-white/20 rounded-lg p-5">
                <h4 className="text-base font-semibold text-white mb-2" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                  {item.title}
                </h4>
                <p className="text-sm text-white/60" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Portfolio */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-full md:max-w-[90vw] lg:max-w-[1293px] pt-8 border-t border-white/10"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}
          >
            ← Back to Portfolio
          </button>
        </motion.div>
      </div>
    </div>
  );
};
