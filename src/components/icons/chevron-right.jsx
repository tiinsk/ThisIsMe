import React from 'react';

// Icon copied from Material Icons: https://fonts.google.com/icons?icon.set=Material+Icons
export const ChevronRight = ({ size, color }) => {
  return (
    <svg
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
        fill={color}
      />
    </svg>
  );
};