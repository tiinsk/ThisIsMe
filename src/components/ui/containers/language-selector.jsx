import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components/macro';

import {ConsoleIcon} from './console-icon';


const StyledLanguageSelector = styled.div`
  width: ${({theme}) => theme.langSelectionWidth};
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .lang{
    height: 100px;

    cursor: pointer;
    text-transform: none;
    color: ${({theme}) => theme.UI.colors.bluishGrey};
    font-family: ${({theme}) => theme.fonts.fontLato};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
    font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};

    position: relative;

    display: flex;
    width: 100%;

    &:not(:first-child):before {
      content: "";
      height: 1px;
      width: 15px;
      background: ${({theme}) => theme.UI.colors.black};
      margin: 0 auto;
    }

    &.selected{
      color: ${({theme}) => theme.UI.colors.black};
    }

    .text-wrapper {
      white-space: nowrap;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      top: 50%;
    }
  }
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    display: none;
  }
`;

const LanguageSelector = () => {

  const onClickLink = (language) => {
    localStorage.setItem('language', language)
  }

  return (
    <StyledLanguageSelector>
      <Link className="lang" activeClassName="selected" to="/fi" replace={true}  onClick={() => onClickLink('fi')}>
        <div className="text-wrapper">
          Suomi
        </div>
      </Link>
      <Link className="lang" activeClassName="selected" to="/" replace={true} onClick={() => onClickLink('en')}>
        <div className="text-wrapper">
          English
        </div>
      </Link>
      <div className="lang" style={{cursor: 'default'}}>
        <Link className="text-wrapper" to="/console">
          <ConsoleIcon/>
        </Link>
      </div>
    </StyledLanguageSelector>
  )
};

export default LanguageSelector;
