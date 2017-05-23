import React from 'react';
import translate from '../../../translate';
import _ from 'lodash';

const Section = ({strings, children, titleId}) => {
  return(
    <div className="section">
      <div className="title">{_.get(strings, titleId)}</div>
      <div className="section-body">
        {children}
      </div>
    </div>
  )
};

export default translate(Section);
