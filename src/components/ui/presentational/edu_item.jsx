import React from 'react';
import styled from 'styled-components/macro';

import translate from '../../main/translate';


const StyledEduItem = styled.div`
  .edu-title{
    color: ${({theme}) => theme.colors.black};
    font-family: ${({theme}) => theme.fonts.fontLato};
    font-size: ${({theme}) => theme.fontSizes.fontSizeLarge};

    margin-top: ${({theme}) => theme.spaces.baseSize}/2;
  }
  .program{
    margin-top: 0;
    margin-bottom: ${({theme}) => theme.spaces.baseSize}/2;
  }
  .school{
    color: ${({theme}) => theme.colors.black};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
    text-transform: uppercase;
    font-size: ${({theme}) => theme.fontSizes.fontSizeXLarge};
    font-family: ${({theme}) => theme.fonts.fontLato};

    margin: ${({theme}) => theme.spaces.baseSize}/2 0 ${({theme}) => theme.spaces.baseSize}/2 0;
  }
  .description{
    color: ${({theme}) => theme.colors.black};
    font-family: ${({theme}) => theme.fonts.fontOpenSans};
    font-weight: ${({theme}) => theme.fontWeights.fontWeightLight};
    font-size: ${({theme}) => theme.fontSizes.fontSizeDefault};
    line-height: 2.5rem;
  }
`;

const EduItem = ({strings, data}) => {
  let translations = strings.education.educationList[data.key];
  return(
      <StyledEduItem>
        <div className="school">{translations.school}</div>
        <div className="edu-title">{`${translations.title}${translations.program ? ",": ""}`}</div>
        {
          translations.program ?
            <div className="edu-title program">{translations.program}</div> : null
        }
        { translations.major || translations.minor || translations.thesis ?
          <div className="description">
            {
              translations.major ?
                <div>{strings.education.major}: {translations.major}</div> : null
            }
            {
              translations.minor ?
                <div>{strings.education.minor}: {translations.minor}</div> : null
            }
            {
              translations.thesis ?
                <div>{strings.education.thesis}: {translations.thesis}</div> : null
            }
          </div> : null
        }
      </StyledEduItem>
  )
};

export default translate(EduItem);
