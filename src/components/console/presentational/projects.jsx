import React from 'react';

import Project from './project';
import projects from '../../../data/projects';

const Projects = ({strings}) => {
  return(
    <div>
      {
        projects.map( (project, i) => {
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
