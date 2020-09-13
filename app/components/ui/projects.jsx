import React from 'react';

import Section from './presentational/section';
import Project from './presentational/project';

import skills from '../../data/skills';

import translate from '../main/translate';

import styled from 'styled-components';

const StyledProjects = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: ${({theme}) => theme.spaces.baseSize}*2 ${({theme}) => theme.spaces.baseSize};
  justify-items: center;
  padding-right: ${({theme}) => theme.spaces.baseSize};
`;

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
