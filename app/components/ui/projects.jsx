import React from 'react';

import Section from './presentational/section';
import Row from './presentational/row';
import Column from './presentational/column';
import Project from './presentational/project';

import skills from '../../data/skills';

import translate from '../main/translate';

const Projects = () => {
  return(
    <Section
      titleId="titles.projects"
    >
      <Row>
        <Column
          parts={2}
          ofParts={2}
        >
          <div className="projects">
            {
              skills.projects.map( (project, i) => {
                return (
                  <Project
                    key={i}
                    project={project}
                  />
                );
              })
            }
          </div>
        </Column>
      </Row>
    </Section>
  )
};

export default translate(Projects);
