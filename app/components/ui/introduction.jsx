import React from 'react';
import { connect } from 'react-redux';
import translate from '../../components/main/translate';

import cv_en_pdf from '../../../assets/cv_en.pdf';
import cv_fi_pdf from '../../../assets/cv_fi.pdf';

const Introduction = ({strings, language}) => {
  return(
      <div className="introduction">
        <div className="image-wrapper">
          <div className="own-image"/>
        </div>
        <div className="summary">
          <div className="summary-title">{strings.summary.title}</div>
          <div className="summary-text" dangerouslySetInnerHTML={{__html: strings.introduction}}/>
          <a
            className="summary-btn"
            target="_blank"
            href={language === "fi" ? cv_fi_pdf : cv_en_pdf}
          >
            {strings.summary.printBtn}
          </a>
        </div>
      </div>
  )
};


function mapStateToProps({language}) {
  return {
    language: language.language
  }
}

export default  connect(mapStateToProps, null)(translate(Introduction));

