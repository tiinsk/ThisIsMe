import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

import { Anchor } from './theme/fonts';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  body{
    font-family: "Open Sans", sans-serif;
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

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query MetaQuery {
      site: datoCmsSite {
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
    }
  `);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <HelmetDatoCms favicon={data.site.faviconMetaTags} />
        {children}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Layout;
