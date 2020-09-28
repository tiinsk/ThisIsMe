import React from 'react';

import Section from './presentational/section';
import TravelMap from './presentational/travel_map';
import translate from '../main/translate';
import styled from 'styled-components/macro';

const StyledInterests = styled.div`
 display: flex;
  width: 100%;

  .interest-list {
    padding: 0 ${({theme}) => theme.spaces.baseSize}*3 0 ${({theme}) => theme.spaces.baseSize};

    color: ${({theme}) => theme.colors.black};
    font-family: ${({theme}) => theme.fonts.fontLato};
    font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
    text-transform: uppercase;

    .interest {
      margin-bottom: ${({theme}) => theme.spaces.baseSize}/2;
    }
  }
  @media (max-width: ${({theme}) => theme.breakpoints.lgSize}){
    flex-wrap: wrap;
    .travel-map {
      flex: 0 0 100%;
    }
    .interest-list {
      margin-top: ${({theme}) => theme.spaces.baseSize};
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
          <TravelMap/>
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
