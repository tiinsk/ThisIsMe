import React from 'react';
import translate from '../../translate.jsx';
import _ from 'lodash';

const ThesisItem = ({strings, data, titleId}) => {

  return(
    <div className="thesis-item">
      <div className="title">
        {_.get(strings, titleId)}
        <div className="grade">
          {`${strings.grade}: ${data.grade}`}
        </div>
        { data.link ?
          <a href={data.link} target="_blank">
            {strings.link}
          </a> : null
        }
      </div>
      <div className="description">
        <div className="year">
          {data.year}
        </div>
        <div className="credits">
          {`${data.op} ${strings.op}`}
        </div>
      </div>
    </div>
  )
};

export default translate(ThesisItem);
