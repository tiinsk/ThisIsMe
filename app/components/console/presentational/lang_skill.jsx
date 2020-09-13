import React from 'react';
import styled from 'styled-components';

const StyledConsoleLangSkill = styled.div`
.lang {
    color: white;
  }
  .level {
    color: ${({theme}) => theme.colors.magenta};
  }
  .text {
    color: ${({theme}) => theme.colors.greyText};
  }
`;

const LangSkill = ({lang}) => {
  return (
    <StyledConsoleLangSkill>
      <div>
        <span className="lang">{lang.language}</span> - <span className="level">{lang.level}</span>
      </div>
      <div className="text">{lang.text}</div>
    </StyledConsoleLangSkill>
  );
};

export default LangSkill;
