import React from 'react';

const TimeLine = ({children}) => {

  return(
    <div className="time-line">
      <div className="line"></div>
      <div className="start-dot line-dot"></div>
      <div className="end-dot line-dot"></div>
      <div className="flex-and-wrap">
        {children}
      </div>
    </div>
  )
};

export default TimeLine;
