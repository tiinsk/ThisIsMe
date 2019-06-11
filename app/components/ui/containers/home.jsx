import React from 'react';
import { connect } from 'react-redux';

import {
  Link
} from 'react-router-dom'

import cv_en_pdf from '../../../../assets/cv_en.pdf';
import cv_fi_pdf from '../../../../assets/cv_fi.pdf';

import translate from '../../main/translate';
import LanguageSelectorSmall from "./language_selector_small";

class Home extends React.Component {

  render() {
    return (
      <div className="home">
        <LanguageSelectorSmall/>
        <div className="ui-header">
          <Link className="choose-btn ui-btn" to="/ui" >
            {this.props.strings.useUI}
          </Link>
        </div>
        <div className="console-header">
          <div className="cursor">
            <i className="fa fa-angle-right"/>
            <span style={{marginLeft: "0.5rem"}} className="blinking-underline">_</span>
          </div>
          <Link className="choose-btn console-btn" to="/console" >
            {this.props.strings.useConsole}
          </Link>
        </div>
        <div className="title">{this.props.strings.chooseSide}</div>
        <a className="cv-link" target="_blank" href={this.props.language == "fi" ? cv_fi_pdf : cv_en_pdf}>{this.props.strings.downloadPDF}</a>
      </div>
    );
  }
}

function mapStateToProps({language}) {
  return {
    language: language.language
  }
}

export default  connect(mapStateToProps, null)(translate(Home));
