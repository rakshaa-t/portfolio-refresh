import React from 'react';

interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  period?: string;
  current?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    role: "Product Designer",
    company: "Freelance",
    description: "designing products for startups and established brands",
    current: true,
  },
  {
    role: "Brand Strategist",
    company: "Various Clients",
    description: "building brand identities and design systems",
  },
  // Add more experiences here
];

export const Experience: React.FC = () => {
  return (
    <section className="section">
      <div className="container-main">
        <h2 className="section-title">experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                <span className="text-white font-medium">
                  {exp.role}
                </span>
                <span className="text-foreground-secondary">—</span>
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover transition-colors"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className="text-accent">{exp.company}</span>
                )}
                {exp.current && (
                  <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    current
                  </span>
                )}
              </div>
              <p className="text-foreground-secondary mt-1 text-sm">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
