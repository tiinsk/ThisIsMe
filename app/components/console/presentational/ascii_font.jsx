import React from 'react';
import getAsciiFont from "../../../utils/asciifonts";

import translate from '../../main/translate';
import styled from 'styled-components';

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

const AsciiFont = ({strings, text}) => {

  return(
    <StyledAsciiFont style={{whiteSpace: "pre"}}>
      {getAsciiFont(text)}
    </StyledAsciiFont>
  )
};

export default translate(AsciiFont);
