import React from 'react';
import styled from 'styled-components/macro';

const StyledConsoleIntroduction = styled.div`
  color: ${({theme}) => theme.console.colors.grey};
  .title {
    color: ${({theme}) => theme.UI.colors.white};
  }
`;

const Introduction = ({data}) => {
  return(
    <StyledConsoleIntroduction>
      <p className="title">
        {data.header.subtitle}
      </p>
      <div dangerouslySetInnerHTML={{ __html: data.aboutMe.body }}/>
    </StyledConsoleIntroduction>
  )
};

export default Introduction;
