import React from 'react';

import styled from 'styled-components';

const StyledConsoleIntroduction = styled.div`
color: ${({theme}) => theme.colors.greyText};
  .highlight{
    color: white;
  }
`;

const Introduction = ({strings}) => {
  return(
    <StyledConsoleIntroduction dangerouslySetInnerHTML={{__html: strings.introduction}}>
    </StyledConsoleIntroduction>
  )
};

export default Introduction;
