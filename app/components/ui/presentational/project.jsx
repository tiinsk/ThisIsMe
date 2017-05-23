import React from 'react';
import translate from '../../../translate';

const Project = ({strings, project}) => {

  const image = require("../../../../assets/"+ project.image);

  return(
    <div className="project">
        <div className="project-name">
          <div>{strings.projects[project.key].name}</div>
        </div>
      <div className="wrapper">
        <div className="image-wrapper">
          <div className="image" style={{backgroundImage: `url(${image}`}}></div>
          <div className="icons">
            <a href={project.link} target="_blank" style={{marginBottom: "0.5rem"}}>
              <i className="fa fa-external-link"/>
            </a>
            <a href={project.github} target="_blank">
              <i className="fa fa-github-square"/>
            </a>
          </div>
        </div>
        <div className="project-description">
          {strings.projects[project.key].description}
          <div className="project-skills">
            {
              project.skills.map( (skill,i) => {
                return (
                  <div key={i} className="project-skill">{strings.skills.skillNames[skill] || skill}</div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default translate(Project);
