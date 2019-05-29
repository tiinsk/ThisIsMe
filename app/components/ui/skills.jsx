import React from 'react';

import Section from './presentational/section';
import SkillRatioMeter from './presentational/skill_ratio_meter';
import SkillMeter from './presentational/skill_meter';

import skills from '../../data/skills';

import translate from '../main/translate';


const Skills = ({strings}) => {

  const programmingPercentages = skills.programmingSkills;
  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <Section
      titleId="titles.skills"
    >
      <div className="skills">
        <SkillRatioMeter
          skills={programmingPercentages}
        />
        <div className="skill-categories">
          <div className="skill-category">
            <div className="category-name">
              <div>
                {strings.skills.frameworkSkills}
              </div>
            </div>
            <div>
              {
                skills.frameworkSkills.map((framework, i) => {
                  return (
                    <SkillMeter
                      key={i}
                      rate={framework.value}
                      icon={framework.framework}
                      color={framework.color}
                    />
                  )
                })
              }
            </div>
          </div>
          <div className="skill-category">
            <div className="category-name">
              <div>
                {strings.skills.langSkills}
              </div>
            </div>
            <div>
              {
                skills.lang_skills.map((language, i) => {
                  return (
                    <SkillMeter
                      key={i}
                      rate={language.value}
                      icon={language.language}
                      color={language.color}
                    />
                    )
                  })
              }
            </div>
          </div>
          <div className="skill-category">
            <div className="category-name">
              <div>
                {strings.skills.otherSkills}
              </div>
            </div>
            <div className="rateless-skills">
              {
                skills.otherSkills.map( (skill, i) => {
                  return(
                    <div key={i} className="rateless-skill">
                      {strings.skills.skillNames[skill] || skill}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default translate(Skills);
