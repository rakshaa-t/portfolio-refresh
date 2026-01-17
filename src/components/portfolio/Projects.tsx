import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  route?: string;
}

const projects: Project[] = [
  {
    id: 'ova',
    title: 'ova',
    description: 'period tracking app designed with empathy and care',
    tags: ['Product Design', 'UX Research', 'Mobile'],
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1761388415/Slide_4_3_-_1_2_zr9r7i.png',
    route: '/ova',
  },
  {
    id: 'ioc',
    title: 'ioc',
    description: 'vendor management platform for enterprise',
    tags: ['Product Design', 'Dashboard', 'B2B'],
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
    route: '/ioc',
  },
  {
    id: 'greex',
    title: 'greex',
    description: 'defi trading platform with intuitive experience',
    tags: ['Product Design', 'Web3', 'Finance'],
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png',
    route: '/greex',
  },
  {
    id: 'dealdoc',
    title: 'dealdoc',
    description: 'streamlined document management for deals',
    tags: ['Product Design', 'SaaS', 'Enterprise'],
    route: '/dealdoc',
  },
];

export const Projects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container-main">
        <h2 className="section-title">selected work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => project.route && navigate(project.route)}
              className="card group cursor-pointer"
            >
              {/* Project Image */}
              {project.image && (
                <div className="mb-4 rounded-md overflow-hidden bg-background aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              )}

              {/* Project Info */}
              <h3 className="text-lg font-medium text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-foreground-secondary text-sm mt-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-foreground-secondary bg-background px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
