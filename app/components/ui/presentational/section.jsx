import React from 'react';
import translate from '../../../components/main/translate';
import _ from 'lodash';

const Section = ({strings, children, titleId, maxWidth}) => {
  return(
    <div className="section">
      <div className="title">
        {_.get(strings, titleId)}
      </div>
      <div className="section-body" style={{maxWidth}}>
        {children}
      </div>
    </div>
  )
};

export default translate(Section);
