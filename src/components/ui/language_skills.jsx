import React from 'react';
import styled from 'styled-components/macro';

import translate from '../main/translate';
import {H2, H3, Paragraph} from '../../theme/fonts';

const StyledLangSkills = styled.div`
  .lang-skills {
    display: flex;

    .language {
      width: 33%;
      padding-right: ${({theme}) => theme.spaces.base(0.5)};
      
      ${Paragraph} {
        text-align: left;
        color: ${({theme}) => theme.new.colors.black};
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


const LanguageSkills = ({strings}) => {
  return (
    <StyledLangSkills>
      <H3>{strings.skills.langSkills}</H3>
      <div className="lang-skills">
        {
          strings.skills.languages.map((language) => {
            return (
              <div className="language" key={language.language}>
                <div className="lang-title">
                  <H2 className="lang-name">
                    {language.language}
                  </H2>
                  <div className="lang-level">
                    {language.level}
                  </div>
                </div>
                <Paragraph>
                  {language.text}
                </Paragraph>
              </div>
            )
          })
        }
      </div>
    </StyledLangSkills>
  );
}

export default translate(LanguageSkills);
