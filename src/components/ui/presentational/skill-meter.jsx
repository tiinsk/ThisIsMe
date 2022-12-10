import React from 'react';
import styled from 'styled-components/macro';

const MAX_RATE = 10;

const StyledSkillMeter = styled.div`
  position: relative;
  margin: 0 ${({theme}) => theme.spaces.baseSize};
  margin-bottom: ${({theme}) => theme.spaces.baseSize};

  display: flex;
  align-items: stretch;
  
  max-width: 100%;
  min-width: 300px;
  
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    margin: 0;
  }

  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @keyframes slideInLeft {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInLeft {
    -webkit-animation-name: slideInLeft;
    animation-name: slideInLeft;
  }

  .icon{
    flex-shrink: 0;

    height: 60px;
    width: 60px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .skill-bar-wrapper {
    flex-grow: 1;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    margin-left: ${({theme}) => theme.spaces.base(0.5)};

    .skill-name {
      font-family: ${({theme}) => theme.fonts.fontOpenSans};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
      color: ${({theme}) => theme.UI.colors.grey};
    }

    .skill-rate {
      position: absolute;
      right: 0;
      
      padding-right: 5px;
      padding-bottom: 3px;

      font-family: ${({theme}) => theme.fonts.fontLato};
      font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
      font-size: ${({theme}) => theme.fontSizes.fontSizeXXXSmall};
      color: ${({theme}) => theme.console.colors.grey};
    }

    .skill-bar {
      position: relative;
      width: 100%;

      height: 15px;
      border-radius: 15px;

      background: ${({theme}) => theme.UI.colors.superLightGrey};
      box-shadow: ${({theme}) => theme.UI.colors.insetShadow};

      overflow: hidden;

      .fill {
        height: 100%;
        animation-delay: 0.3s;
        transform: translate3d(-100%, 0, 0);
      }
    }
  }
`;

const SkillMeter = ({name, icon, color1, color2, rate, entered}) => {
  return(
    <StyledSkillMeter>
      {icon && <div className="icon" style={
        {
          backgroundImage: `url(${icon})`
        }
      }/>}
      <div className="skill-bar-wrapper">
        <div className="skill-name">{name}</div>
        <div
          className="skill-rate"
        >
          {rate}/10
        </div>
        <div className="skill-bar">
          <div
            className={`fill ${entered ? 'animated slideInLeft' : ''}`}
            style={{
              width: `${rate/MAX_RATE*100}%`,
              background: `linear-gradient(90deg, ${color1} 50%, ${color2} 100%)`
            }}
          />
        </div>
      </div>
    </StyledSkillMeter>
  )
};

export default SkillMeter;
