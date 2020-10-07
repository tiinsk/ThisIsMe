import styled, {css} from 'styled-components';

export const PageTitle = css`
  color: ${({theme}) => theme.UI.colors.white};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXXXLarge};
  margin: ${({theme}) => theme.spaces.base(0.25)} 7rem;
  
  @media (max-width: ${({theme}) => theme.breakpoints.mdSize}){
    margin-left: 0;
    margin-right: 0;
  }
  
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
  }
`;

export const PageName = css`
  color: ${({theme}) => theme.UI.colors.white};
  font-family: ${({theme}) => theme.fonts.fontPTSerif};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightBold};
  font-size: 9.2rem;
  text-align: center;
  
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    font-size: ${({theme}) => theme.fontSizes.fontSizeXXXLarge};
    text-align: left;
  }
`;

export  const PageSubtitle = css`
  color: ${({theme}) => theme.UI.colors.green};
  font-family: ${({theme}) => theme.fonts.fontOpenSans};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
  font-size: ${({theme}) => theme.fontSizes.fontSizeSmall};
  text-transform: uppercase;
  letter-spacing: 1.9px;
  text-align: center;
  margin: ${({theme}) => theme.spaces.base(0.5)} auto;
  max-width: 500px;
  
  @media (max-width: ${({theme}) => theme.breakpoints.mdSize}){
    text-align: left;
    margin-left: ${({theme}) => theme.spaces.base(0.25)};
    margin-right: ${({theme}) => theme.spaces.base(0.25)};
  }
  
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    font-size: ${({theme}) => theme.fontSizes.fontSizeXSmall};
  }
`;

export const H1 = css`
  color: ${({theme}) => theme.UI.colors.berry};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXXXLarge};
  letter-spacing: 4.7px;
  text-transform: uppercase;
`;

export const H2 = styled.span`
  color: ${({theme}) => theme.UI.colors.berry};
  font-family: ${({theme}) => theme.fonts.fontQuicksand};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightMedium};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
  text-transform: capitalize;
  margin: ${({theme}) => theme.spaces.base(0.5)} 0;
`;

export const H3 = styled.p`
  color: ${({theme}) => theme.UI.colors.black};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXXLarge};
  text-transform: uppercase;
   margin: ${({theme}) => theme.spaces.base(0.5)} 0;
`;

export const H4 = styled.p`
  color: ${({theme}) => theme.UI.colors.black};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
  margin: ${({theme}) => theme.spaces.base(0.5)} 0;
`;

export const Paragraph = styled.p`
  color: ${({theme}) => theme.UI.colors.darkGrey};
  font-family: ${({theme}) => theme.fonts.fontOpenSans};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
  font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
  line-height: 2.5rem;
  margin: ${({theme}) => theme.spaces.base(0.5)} 0 ${({theme}) => theme.spaces.base(1)} 0;
`;

export const ButtonText = css`
  color: ${({theme}) => theme.UI.colors.green};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightBold};
  font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
  text-transform: uppercase;
`;

export const TagText = css`
  color: ${({theme}) => theme.UI.colors.green};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightRegular};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXSmall};
  text-transform: uppercase;
`;

export const Anchor = css`
  color: ${({theme}) => theme.UI.colors.black};
  font-family: ${({theme}) => theme.fonts.fontLato};
  font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
  font-size: ${({theme}) => theme.fontSizes.fontSizeXSmall};
  text-transform: uppercase;
  text-decoration: none;
  
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    font-size: ${({theme}) => theme.fontSizes.fontSizeXXSmall};
  }
`;
