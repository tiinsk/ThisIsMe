import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import translate from '../../main/translate';
import {languageOptions} from '../../../i18n/languages';
import {chooseLanguage} from '../../../actions/language_actions';

const LanguageSelector = ({chooseLanguage, language}) => {
  return(
    <div className="language-selector">
      <div className={"lang" + (language === "fi" ? " selected": "")} onClick={() => chooseLanguage("fi")}>
        {languageOptions.fi}
      </div>
      <div className={"lang" + (language === "en" ? " selected": "")} onClick={() => chooseLanguage("en")}>
        {languageOptions.en}
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
export default connect(mapStateToProps, mapDispatchToProps)(translate(LanguageSelector));
