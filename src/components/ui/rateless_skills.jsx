import React from 'react';
import styled from 'styled-components/macro';

import Skill from './presentational/skill';
import skills from '../../data/skills';
import translate from '../main/translate';
import {H3, Paragraph} from '../../theme/fonts';

const StyledRatelessSkills = styled.div`
  .rateless-skills {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin-bottom: ${({theme}) => theme.spaces.base(2)};
  }
`;

const RatelessSkills = ({strings}) => {
  return (
    <StyledRatelessSkills>
      <H3>{strings.skills.ratelessSkills.topSkills.title}</H3>
      <Paragraph>{strings.skills.ratelessSkills.topSkills.subtitle}</Paragraph>
      <div className="rateless-skills">
        {
          skills.ratelessSkills.topSkills.map((skill, i) => {
            return (
              <Skill key={i} skill={skill} isPeakSkill={true}/>
            )
          })
        }
      </div>
      <H3>{strings.skills.ratelessSkills.bottomSkills.title}</H3>
      <Paragraph>{strings.skills.ratelessSkills.bottomSkills.subtitle}</Paragraph>
      <div className="rateless-skills">
        {
          skills.ratelessSkills.bottomSkills.map((skill, i) => {
            return (
              <Skill key={i} skill={skill}/>
            )
          })
        }
      </div>
    </StyledRatelessSkills>
  );
};

export default translate(RatelessSkills);
