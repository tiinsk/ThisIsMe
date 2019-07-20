import styled from 'styled-components';
import {ButtonText} from '../../../theme/fonts';

export const LinkButton = styled.a`
  ${ButtonText};
  background: ${({theme}) => theme.UI.colors.lightestGrey};
  text-decoration: none;

  border: none;
  padding: ${({theme}) => theme.spaces.base(0.5)} ${({theme}) => theme.spaces.baseSize};

  user-select: none;
  cursor: pointer;
  
  display: inline-flex;
  align-items: center;
  
  .material-icons {
    font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};
    margin-right: ${({theme}) => theme.spaces.base(0.5)};
  }
  
  &:hover {
    background: ${({theme}) => theme.UI.colors.lightestGreyAlt};
  }
`;
