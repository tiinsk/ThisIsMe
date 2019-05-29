import React from 'react';
import translate from '../../main/translate';
import Skill from "./skill";

const WorkItem = ({strings, data}) => {
  return(
    <div className="work-item">
      <div className="company">
        {strings.workExperience[data.key].company}
      </div>
      <div className="work-title">
        {strings.workExperience[data.key].title}
      </div>
      <div className="work-description">
        {strings.workExperience[data.key].description}
        <div className="wrapper">
          { data.skillList ? data.skillList.map( (skill,i) => {
              return(
                <Skill key={i} skill={skill}/>
              )
            }) : null
          }
        </div>
      </div>
    </div>
  )
};

export default translate(WorkItem);
