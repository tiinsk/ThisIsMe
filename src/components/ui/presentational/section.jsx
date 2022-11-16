import React from 'react';
import {get} from 'lodash';
import styled from 'styled-components/macro';

import translate from '../../../components/main/translate';

export const StyledSection = styled.div`
  position: relative;
  margin: 20rem 2rem 25rem 2rem;
  margin-left: 150px;

  .title{
    margin: 0;
    color: ${({theme}) => theme.UI.colors.darkGrey};
    font-size: 80px;

    text-transform: uppercase;
    font-family: ${({theme}) => theme.fonts.fontLato};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};

    white-space: nowrap;
    position: absolute;
    top: 0;
    right: 100%;
    transform-origin: top right;
    transform: rotate(-90deg) translateY(-100%);

  }
  .section-body{
    position: relative;
    margin-left: 10%;
    max-width: 1400px;
  }

  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    margin: 10rem 0;
    margin-left: ${({theme}) => theme.spaces.base(2.5)};
    margin-right: ${({theme}) => theme.spaces.base(0.5)};
    .title {
      font-size: 45px;
      padding-bottom: ${({theme}) => theme.spaces.base(0.2)};
    }
    .section-body {
      margin: 0;
      margin-left: ${({theme}) => theme.spaces.base(0.5)};
    }
  }
  @media (min-width: ${({theme}) => theme.breakpoints.xxlgSize}) {
    margin-right: 150px;
    
    .section-body {
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }
`;

const Section = ({strings, children, titleId, title, maxWidth, bodyStyle = {}, ...props}) => {
  return(
    <StyledSection {...props}>
      <div className="section-body" style={{maxWidth, ...bodyStyle}}>
        {children}
      </div>
      <div className="title">
        {title || get(strings, titleId)}
      </div>
    </StyledSection>
  )
};

export default translate(Section);
