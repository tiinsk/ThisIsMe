import React from 'react';

import Section from './presentational/section';
import Project from './presentational/project';

import skills from '../../data/skills';

import translate from '../main/translate';

const Projects = ({scrollRef}) => {
  return (
    <div ref={scrollRef}>
      <Section
        titleId="titles.projects"
      >
        <div className="projects">
          {
            skills.projects.map((project, i) => {
              return (
                <Project
                  key={i}
                  project={project}
                />
              );
            })
          }
        </div>
      </Section>
    </div>
  )
};

export default translate(Projects);
