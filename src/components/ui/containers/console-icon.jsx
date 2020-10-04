import React from 'react';
import styled from 'styled-components/macro';

const StyledConsoleIcon = styled.svg`
  @keyframes blinker {
    0% { opacity: 1; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
  .blinking-line {
    animation: blinker 1s steps(1, start) infinite;
  }
`;

export const ConsoleIcon = () => {
  return (
    <StyledConsoleIcon xmlns="http://www.w3.org/2000/svg" width="31" height="26" viewBox="0 0 31 26">
      <g fill="none" fillRule="evenodd">
        <rect width="31" height="26" fill="#D9D9D9" rx="2"/>
        <circle cx="4" cy="3" r="1" fill="#E57272"/>
        <circle cx="8" cy="3" r="1" fill="#75A968"/>
        <rect width="25" height="18" x="3" y="6" fill="#3A3A3A"/>
        <polyline stroke="#ABF099" points="7 12 11 15.789 7 20"/>
        <path className="blinking-line" stroke="#ABF099" d="M15,19 L23,19"/>
      </g>
    </StyledConsoleIcon>
  );
}
