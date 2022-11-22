import React from 'react';
import styled from 'styled-components/macro';

import LangSkill from './lang-skill';
import SkillMeter from './skill-meter';

const StyledConsoleSkills = styled.div`
  .category-name {
    margin: 1rem 0;
  }
  .console-lang-skills {
    margin: 1rem 0;
  }
`;

const Skills = ({ data }) => {
  return (
    <StyledConsoleSkills>
      <table>
        <tbody>
          {data.skills.ratedTopSkills.map((skill, i) => {
            return (
              <SkillMeter
                key={i}
                rate={skill.rate}
                name={skill.skill.name}
              />
            );
          })}
          {data.skills.ratedOtherSkills.map((skill, i) => {
            return (
              <SkillMeter
                key={i}
                rate={skill.rate}
                name={skill.skill.name}
              />
            );
          })}
        </tbody>
      </table>
      <div className="rateless-skills">
        {data.skills.ratelessTopSkills.map((skill, i) => {
          return (
            <div key={i} className="rateless-skill">
              <span className="line">/</span>
              <span className="asterix">*</span>
              {skill.name}
              <span className="line">/</span>
            </div>
          );
        })}
        {data.skills.ratelessOtherSkills.map((skill, i) => {
          return (
            <div key={i} className="rateless-skill">
              <span className="line">/</span>
              {skill.name}
              <span className="line">/</span>
            </div>
          );
        })}
      </div>
      <div className="console-lang-skills">
        {data.skills.languageSkills.map((lang, i) => {
          return <LangSkill key={i} lang={lang} />;
        })}
      </div>
    </StyledConsoleSkills>
  );
};

export default Skills;
