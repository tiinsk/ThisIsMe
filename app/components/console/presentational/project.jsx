import React from 'react';
import DashedLine from './dashed_line';

const Project = ({strings, project}) => {

  return(
    <div className="console-project">
      <DashedLine/>
      <div className="project-name">
        {strings.projects[project.key].name}
      </div>
      <div className="project-description">
        {strings.projects[project.key].description}
        <div className="skill-title">{strings.titles.skills}:</div>
        <div className="rateless-skills">
          {
            project.skills.map( (skill,i) => {
              return (
                <div key={i} className="rateless-skill">
                  <span className="line">/</span>
                  {strings.skills.skillNames[skill] || skill}
                  <span className="line">/</span>
                </div>
              )
            })
          }
        </div>
        <div className="links">
          <div className="link-title">{strings.links}:</div>
          <div>
            <a href={project.link} target="_blank">
              {project.link}
            </a>
          </div>
          <div>
            <a href={project.github} target="_blank">
              {project.github}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Project;
