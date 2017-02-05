import React from 'react';
import translate from '../translate.jsx';

const Introduction = ({strings}) => {
  return(
    <div className="introduction">
      <div className="description">
        <p>{strings.introduction}</p>
        <p>{strings.introduction2}</p>
        <p>{strings.introduction3}</p>
      </div>
      <div className="image-wrapper">
        <div className="own-image"></div>
      </div>
    </div>
  )
};

export default translate(Introduction);
