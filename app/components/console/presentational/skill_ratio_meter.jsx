import React from 'react';
import _ from 'lodash';

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
    <div className="console-skill-ratio-meter">
      <table>
        <tbody>
        {
          skills.map((skill, i) => {
            return(
              <tr className="skill-bar" key={i}>
                <td className="skill-name">{strings.skills.skillNames[skill.key] || skill.key}</td>
                <td
                  key={i}
                  style={{
                    color: colors[i % colors.length]
                  }}>
                    {
                      _.range(skill.value).map(line => (<span className="line"/>))
                    }
                  <span className="skill-rate">{skill.value}%</span>
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
  )
};

export default translate(SkillRatioMeter);
