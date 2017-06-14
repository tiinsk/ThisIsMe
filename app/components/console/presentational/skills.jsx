import React from 'react';

import SkillRatioMeter from './skill_ratio_meter';
import SkillMeter from './skill_meter';

import skills from '../../../data/skills';

const Skills = ({strings}) => {

  const programmingPercentages = skills.programmingSkills;

  return (

    <div className="console-skills">
        <SkillRatioMeter
          skills={programmingPercentages}
        />


        <div className="category-name">
          {strings.skills.frameworkSkills}
        </div>
        <table>
          <tbody>
            {
              skills.frameworkSkills.map((framework, i) => {
                return (
                  <SkillMeter
                    key={i}
                    rate={framework.value}
                    name={strings.skills.frameworks[framework.framework]}
                  />
                )
              })
            }
          </tbody>
        </table>
        <div className="category-name">
          {strings.skills.langSkills}
        </div>
        <table>
          <tbody>
            {
              skills.lang_skills.map((language, i) => {
                return (
                  <SkillMeter
                    key={i}
                    rate={language.value}
                    name={strings.skills.languages[language.language]}
                  />
                )
              })
            }
          </tbody>
        </table>
        <div className="category-name">
          {strings.skills.otherSkills}
        </div>
        <div className="rateless-skills">
          {
            skills.otherSkills.map( (skill, i) => {
              return(
                <div key={i} className="rateless-skill">
                  <span className="line">/</span>{strings.skills.skillNames[skill] || skill}<span className="line">/</span>
                </div>
              )
            })
          }
        </div>
    </div>
  );
};

export default Skills;
