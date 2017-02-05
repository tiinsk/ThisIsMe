import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import translate from '../../translate.jsx';
import {languageOptions} from '../../i18n/languages';
import {chooseLanguage} from '../../actions/language_actions';

const Header = ({strings, chooseLanguage, language}) => {
  return(
    <div className="header">
      <div className="overlay"></div>
      <div className="titles">
        <div className="title">
          {strings.introductionLine1}
        </div>
        <div className="title">
          {strings.introductionLine2}
        </div>
      </div>
      <div className="languages">
        <div className={"lang" + (language === "fi" ? " selected": "")} onClick={() => chooseLanguage("fi")}>
          {languageOptions.fi}
        </div>
        <div className={"lang" + (language === "en" ? " selected": "")} onClick={() => chooseLanguage("en")}>
          {languageOptions.en}
        </div>
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(translate(Header));
