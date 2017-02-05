import React from 'react';
import { connect } from 'react-redux';
import {getTranslations} from './i18n/languages';

const translate = (Component) => connect(mapStateToProps, null)(
  class extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
      return (
        <Component {...this.props} strings={getTranslations(this.props.language)}/>
      )
    };
});

function mapStateToProps({language}) {
  return {
    language: language.language
  }
}

export default translate;

