import React from 'react';

const Introduction = ({strings}) => {
  return(
    <div className="console-introduction" dangerouslySetInnerHTML={{__html: strings.introduction}}>
    </div>
  )
};

export default Introduction;
