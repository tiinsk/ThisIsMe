import React from 'react';
import styled from 'styled-components/macro';

import {H3, Paragraph} from '../../theme/fonts';
import Skill from './presentational/skill';

const StyledRatelessSkills = styled.div`
  .rateless-skills {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  ${H3} {
    @media (max-width: ${({theme}) => theme.breakpoints.xsSize}){
      margin-top: ${({theme}) => theme.spaces.base(2)};
    }
  }
`;

const RatelessSkills = ({topSkillTitle, topSkillBody, otherSkillTitle, otherSkillBody, topSkills, otherSkills}) => {
  return (
    <StyledRatelessSkills>
      <H3>{topSkillTitle}</H3>
      <Paragraph>{topSkillBody}</Paragraph>
      <div className="rateless-skills">
        {
          topSkills.map((skill, i) => {
            return (
              <Skill key={i} skill={skill.name} isPeakSkill={true}/>
            )
          })
        }
      </div>
      <H3>{otherSkillTitle}</H3>
      <Paragraph>{otherSkillBody}</Paragraph>
      <div className="rateless-skills">
        {
          otherSkills.map((skill, i) => {
            return (
              <Skill key={i} skill={skill.name}/>
            )
          })
        }
      </div>
    </StyledRatelessSkills>
  );
};

export default RatelessSkills;
