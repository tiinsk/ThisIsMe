import React from 'react';
import DashedLine from './dashed-line';
import styled from 'styled-components/macro';

const StyledConsoleProject = styled.div`
 .project-name{
    color: white;
    margin: 1rem 0;
  }
  .skill-title{
    margin-top: 1rem;
    color: ${({theme}) => theme.console.colors.green};
  }
  .link-title{
    color: ${({theme}) => theme.console.colors.green};
    margin-bottom: 1rem;
  }
  .project-description{
    margin-bottom: 1rem;
    color: ${({theme}) => theme.console.colors.grey};
  }
  .links{
    a{
      color: ${({theme}) => theme.console.colors.magenta};
    }
  }
`;

const Project = ({strings, project}) => {
  return(
    <StyledConsoleProject>
      <DashedLine/>
      <div className="project-name">
        {strings.projects[project.key].name}
      </div>
      <div className="project-description">
        {strings.projects[project.key].description}
        <div className="skill-title">{strings.titles.skills}:</div>
        <div className="rateless-skills">
          {
            project.topSkills.map( (skill,i) => {
              return (
                <div key={i} className="rateless-skill">
                  <span className="line">/</span><span className="asterix">*</span>
                  {strings.skills.skillNames[skill] || skill}
                  <span className="line">/</span>
                </div>
              )
            })
          }
          {
            project.otherSkills.map( (skill,i) => {
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
          {(project.link || project.github) && <div className="link-title">{strings.links}:</div>}
          {project.link &&
            <div>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {project.link}
              </a>
            </div>
          }
          { project.github &&
            <div>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                {project.github}
              </a>
            </div>
          }
        </div>
      </div>
    </StyledConsoleProject>
  )
};

export default Project;
