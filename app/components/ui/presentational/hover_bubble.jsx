import React from 'react';
import styled from 'styled-components';

const StyledHoverBubble = styled.div`
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);

  padding: ${({theme}) => theme.spaces.baseSize}/4 ${({theme}) => theme.spaces.baseSize}/2;
  border-radius: 3px;

  background: #50638c;
  color: white;
  white-space: nowrap;
  font-family: ${({theme}) => theme.fonts.fontOpenSans};
  font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};

  display: none;

  .arrow {
    position: absolute;
    top: -5px;
    left: 50%;
    z-index: 0;

    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    transform:  translateX(-50%);
    border-bottom: 5px solid #50638c;
  }
`;

const HoverBubble = ({text}) => {
  return(
    <StyledHoverBubble>
      {text}
      <div className="arrow"/>
    </StyledHoverBubble>
  )
};

export default HoverBubble;
