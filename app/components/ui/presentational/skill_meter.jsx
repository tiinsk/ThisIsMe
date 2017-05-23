import React from 'react';

import translate from '../../../translate';

const SkillMeter = ({icon, color, rate}) => {
  return(
    <div className="skill-meter">
      <div className="skill-bar">
        <div
          className="fill"
          style={{
            width: `${rate/5*100}%`,
            backgroundColor: color
          }}
        />
        <div className="light-reflection">
          <div className="reflection large"></div>
          <div className="reflection small"></div>
        </div>
        <div className="metrics">
          {
            ["20%", "40%", "60%", "80%"].map( pos => <div key={pos} className="line lg-line" style={{left: pos}}></div>)
          }
          {
            ["10%", "30%", "50%", "70%", "90%"].map( pos => <div key={pos} className="line sm-line" style={{left: pos}}></div>)
          }
        </div>
      </div>
      <div className="icon" style={
        {
          backgroundImage: `url(${require(`../../../../assets/${icon}.png`)}`
        }
      }></div>
    </div>
  )
};

export default translate(SkillMeter);
