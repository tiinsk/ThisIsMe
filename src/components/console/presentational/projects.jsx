import React from 'react';

import Project from './project';

import skills from '../../../data/skills';
import styled from 'styled-components/macro';

const StyledConsoleProjects = styled.div`

`;


const Projects = ({strings}) => {
  return(
    <StyledConsoleProjects>
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
    </StyledConsoleProjects>
  )
};

export default Projects;
