import React from 'react';

// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
export const ArrowForward = ({ size, color }) => {
  return (
    <svg
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill={color}/>
    </svg>
  );
};
