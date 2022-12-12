import React from 'react';
import styled, { useTheme } from 'styled-components';

import { Github } from './github';
import { Linkedin } from './linkedin';
import { Phone } from './phone';
import { Email } from './email';
import { Public } from './public';
import { Palette } from './palette';
import { ChevronRight } from './chevron-right';
import { ArrowForward } from './arrow-forward';
import { ArrowBack } from './arrow-back';
import { Menu } from './menu';
import { Clear } from './clear';

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
    case 'arrow-forward':
      return <ArrowForward size={size} color={color} />;
    case 'arrow-back':
      return <ArrowBack size={size} color={color} />;
    case 'menu':
      return <Menu size={size} color={color} />;
    case 'clear':
      return <Clear size={size} color={color} />;
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
