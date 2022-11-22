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

const Project = ({project, skillsTitle, linksTitle}) => {
  return(
    <StyledConsoleProject>
      <DashedLine/>
      <div className="project-name" dangerouslySetInnerHTML={{__html: project.title}} />
      <div className="project-description">
        {project.body}
        <div className="skill-title">{skillsTitle}:</div>
        <div className="rateless-skills">
          {
            project.peakSkills.map( (skill,i) => {
              return (
                <div key={i} className="rateless-skill">
                  <span className="line">/</span><span className="asterix">*</span>
                  {skill.name}
                  <span className="line">/</span>
                </div>
              )
            })
          }
          {
            project.skills.map( (skill,i) => {
              return (
                <div key={i} className="rateless-skill">
                  <span className="line">/</span>
                  {skill.name}
                  <span className="line">/</span>
                </div>
              )
            })
          }
        </div>
        <div className="links">
          {(project.githubUrl || project.websiteUrl || project.designsUrl) && <div className="link-title">{linksTitle}:</div>}
          {project.websiteUrl &&
            <div>
              <a href={project.websiteUrll} target="_blank" rel="noopener noreferrer">
                {project.websiteUrll}
              </a>
            </div>
          }
          { project.githubUrl &&
            <div>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                {project.githubUrl}
              </a>
            </div>
          }
          { project.designsUrl &&
          <div>
            <a href={project.designsUrl} target="_blank" rel="noopener noreferrer">
              {project.designsUrl}
            </a>
          </div>
          }
        </div>
      </div>
    </StyledConsoleProject>
  )
};

export default Project;
