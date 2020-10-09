import React from 'react';
import styled from 'styled-components/macro';

import projects from '../../data/projects';
import translate from '../main/translate';
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

const Projects = ({scrollRef}) => {
  return (
    <StyledProjects ref={scrollRef}>
      <Section
        titleId="titles.projects"
        style={{marginRight: 0}}
      >
        <div className="projects">
          {
            projects.map((project, i) => {
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

export default translate(Projects);
