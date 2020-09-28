import React from 'react';
import styled from 'styled-components/macro';

export const StyledHoverBubble = styled.div`
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);

  padding: ${({theme}) => theme.spaces.base(0.5)} ${({theme}) => theme.spaces.base(1)};
  border-radius: 3px;

  background: ${({theme}) => theme.new.colors.transparentBluishGrey};
  
  a {
    color: white;
    white-space: nowrap;
    font-family: ${({theme}) => theme.fonts.fontOpenSans};
    font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
    text-transform: none;
  }

  display: none;

  .arrow {
    position: absolute;
    top: 50%;
    transform:  translateY(-50%);
    left: 100%;
    z-index: 0;

    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;

    border-left: 10px solid ${({theme}) => theme.new.colors.transparentBluishGrey};
  }
`;

const HoverBubble = ({text, href, target}) => {
  return(
    <StyledHoverBubble>
      <a href={href} target={target}>
        {text}
      </a>
      <div className="arrow"/>
    </StyledHoverBubble>
  )
};

export default HoverBubble;
