import React from 'react';

import translate from '../../../translate';

const colors = [
  '#f70047',
  '#00f791',
  '#f4f700',
  '#6f00f7',
  '#00b9f7',
  '#fd7c00',
  '#ff5000',
  '#ff0019'

];

const SkillRatioMeter = ({strings, skills}) => {

  return(
    <div className="skill-ratio-meter">
      {
        skills.map((skill, i) => {
          return(
            <div className="meter-item" key={i} style={{height: `${skill.value*9}px`}}>
              <div
                className={"skill-bar" + (i == 0 ? " first" : "") + (i == skills.length - 1 ? " last" : "")}
                style={{
                  backgroundColor: colors[i % colors.length]
                }}
              />
              <div className="skill-name">{`${strings.skills.skillNames[skill.key] || skill.key} (${skill.value}%)`}</div>
            </div>
          );
        })
      }
      <div className="light-reflection">
        <div className="reflection small"></div>
        <div className="reflection large"></div>
      </div>
    </div>
  )
};

export default translate(SkillRatioMeter);
