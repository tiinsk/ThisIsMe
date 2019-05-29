import React from 'react';

const TimeLine = ({children}) => {

  return(
    <div className="time-line">
      <div className="line"/>
      <div className="end-dot line-dot"/>
      {children}
    </div>
  )
};

export default TimeLine;
