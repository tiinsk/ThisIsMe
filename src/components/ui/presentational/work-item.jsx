import React from 'react';
import styled from 'styled-components/macro';

import {H3, H4, Paragraph} from '../../../theme/fonts';
import translate from '../../main/translate';
import Skill from './skill';

const StyledWorkItem = styled.div`
 .company{
    color: ${({theme}) => theme.colors.black};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
    text-transform: uppercase;
    font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
    font-family: ${({theme}) => theme.fonts.fontLato};

    margin: ${({theme}) => theme.spaces.baseSize}/2 0 ${({theme}) => theme.spaces.baseSize}/2 0;
  }
  .work-title{
    color: ${({theme}) => theme.colors.black};
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
        {strings.workExperience[data.key].company}
      </H3>
      <H4>
        {strings.workExperience[data.key].title}
      </H4>
      <div>
        <Paragraph>{strings.workExperience[data.key].description}</Paragraph>
        <div className={`wrapper ${isOnLeft ? 'left' : 'right'}`}>
          {data.topSkills ? data.topSkills.map((skill, i) => {
            return (
              <Skill key={i} skill={skill} isPeakSkill={true}/>
            )
          }) : null
          }
          {data.otherSkills ? data.otherSkills.map((skill, i) => {
            return (
              <Skill key={i} skill={skill}/>
            )
          }) : null
          }
        </div>
      </div>
    </StyledWorkItem>
  )
};

export default translate(WorkItem);
