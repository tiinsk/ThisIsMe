import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import translate from '../../main/translate';
import {languageOptions} from '../../../i18n/languages';
import {chooseLanguage} from '../../../actions/language_actions';
import styled from 'styled-components/macro';

const StyledLanguageSelectorSmall = styled.div`
 position: absolute;
  top: 0;
  left: 0;
  color: ${({theme}) => theme.colors.greyUnselectedText};
  z-index: 2;

  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};

  .lang{
    display: inline-block;
    margin: ${({theme}) => theme.spaces.baseSize};
    cursor: pointer;

    &:first-of-type {
      padding-right: ${({theme}) => theme.spaces.baseSize};
      margin-right: 0;
      border-right: 1px solid ${({theme}) => theme.colors.greyUnselectedText};
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
