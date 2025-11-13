import React from 'react';
import { motion } from 'framer-motion';
import { PrincipleCard } from './PrincipleCard';
import { principlesData } from './principles.data';

export const PrinciplesSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full bg-[#e4deed] h-auto min-h-[800px] md:min-h-[900px] lg:min-h-[1238px] py-12 md:py-16 lg:py-[100px] mt-20 md:mt-32 lg:mt-[200px] overflow-hidden"
    >
      {/* Background Blur Effect */}
      <div className="absolute bg-white blur-[200px] filter h-[870px] left-[534px] -top-[424px] rounded-[4444px] w-[1682px] pointer-events-none z-0" />
      
      {/* Section Title */}
      <p 
        className="relative text-center text-[#9f94ad] text-lg md:text-xl lg:text-[22px] font-bold mb-10 md:mb-12 lg:mb-[50px] z-10" 
        style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}
      >
        My non negotiables
      </p>
      
      {/* Principles Cards Container */}
      <div className="relative max-w-[95vw] md:max-w-[90vw] lg:max-w-[1728px] mx-auto px-4 md:px-6 lg:px-11 h-[800px] md:h-[900px] lg:h-[1000px] z-10">
        {principlesData.map((principle) => (
          <PrincipleCard key={principle.id} data={principle} />
        ))}
      </div>
    </motion.div>
  );
};

