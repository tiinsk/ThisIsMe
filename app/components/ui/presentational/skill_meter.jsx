import React from 'react';

import translate from '../../main/translate';

const MAX_RATE = 5;

const SkillMeter = ({strings, icon, color, textColor, rate}) => {
  return(
    <div className="skill-meter">
      <div className="icon" style={
        {
          backgroundImage: `url(${require(`../../../../assets/${icon}.svg`)}`
        }
      }/>
      <div className="skill-bar-wrapper">
        <div className="skill-name" style={{
          color: textColor
        }}>{strings.skills.skillNames[icon] || icon}</div>
        <div className="skill-bar">
          <div
            className="skill-rate"
            style={{
              left: `${rate/MAX_RATE*100}%`
            }}
          >
            {rate}/10
          </div>
          <div
            className="fill"
            style={{
              width: `${rate/MAX_RATE*100}%`,
              backgroundColor: color
            }}
          />
        </div>
      </div>
    </div>
  )
};

export default translate(SkillMeter);
