import React from 'react';

import styled from 'styled-components/macro';

const StyledTimeLine = styled.div`
position: relative;
  margin: 0 auto;
  @media (max-width: ${({theme}) => theme.breakpoints.mdSize}){
    max-width: 700px;
  }
  .line-dot{
    height: 0.8rem;
    width: 0.8rem;
    background-color: ${({theme}) => theme.colors.greenTimeline};
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
      left: 0;
    }
  }
  .end-dot{
    bottom: 0;
  }
  .line{
    height: 100%;
    width: 4px;
    background-color: ${({theme}) => theme.colors.greenTimeline};
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    @media (max-width: ${({theme}) => theme.breakpoints.mdSize}) {
      left: 0;
    }
  }
`;

const TimeLine = ({children}) => {

  return(
    <StyledTimeLine>
      <div className="line"/>
      <div className="end-dot line-dot"/>
      {children}
    </StyledTimeLine>
  )
};

export default TimeLine;
