import React from 'react';
import styled from 'styled-components/macro';

import {H3, H4, Paragraph} from '../../../theme/fonts';
import translate from '../../main/translate';
import Skill from './skill';

const StyledWorkItem = styled.div`
 .company{
    color: ${({theme}) => theme.UI.colors.black};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
    text-transform: uppercase;
    font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
    font-family: ${({theme}) => theme.fonts.fontLato};

    margin: ${({theme}) => theme.spaces.baseSize}/2 0 ${({theme}) => theme.spaces.baseSize}/2 0;
  }
  .work-title{
    color: ${({theme}) => theme.UI.colors.black};
    font-family: ${({theme}) => theme.fonts.fontLato};
    font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};

    margin: 3*${({theme}) => theme.spaces.baseSize}/4 0;
  }
  .wrapper{
    margin-top: ${({theme}) => theme.spaces.baseSize};

    display: flex;
    flex-wrap: wrap;

    &.left {
      justify-content: flex-end;

      @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
        justify-content: flex-start;
      }
    }
  }
`;


const WorkItem = ({strings, data, isOnLeft}) => {
  return (
    <StyledWorkItem>
      <H3>
        {data.company}
      </H3>
      <H4>
        {data.title}
      </H4>
      <div>
        <Paragraph>{data.body}</Paragraph>
        <div className={`wrapper ${isOnLeft ? 'left' : 'right'}`}>
          {data.peakSkills ? data.peakSkills.map((skill, i) => {
            return (
              <Skill key={i} skill={skill.name} isPeakSkill={true}/>
            )
          }) : null
          }
          {data.skills ? data.skills.map((skill, i) => {
            return (
              <Skill key={i} skill={skill.name}/>
            )
          }) : null
          }
        </div>
      </div>
    </StyledWorkItem>
  )
};

export default translate(WorkItem);
