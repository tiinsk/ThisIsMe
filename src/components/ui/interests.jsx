import React from 'react';
import styled from 'styled-components/macro';

import {TravelPlane} from './presentational/plane';
import travelPlanet from '../../assets/travel-planet.png';
import translate from '../main/translate';
import Section from './presentational/section';

const StyledInterests = styled.div`
  min-height: 575px;

  .planet {
    width: 50%;
    position: relative;
    
    img {
      position: absolute;
      height: 1200px;
      top: -70px;
      left: -600px;
      z-index: -1;
      @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
        height: 800px;
        top: 20px;
        left: -400px;
      }
      @media (max-width: ${({theme}) => theme.breakpoints.xsSize}){
        height: 700px;
        top: 0;
        left: -350px;
      }
    }
  }

  .interest-list {
    margin-left: 50%;
    padding:  ${({theme}) => theme.spaces.base(3)};
    padding-top: 0;

    color: ${({theme}) => theme.UI.colors.black};
    font-family: ${({theme}) => theme.fonts.fontLato};
    font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
    text-transform: uppercase;
    
    @media (max-width: ${({theme}) => theme.breakpoints.mdSize}){
      margin-left: 0;
    }

    .interest {
      margin-bottom: ${({theme}) => theme.spaces.base(0.5)};
    }
  }
`;

const Interests = ({strings, scrollRef}) => {
  return (
    <div ref={scrollRef}>
      <Section
        titleId="titles.interests"
      >
        <StyledInterests>
          <div className="planet">
            <img src={travelPlanet} alt="Travel planet"/>
            <TravelPlane/>
          </div>
          <div className="interest-list">
            {
              strings.interests.interest_list.map(interest => (
                <div className="interest" key={interest}>{interest}</div>
              ))
            }
          </div>
        </StyledInterests>
      </Section>
    </div>
  )
};

export default translate(Interests);
