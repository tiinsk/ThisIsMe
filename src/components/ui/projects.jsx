import React from 'react';
import styled from 'styled-components/macro';

import projects from '../../data/projects';
import translate from '../main/translate';
import Project from './presentational/project';
import Section from './presentational/section';

const StyledProjects = styled.div`
 
`;

const Projects = ({scrollRef}) => {
  return (
    <div ref={scrollRef}>
      <Section
        titleId="titles.projects"
        style={{marginRight: 0}}
      >
        <StyledProjects className="projects">
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
        </StyledProjects>
      </Section>
    </div>
  )
};

export default translate(Projects);
