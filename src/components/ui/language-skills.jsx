import React from 'react';
import styled from 'styled-components/macro';

import {H2, H3, Paragraph} from '../../theme/fonts';

const StyledLangSkills = styled.div`
  ${H3} {
    @media (max-width: ${({theme}) => theme.breakpoints.xsSize}){
      margin-top: ${({theme}) => theme.spaces.base(2)};
    }
  }
  
  .lang-skills {
    display: flex;

    .language {
      width: 33%;
      padding-right: ${({theme}) => theme.spaces.base(0.5)};
      
      ${Paragraph} {
        text-align: left;
        color: ${({theme}) => theme.UI.colors.black};
      }

      .lang-title {
        display: flex;
        align-items: flex-end;

        margin-bottom: ${({theme}) => theme.spaces.base(0.5)};

        .lang-name {
          font-size: ${({theme}) => theme.fontSizes.fontSizeXXXLarge};
          margin-right: ${({theme}) => theme.spaces.base(0.5)};
          margin-bottom: 0;
        }
        .lang-level {
          padding-bottom: 6px;

          font-family: ${({theme}) => theme.fonts.fontLato};
          font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
          font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
          color: #B0B0B0;
        }
      }
    }
  }

  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    .lang-skills {
      flex-wrap: wrap;
      .language {
        width: 100%;
        margin-top: ${({theme}) => theme.spaces.baseSize}/2;
      }
    }
  }
`;


const LanguageSkills = ({title, languageSkills}) => {
  return (
    <StyledLangSkills>
      <H3>{title}</H3>
      <div className="lang-skills">
        {
          languageSkills.map((language) => {
            return (
              <div className="language" key={language.title}>
                <div className="lang-title">
                  <H2 className="lang-name">
                    {language.title}
                  </H2>
                  <div className="lang-level">
                    {language.level}
                  </div>
                </div>
                <Paragraph>
                  {language.body}
                </Paragraph>
              </div>
            )
          })
        }
      </div>
    </StyledLangSkills>
  );
}

export default LanguageSkills;
