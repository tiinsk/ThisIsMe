import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components/macro';

import {languageOptions} from '../../../i18n/languages';
import {ConsoleIcon} from './console-icon';

const StyledLanguageSelectorSmall = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  
  display: flex;
  align-items: center;

  .lang{
    display: flex;
    align-items: center;
    margin: ${({theme}) => theme.spaces.baseSize} 0;
    cursor: pointer;

    font-family: ${({theme}) => theme.fonts.fontLato};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
    font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
    color: ${({theme}) => theme.UI.colors.bluishGrey};
    text-transform: none;
    
    span, a {
      padding: 0 ${({theme}) => theme.spaces.baseSize};
    }
    

    &:not(:first-child):before {
      content: '';
      height: 15px;
      width: 1px;
      background: ${({theme}) => theme.UI.colors.black};
      display: inline-block;
    }

    &.selected{
      color: ${({theme}) => theme.UI.colors.black};
    }
  }
`;

const LanguageSelectorSmall = ({onCloseMenu}) => {
  const onClickLink = (language) => {
    onCloseMenu()
    localStorage.setItem('language', language)
  }

  return (
    <StyledLanguageSelectorSmall>
      <Link className="lang" activeClassName="selected" to="/fi" onClick={() => onClickLink('fi')}>
        <span>{languageOptions.fi}</span>
      </Link>
      <Link className="lang" activeClassName="selected" to="/" onClick={() => onClickLink('en')}>
        <span>{languageOptions.en}</span>
      </Link>
      <div className="lang">
        <Link to="/console" style={{height: '26px'}} onClick={onCloseMenu}>
          <ConsoleIcon/>
        </Link>
      </div>
    </StyledLanguageSelectorSmall>
  )
};

export default LanguageSelectorSmall;
