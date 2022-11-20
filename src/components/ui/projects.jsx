import React from 'react';
import styled from 'styled-components/macro';

import Project from './presentational/project';
import Section, {StyledSection} from './presentational/section';

const StyledProjects = styled.div`
  ${StyledSection} {
    .section-body {
      max-width: none;
      
      @media (min-width: ${({theme}) => theme.breakpoints.xxlgSize}) {
        margin-left: 13% !important;
        max-width: none;
      }
    }
    
    @media (min-width: ${({theme}) => theme.breakpoints.xxlgSize}) {
      max-width: none;
    }
  }
`;

const Projects = ({scrollRef, projects}) => {
  return (
    <StyledProjects ref={scrollRef}>
      <Section
        title={projects.title}
        style={{marginRight: 0}}
      >
        <div className="projects">
          {
            projects.projects.map((project, i) => {
              return (
                <Project
                  key={i}
                  index={i}
                  project={project}
                />
              );
            })
          }
        </div>
      </Section>
    </StyledProjects>
  )
};

export default Projects;
