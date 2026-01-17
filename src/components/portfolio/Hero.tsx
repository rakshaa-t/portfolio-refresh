import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="section pt-24 md:pt-32">
      <div className="container-main">
        {/* Profile photo */}
        <div className="mb-8">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-accent overflow-hidden">
            <img
              src="/images/raksha.jpg"
              alt="Raksha"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Intro text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
            hi, i'm <span className="text-accent">raksha</span>.
          </h1>

          <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed max-w-2xl">
            product designer & brand strategist.
          </p>

          <p className="text-lg text-foreground-secondary leading-relaxed max-w-2xl">
            i <span className="text-white">design products</span> that people love,{' '}
            <span className="text-white">build brands</span> that stand out, and{' '}
            <span className="text-white">craft experiences</span> that matter.
          </p>

          <div className="pt-4">
            <a
              href="mailto:hello@raksha.design"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
            >
              <span>get in touch</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
