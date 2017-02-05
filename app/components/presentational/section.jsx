import React from 'react';
import translate from '../../translate.jsx';
import _ from 'lodash';

const Section = ({strings, children, titleId, backgroundColor, titleBackgroundColor}) => {
  return(
    <div className="section" style={{backgroundColor: backgroundColor}}>
      <div className="title" style={{backgroundColor: titleBackgroundColor}}>{_.get(strings, titleId)}</div>
      <div className="section-body">
        {children}
      </div>
    </div>
  )
};

export default translate(Section);
