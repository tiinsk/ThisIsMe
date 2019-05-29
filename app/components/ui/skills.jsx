import React from 'react';

import Section from './presentational/section';
import Skill from './presentational/skill';
import SkillMeter from './presentational/skill_meter';

import skills from '../../data/skills';

import translate from '../main/translate';


const Skills = ({strings}) => {
  return (
    <Section
      titleId="titles.skills"
    >
      <div className="skills">
        <div className="rated-skills">
          <div className="skill-column">
            {
              skills.rated_skills.slice(0, 4).map((skill, i) => {
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
          <div className="skill-column">
            {
              skills.rated_skills.slice(4, 8).map((framework, i) => {
                return (
                  <SkillMeter
                    key={i}
                    rate={framework.value}
                    icon={framework.key}
                    color={framework.color}
                    textColor={framework.textColor}
                  />
                )
              })
            }
          </div>
          <div className="skill-column">
            {
              skills.rated_skills.slice(8).map((framework, i) => {
                return (
                  <SkillMeter
                    key={i}
                    rate={framework.value}
                    icon={framework.key}
                    color={framework.color}
                    textColor={framework.textColor}
                  />
                )
              })
            }
          </div>
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
          <div className="rateless-skills">
            <div className="rateless-skills">
              {
                skills.otherSkills.map( (skill, i) => {
                  return(
                    <Skill key={i} skill={skill}/>
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
