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
            {/*<div className="skill-category">
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
          </div>*/}
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
        </div>
      </Section>
    </div>
  );
};

export default translate(Skills);
