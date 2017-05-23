import React from 'react';

import Section from './presentational/section.jsx';
import Row from './presentational/row.jsx';
import Column from './presentational/column.jsx';
import Project from './presentational/project.jsx';

import skills from '../../data/skills';

import translate from '../../translate.jsx';

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
