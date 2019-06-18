import React from 'react';
import _ from 'lodash';

const MAX_RATE = 10;

const SkillMeter = ({rate, name}) => {
  return(
    <tr className="console-skill-meter">

        <td className="skill-title">{name}</td>
        <td className="metrics">
          <span className="rates">
          {
            _.range(rate).map(rateNum => " * " )
          }
          </span>
          <span className="unrated">
            {
              _.range(MAX_RATE-rate).map(rateNum => " * " )
            }
          </span>
        </td>
    </tr>
  )
};

export default SkillMeter;
