import React from 'react';

import translate from '../../../components/main/translate';
import styled from 'styled-components';

const StyledIconButton = styled.a`
  height: 30px;
  width: 30px;
  padding: 0 3*${({theme}) => theme.spaces.baseSize}/4;

  border: 2px solid ${({theme}) => theme.colors.blueNEW};
  border-radius: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
  color: ${({theme}) => theme.colors.blueNEW};
  text-decoration: none;

  cursor: pointer;

  &:hover {
    background: ${({theme}) => theme.colors.blueHoverBtn};
  }

  .material-icons {
    font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
  }
`;

const IconButton = ({strings, icon, link, type = 'material-icons'}) => {
  let iconComponent;

  if(type === 'material-icons') {
    iconComponent = <i className="material-icons">{icon}</i>;
  }
  else if(type === 'fa-icons') {
    iconComponent = <i className={`fa fa-${icon}`}/>;
  }

  return(
    <StyledIconButton href={link} target="_blank" className="icon-button">
      {iconComponent}
    </StyledIconButton>
  )
};

export default translate(IconButton);
