import React from 'react';

import translate from '../../main/translate';

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
      <div style={{
        display: "flex"
      }}>
        <div className="meter">
        {
          skills.map((skill, i) => {
            return(
              <div
                className="meter-item"
                key={i}
                style={{
                  height: `${skill.value/2}rem`
                }}
              >
                <div
                  className="skill-bar"
                  style={{
                    backgroundColor: colors[i % colors.length]
                  }}
                />
              </div>
            );
          })
        }
        </div>
        <div className="names">
          {
            skills.map((skill, i) => {
              return(
                <div
                  className="name-item"
                  key={i}
                  style={{
                    height: `${skill.value/2}rem`
                  }}
                >
                  <div className="skill-name">{`${strings.skills.skillNames[skill.key] || skill.key} (${skill.value}%)`}</div>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="light-reflection">
        <div className="reflection small"></div>
        <div className="reflection large"></div>
      </div>
    </div>
  )
};

export default translate(SkillRatioMeter);
