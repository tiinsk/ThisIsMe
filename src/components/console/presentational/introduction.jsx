import React from 'react';
import styled from 'styled-components/macro';

const StyledConsoleIntroduction = styled.div`
  color: ${({theme}) => theme.console.colors.grey};
  .title {
    color: ${({theme}) => theme.UI.colors.white};
  }
`;

const Introduction = ({strings}) => {
  return(
    <StyledConsoleIntroduction>
      <p className="title">
        {strings.summary.title}
      </p>
      <p>
        {strings.introduction}
      </p>
    </StyledConsoleIntroduction>
  )
};

export default Introduction;
