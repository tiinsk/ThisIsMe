import styled, {css} from 'styled-components';

export const H1 = css`
  color: ${({theme}) => theme.new.colors.berry};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXXXLarge};
  letter-spacing: 4.7px;
  text-transform: uppercase;
`;

export const H2 = styled.span`
  color: ${({theme}) => theme.new.colors.berry};
  font-family: ${({theme}) => theme.fonts.fontQuicksand};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightMedium};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
  text-transform: capitalize;
  margin: ${({theme}) => theme.spaces.base(0.5)} 0;
`;

export const H3 = styled.p`
  color: ${({theme}) => theme.new.colors.black};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXXLarge};
  text-transform: uppercase;
   margin: ${({theme}) => theme.spaces.base(0.5)} 0;
`;

export const H4 = styled.p`
  color: ${({theme}) => theme.new.colors.black};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
  margin: ${({theme}) => theme.spaces.base(0.5)} 0;
`;

export const Paragraph = styled.p`
  color: ${({theme}) => theme.new.colors.black};
  font-family: ${({theme}) => theme.fonts.fontOpenSans};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
  font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
  line-height: 2.5rem;
`;

export const ButtonText = css`
  color: ${({theme}) => theme.new.colors.green};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightBold};
  font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
  text-transform: uppercase;
`;

export const TagText = css`
  color: ${({theme}) => theme.new.colors.green};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXSmall};
  text-transform: uppercase;
`;

export const Anchor = css`
  color: ${({theme}) => theme.new.colors.black};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
  font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
  text-transform: uppercase;
  text-decoration: none;
`;
