import React from 'react';
import DashedLine from './dashed_line';
import styled from 'styled-components';

const StyledConsoleProject = styled.div`
 .project-name{
    color: white;
    margin: 1rem 0;
  }
  .skill-title{
    margin-top: 1rem;
    color: ${({theme}) => theme.colors.green}
  }
  .link-title{
    color: ${({theme}) => theme.colors.green}
    margin-bottom: 1rem;
  }
  .project-description{
    margin-bottom: 1rem;
    color: ${({theme}) => theme.colors.greyText};
  }
  .links{
    a{
      color: ${({theme}) => theme.colors.magenta};
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
    </StyledConsoleProject>
  )
};

export default Project;
