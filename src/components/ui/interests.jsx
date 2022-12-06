import React from 'react';
import styled from 'styled-components/macro';

import {TravelPlane} from './presentational/plane';
import Section from './presentational/section';
import { GatsbyImage } from 'gatsby-plugin-image';

const StyledInterests = styled.div`
  min-height: 575px;

  .planet {
    position: relative;
    
    .gatsby-image-wrapper {
      position: absolute;
      height: 1200px;
      width: 1200px;
      top: -70px;
      left: -600px;
      z-index: -1;
      @media (min-width: ${({theme}) => theme.breakpoints.xxlgSize}){
        height: 1400px;
        width: 1400px;
        top: -270px;
        left: -700px;
      }
      @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
        height: 800px;
        width: 800px;
        top: 20px;
        left: -400px;
      }
      @media (max-width: ${({theme}) => theme.breakpoints.xsSize}){
        height: 700px;
        width: 700px;
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

const Interests = ({scrollRef, interests}) => {
  return (
    <div ref={scrollRef}>
      <Section
        title={interests.title}
      >
        <StyledInterests>
          <div className="planet">
            <GatsbyImage image={interests.image.gatsbyImageData} alt={interests.image.alt}/>
            <TravelPlane/>
          </div>
          <div className="interest-list">
            {
              interests.interests.map(interest => (
                <div className="interest" key={interest.title}>{interest.title}</div>
              ))
            }
          </div>
        </StyledInterests>
      </Section>
    </div>
  )
};

export default Interests;
