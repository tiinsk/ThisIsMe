import React from 'react';

const Row = ({children, justifyContent = "center"}) => {


  return(
    <div className="row" style={{justifyContent}}>
      {children}
    </div>
  )
};

export default Row;
