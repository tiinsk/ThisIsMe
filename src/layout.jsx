import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Anchor } from './theme/fonts';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`  
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  
    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
  
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
  
    /* Support for IE. */
    font-feature-settings: 'liga';
  }

  body{
    font-family: "Open Sans";
    margin: 0;
    font-size: 1.5rem;
  
    @media (max-width: ${({ theme }) => theme.breakpoints.smSize}) {
      &.mobile-menu-open {
        max-height: 100vh;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
      }
    }
  }
  
  html{
    height: 100%;
  
    font-size: 62.5%; //1.5rem -> 15px, 1.4rem ->14px etc.
  }
  
  a {
    ${Anchor};
  }
  
  button {
    border: none;
    outline: none;
    cursor: pointer;
    background: none;
  }
  
  *{
    box-sizing: border-box;
    font-family: inherit;
  }
  
  ::selection {
    background: #9eaada;
    color: white;
  }
  
  ::-moz-selection {
    background: #9eaada;
    color: white;
  }
  
  #root {
    overflow: hidden;
  }
  
  .white-box{
    background: white;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.18);
  }
`;

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </React.Fragment>
  );
}
