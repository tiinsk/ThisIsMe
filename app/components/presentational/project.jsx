import React from 'react';
import translate from '../../translate.jsx';

const Project = ({strings, project}) => {

  const image = require("../../../assets/"+ project.image);

  return(
    <div className="project">
      <div className="project-name">
        {strings.skills.projects[project.key].name}
        <div className="icons">
          <a href={project.link} target="_blank">
            <i className="fa fa-external-link"/>
          </a>
          <a href={project.github} target="_blank">
            <i className="fa fa-github-square"/>
          </a>
        </div>
      </div>
      <div className="details">
        <div className="image-wrapper">
          <div className="image" style={{backgroundImage: `url(${image}`}}></div>
        </div>
        <div className="project-description">
          {strings.skills.projects[project.key].description}
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
