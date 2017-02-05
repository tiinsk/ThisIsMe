import React from 'react';

const Column = ({children, parts, ofParts, style}) => {

  const colStyle = {
      ...style,
    flexShrink: "1",
    flexGrow: "0",
    flexBasis: `${(parts/ofParts)*100}%`
  };

  return(
    <div className="column" style={colStyle}>
      {children}
    </div>
  )
};

export default Column;
