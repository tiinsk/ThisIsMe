import React from 'react';
import styled from 'styled-components/macro';

const StyledConsoleLangSkill = styled.div`
.lang {
    color: white;
  }
  .level {
    color: ${({theme}) => theme.console.colors.magenta};
  }
  .text {
    color: ${({theme}) => theme.console.colors.grey};
  }
`;

const LangSkill = ({lang}) => {
  return (
    <StyledConsoleLangSkill>
      <div>
        <span className="lang">{lang.title}</span> - <span className="level">{lang.level}</span>
      </div>
      <div className="text">{lang.body}</div>
    </StyledConsoleLangSkill>
  );
};

export default LangSkill;
