import React from 'react';
import translate from '../../../translate.jsx';

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
                <div key={i} className="rateless-skill">
                  {strings.skills.skillNames[skill] || skill}
                </div>
              )
            }) : null
          }
        </div>
      </div>
    </div>
  )
};

export default translate(WorkItem);
