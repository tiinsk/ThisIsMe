import React from 'react';

import Project from './project';

import skills from '../../../data/skills';


const Projects = ({strings}) => {
  return(
    <div className="console-projects">
      {
        skills.projects.map( (project, i) => {
          return (
            <Project
              key={i}
              project={project}
              strings={strings}
            />
          );
        })
      }
    </div>
  )
};

export default Projects;
