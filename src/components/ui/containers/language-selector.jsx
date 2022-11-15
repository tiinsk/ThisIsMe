import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'gatsby';
import styled from 'styled-components/macro';

import {chooseLanguage} from '../../../actions/language_actions';
import {languageOptions} from '../../../i18n/languages';
import translate from '../../main/translate';
import {ConsoleIcon} from './console-icon';


const StyledLanguageSelector = styled.div`
 width: ${({theme}) => theme.langSelectionWidth};
  flex-shrink: 0;

  color: ${({theme}) => theme.UI.colors.bluishGrey};

  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .lang{
    height: 100px;

    cursor: pointer;

    position: relative;

    display: flex;
    width: 100%;

    &:not(:first-of-type):before {
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

const LanguageSelector = ({chooseLanguage, language}) => {
  return (
    <StyledLanguageSelector>
      <div className={'lang' + (language === 'fi' ? ' selected' : '')} onClick={() => chooseLanguage('fi')}>
        <div className="text-wrapper">
          {languageOptions.fi}
        </div>
      </div>
      <div className={'lang' + (language === 'en' ? ' selected' : '')} onClick={() => chooseLanguage('en')}>
        <div className="text-wrapper">
          {languageOptions.en}
        </div>
      </div>
      <div className="lang" style={{cursor: 'default'}}>
        <Link className="text-wrapper" to="/console">
          <ConsoleIcon/>
        </Link>
      </div>
    </StyledLanguageSelector>
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

export default connect(mapStateToProps, mapDispatchToProps)(translate(LanguageSelector));
