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
          {project.links.length > 0 && <div className="link-title">{linksTitle}:</div>}
          {project.links.map((link) => (
            <div key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            </div>
          ))}
        </div>
      </div>
    </StyledConsoleProject>
  )
};

export default Project;
