import React from 'react';
import translate from '../../components/main/translate';

const Introduction = ({strings}) => {
  return(
      <div className="introduction">
        <div className="image-wrapper">
          <div className="own-image"/>
        </div>
        <div className="summary">
          <div className="summary-title">{strings.summary.title}</div>
          <div className="summary-text">{strings.summary.text}</div>
          <button className="summary-btn">{strings.summary.printBtn}</button>
        </div>
      </div>
  )
};

export default translate(Introduction);
