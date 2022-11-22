import React from 'react';

import Project from './project';

const Projects = ({data}) => {
  return(
    <div>
      {
        data.projects.projects.map( (project, i) => {
          return (
            <Project
              key={i}
              project={project}
              skillsTitle={data.projects.skillsTitle}
              linksTitle={data.projects.linksTitle}
            />
          );
        })
      }
    </div>
  )
};

export default Projects;
