import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import styled from 'styled-components/macro';

import {chooseLanguage} from '../../../actions/language_actions';
import {languageOptions} from '../../../i18n/languages';
import translate from '../../main/translate';
import {ConsoleIcon} from './console-icon';

const StyledLanguageSelectorSmall = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: ${({theme}) => theme.UI.colors.bluishGrey};
  z-index: 2;
  
  display: flex;
  align-items: center;

  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};

  .lang{
    display: flex;
    align-items: center;
    margin: ${({theme}) => theme.spaces.baseSize} 0;
    cursor: pointer;
    
    span, a {
      padding: 0 ${({theme}) => theme.spaces.baseSize};
    }
    

    &:not(:first-of-type):before {
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

const LanguageSelectorSmall = ({chooseLanguage, language, onCloseMenu}) => {
  return (
    <StyledLanguageSelectorSmall>
      <div className={'lang' + (language === 'fi' ? ' selected' : '')} onClick={() => chooseLanguage('fi')}>
        <span>{languageOptions.fi}</span>
      </div>
      <div className={'lang' + (language === 'en' ? ' selected' : '')} onClick={() => chooseLanguage('en')}>
        <span>{languageOptions.en}</span>
      </div>
      <div className="lang">
        <Link to="/console" style={{height: '26px'}} onClick={onCloseMenu}>
          <ConsoleIcon/>
        </Link>
      </div>
    </StyledLanguageSelectorSmall>
  )
};

function mapStateToProps({language}) {
  return {
    language: language.language
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({chooseLanguage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(LanguageSelectorSmall));
