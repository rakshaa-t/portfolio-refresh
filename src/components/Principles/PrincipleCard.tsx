import React from 'react';
import { PrincipleData } from './principles.data';

interface PrincipleCardProps {
  data: PrincipleData;
}

export const PrincipleCard: React.FC<PrincipleCardProps> = ({ data }) => {
  const {
    text,
    rotation,
    position,
    width,
    background,
    textColor,
    shadow,
    isFlipped,
  } = data;

  // Build responsive width classes
  const widthClasses = `
    w-[${width.mobile}] max-w-[${width.mobileMax}]
    md:w-[${width.tablet}] md:max-w-[${width.tabletMax}]
    lg:w-auto lg:max-w-[${width.desktop}]
  `.replace(/\s+/g, ' ').trim();

  // Build responsive top positioning
  const topClasses = `top-[${position.mobile}px] md:top-[${position.tablet}px] lg:top-[${position.desktop}px]`;

  // Build rotation class
  const rotationClass = `rotate-[${rotation}deg]`;

  // Flip class if needed
  const flipClass = isFlipped ? 'scale-y-[-1]' : '';

  // Border radius: 22px mobile/tablet, 22px desktop
  const borderRadius = 'rounded-[22px] md:rounded-[20px] lg:rounded-[22px]';

  return (
    <>
      {/* Background Card */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2
          ${topClasses}
          ${widthClasses}
          ${rotationClass}
          ${flipClass}
        `.replace(/\s+/g, ' ').trim()}
      >
        <div 
          className={`
            ${background}
            ${shadow || ''}
            ${borderRadius}
            h-[77px]
            w-full
          `.replace(/\s+/g, ' ').trim()}
        />
      </div>

      {/* Text Content */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2
          ${topClasses}
          ${widthClasses}
          ${rotationClass}
          h-[77px] flex items-center justify-center
        `.replace(/\s+/g, ' ').trim()}
      >
        <p
          className={`
            ${textColor}
            text-sm md:text-base lg:text-base
            font-normal
            leading-relaxed md:leading-normal lg:leading-normal
            text-center
            px-4 md:px-5 lg:px-6
          `.replace(/\s+/g, ' ').trim()}
          style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}
        >
          {text}
        </p>
      </div>
    </>
  );
};

