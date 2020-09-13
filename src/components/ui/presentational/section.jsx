import React from 'react';
import translate from '../../../components/main/translate';
import _ from 'lodash';

import styled from 'styled-components/macro';

const StyledSection = styled.div`
  position: relative;
  margin: 35rem 2rem;
  margin-left: 150px;

  max-width: 2000px;

  .title{
    margin: 0;
    color: ${({theme}) => theme.colors.lightGrey};
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
    max-width: 1200px;
  }

  @media (max-width: ${({theme}) => theme.breakpoints.breakpointMobile}){
    margin: 10rem 0;
    margin-left: ${({theme}) => theme.spaces.baseSize}*3;
    margin-right: ${({theme}) => theme.spaces.baseSize}/2;
    .title {
      font-size: 40px;
      padding-bottom: 3*${({theme}) => theme.spaces.baseSize}/4;
    }
    .section-body {
      margin: 0;
    }
  }
`;

const Section = ({strings, children, titleId, maxWidth}) => {
  return(
    <StyledSection>
      <div className="title">
        {_.get(strings, titleId)}
      </div>
      <div className="section-body" style={{maxWidth}}>
        {children}
      </div>
    </StyledSection>
  )
};

export default translate(Section);
