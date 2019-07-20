import React from 'react';
import { connect } from 'react-redux';
import {getTranslations, translations} from '../../i18n/languages';

const translate = (Component) => connect(mapStateToProps, null)(
  class extends React.Component {
    render() {
      return (
        <Component {...this.props} strings={getTranslations(this.props.language)}/>
      )
    };
});

export const addAllTranslations = (Component) => class extends React.Component {
    render() {
      return (
        <Component {...this.props} allStrings={translations}/>
      )
    };
};

function mapStateToProps({language}) {
  return {
    language: language.language
  }
}

export default translate;

