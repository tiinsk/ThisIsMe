import React from 'react';
import styled from 'styled-components/macro';

import translate from '../../main/translate';

const MAX_RATE = 10;


const StyledSkillMeter = styled.div`
  position: relative;
  margin-bottom: ${({theme}) => theme.spaces.baseSize};

  display: flex;
  align-items: stretch;

  .icon{
    flex-shrink: 0;

    height: 60px;
    width: 60px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    @media (max-width: ${({theme}) => theme.breakpoints.xsSize}){

    }
  }
  .skill-bar-wrapper {
    flex-grow: 1;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    margin-left: ${({theme}) => theme.spaces.base(0.5)};

    .skill-name {
      font-family: ${({theme}) => theme.fonts.fontQuicksand};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightMedium};
      color: ${({theme}) => theme.new.colors.grey};
    }

    .skill-rate {
      position: absolute;
      right: 0;
      
      padding-right: 5px;
      padding-bottom: 3px;

      font-family: ${({theme}) => theme.fonts.fontLato};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
      font-size: ${({theme}) => theme.fontSizes.fontSizeXXXSmall};
      color: ${({theme}) => theme.colors.greyText};
    }

    .skill-bar {
      position: relative;
      width: 100%;

      height: 15px;
      border-radius: 15px;

      background: ${({theme}) => theme.new.colors.superLightGrey};
      box-shadow: ${({theme}) => theme.new.colors.insetShadow};

      overflow: hidden;

      .fill {
        height: 100%;
        animation-delay: 0.3s;
        transform: translate3d(-100%, 0, 0);
      }
    }
  }
`;

const SkillMeter = ({strings, icon, color, rate, entered}) => {
  return(
    <StyledSkillMeter>
      <div className="icon" style={
        {
          backgroundImage: `url(${require(`../../../assets/skills/${icon}.svg`)}`
        }
      }/>
      <div className="skill-bar-wrapper">
        <div className="skill-name">{strings.skills.skillNames[icon] || icon}</div>
        <div
          className="skill-rate"
        >
          {rate}/10
        </div>
        <div className="skill-bar">
          <div
            className={`fill ${entered ? "animated slideInLeft" : ""}`}
            style={{
              width: `${rate/MAX_RATE*100}%`,
              background: color
            }}
          />
        </div>
      </div>
    </StyledSkillMeter>
  )
};

export default translate(SkillMeter);
