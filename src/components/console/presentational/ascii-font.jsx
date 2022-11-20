import React from 'react';
import styled from 'styled-components/macro';

import getAsciiFont from '../../../utils/asciifonts';

const StyledAsciiFont = styled.div`
font-size: 1.2rem;
  @media (max-width: ${({theme}) => theme.breakpoints.mdSize}){
    font-size: 1.1rem;
  }
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    font-size: 1.0rem;
  }
  @media (max-width: ${({theme}) => theme.breakpoints.xsSize}){
    font-size: 0.6rem;
  }
`;

const AsciiFont = ({text}) => {

  return (
    <StyledAsciiFont style={{whiteSpace: 'pre'}}>
      {getAsciiFont(text)}
    </StyledAsciiFont>
  )
};

export default AsciiFont;
