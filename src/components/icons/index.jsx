import React from 'react';
import styled, { useTheme } from 'styled-components';

import { Github } from './github';
import { Linkedin } from './linkedin';
import { Phone } from './phone';
import { Email } from './email';
import { Public } from './public';
import { Palette } from './palette';
import { ChevronRight } from './chevron-right';

const getIcon = (type, size, color) => {
  switch (type) {
    case 'github':
      return <Github size={size} color={color} />;
    case 'linkedin':
      return <Linkedin size={size} color={color} />;
    case 'phone':
      return <Phone size={size} color={color} />;
    case 'email':
      return <Email size={size} color={color} />;
    case 'public':
      return <Public size={size} color={color} />;
    case 'palette':
      return <Palette size={size} color={color} />;
    case 'chevron-right':
      return <ChevronRight size={size} color={color} />;
    default:
      return undefined;
  }
};

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = ({
  type,
  size = '1.7rem',
  subTheme = 'UI',
  color = 'black',
  ...props
}) => {
  const theme = useTheme();
  const icon = getIcon(type, size, theme[subTheme].colors[color], props);
  return <StyledIcon {...props}>{icon}</StyledIcon>;
};
