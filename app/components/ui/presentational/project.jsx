import React from 'react';
import translate from '../../../components/main/translate';
import Skill from './skill';
import IconButton from "./icon_button";

const Project = ({strings, project}) => {

  const image = require("../../../../assets/"+ project.image);

  return(
    <div className="project">
      <div className="project-wrapper">
        <div className="project-image" style={{backgroundImage: `url(${image}`}}/>
        <div className="project-name">
          <div>{strings.projects[project.key].name}</div>
          <div className="icons">
            <IconButton
              icon="public"
              link={project.link}
              type="material-icons"
            />
            <IconButton
              icon="github"
              link={project.github}
              type="fa-icons"
            />
          </div>
        </div>
        <div className="project-description">
          {strings.projects[project.key].description}
        </div>
        <div className="project-skills">
          {
            project.skills.map( (skill,i) => {
              return (
                <Skill key={i} skill={skill}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
};

export default translate(Project);
