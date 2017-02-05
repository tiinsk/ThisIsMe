import React from 'react';
import translate from '../../translate.jsx';
import _ from 'lodash';

const SectionTitle = ({strings, titleId, color, lineColor}) => {
  return(
    <div className="section-title" style={{color: color}}>
      <div className="text">
        {_.get(strings, titleId)}
      </div>
      <div className="line" style={{backgroundColor: lineColor}}></div>
    </div>
  )
};

export default translate(SectionTitle);
