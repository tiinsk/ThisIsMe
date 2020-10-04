import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import styled from 'styled-components/macro';

import translate from '../../main/translate';
import {languageOptions} from '../../../i18n/languages';
import {chooseLanguage} from '../../../actions/language_actions';
import {ConsoleIcon} from './console-icon';

const StyledLanguageSelectorSmall = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: ${({theme}) => theme.colors.greyUnselectedText};
  z-index: 2;
  
  display: flex;
  align-items: center;

  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};

  .lang{
    display: inline-block;
    margin: ${({theme}) => theme.spaces.baseSize} 0;
    cursor: pointer;
    padding: 0 ${({theme}) => theme.spaces.baseSize};
    
    &:not(:first-of-type) {
      //margin-left: 0;
    }

    &:not(:first-of-type):before {
      content: '';
      height: 15px;
      width: 1px;
      background: ${({theme}) => theme.colors.black};
      display: inline-block;
      margin-right: ${({theme}) => theme.spaces.baseSize};
    }

    &.selected{
      color: ${({theme}) => theme.colors.black};
    }
  }
`;

const LanguageSelectorSmall = ({chooseLanguage, language}) => {
  return(
    <StyledLanguageSelectorSmall>
      <div className={"lang" + (language === "fi" ? " selected": "")} onClick={() => chooseLanguage("fi")}>
        {languageOptions.fi}
      </div>
      <div className={"lang" + (language === "en" ? " selected": "")} onClick={() => chooseLanguage("en")}>
        {languageOptions.en}
      </div>
      <div className="lang" style={{display: 'flex', alignItems: 'center'}}>
        <Link to="/console">
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
