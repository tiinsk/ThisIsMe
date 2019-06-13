import React from 'react';

import Section from './presentational/section';
import Skill from './presentational/skill';
import SkillMeter from './presentational/skill_meter';

import skills from '../../data/skills';

import translate from '../main/translate';


const Skills = ({strings, scrollRef}) => {
  return (
    <div ref={scrollRef}>
      <Section
        titleId="titles.skills"
      >
        <div className="skills">
          <div className="rated-skills">
              {
                skills.rated_skills.map((skill, i) => {
                  return (
                    <SkillMeter
                      key={i}
                      rate={skill.value}
                      icon={skill.key}
                      color={skill.color}
                      textColor={skill.textColor}
                    />
                  )
                })
              }
          </div>
          <div className="rateless-skills">
            <div className="rateless-skills">
              {
                skills.otherSkills.map((skill, i) => {
                  return (
                    <Skill key={i} skill={skill}/>
                  )
                })
              }
            </div>
          </div>
          <div className="lang-skills">
            {
              strings.skills.languages.map((language) => {
                return (
                  <div className="language" key={language.language}>
                    <div className="lang-title">
                      <div className="lang-name">
                        {language.language}
                      </div>
                      <div className="lang-level">
                        {language.level}
                      </div>
                    </div>
                    <div className="lang-text">
                      {language.text}
                    </div>
                  </div>
                )})
            }
          </div>
        </div>
      </Section>
    </div>
  );
};

export default translate(Skills);
