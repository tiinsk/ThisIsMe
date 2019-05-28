import React from 'react';

const TimeLine = ({children}) => {

  return(
    <div className="time-line">
      <div className="line"></div>
      <div className="end-dot line-dot"></div>
      {children}
    </div>
  )
};

export default TimeLine;
