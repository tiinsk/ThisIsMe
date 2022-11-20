import React from 'react';
import {translations} from '../../i18n/languages';

export const addAllTranslations = (Component) => class extends React.Component {
    render() {
      return (
        <Component {...this.props} allStrings={translations}/>
      )
    };
};

