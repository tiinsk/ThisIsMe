import React from 'react';
import SkillMeter from './skill_meter';

import skills from '../../../data/skills';
import LangSkill from "./lang_skill";
import styled from 'styled-components/macro';

const StyledConsoleSkills = styled.div`
.category-name{
    margin: 1rem 0;
  }
  .console-lang-skills {
  margin: 1rem 0;
}
`;

const Skills = ({strings}) => {
  return (
    <StyledConsoleSkills>
      <table>
        <tbody>
          {
            skills.ratedSkills.map((skill, i) => {
              return (
                <SkillMeter
                  key={i}
                  rate={skill.value}
                  name={strings.skills.skillNames[skill.key]}
                />
              )
            })
          }
        </tbody>
      </table>
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
      <div className="console-lang-skills">
        {
          strings.skills.languages.map((lang, i) => {
            return(
              <LangSkill
                key={i}
                lang={lang}
              />
            )
          })
        }
      </div>
    </StyledConsoleSkills>
  );
};

export default Skills;
