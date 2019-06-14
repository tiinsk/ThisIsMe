import React from 'react';

const HoverBubble = ({text}) => {
  return(
    <div className="hover-bubble">
      {text}
      <div className="arrow"/>
    </div>
  )
};

export default HoverBubble;
