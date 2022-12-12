import React from 'react';
import translate from '../../main/translate';
import Skill from "./skill";
import styled from 'styled-components/macro';

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
  .work-description{
    color: ${({theme}) => theme.colors.black};
    font-family: ${({theme}) => theme.fonts.fontOpenSans};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
    font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
    line-height: 2.5rem;
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
  return(
    <StyledWorkItem>
      <div className="company">
        {strings.workExperience[data.key].company}
      </div>
      <div className="work-title">
        {strings.workExperience[data.key].title}
      </div>
      <div className="work-description">
        {strings.workExperience[data.key].description}
        <div className={`wrapper ${isOnLeft ? 'left' : 'right'}`}>
          { data.skillList ? data.skillList.map( (skill,i) => {
              return(
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
