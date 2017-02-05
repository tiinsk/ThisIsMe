import React from 'react';
import translate from '../../translate.jsx';
import _ from 'lodash';

const Synopsis = ({strings, majorId, minorId, grade}) => {

  return(
    <div className="synopsis">
      <div className="line">{`${strings.education.major}: ${_.get(strings, majorId)}`}</div>
      <div className="line">{`${strings.education.minor}: ${_.get(strings, minorId)}`}</div>
      <div className="line">{`${strings.grade}: ${grade}`}</div>
    </div>
  )
};

export default translate(Synopsis);
