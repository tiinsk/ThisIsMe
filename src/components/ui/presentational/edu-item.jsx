import React from 'react';
import styled from 'styled-components/macro';

import {H3, H4, Paragraph} from '../../../theme/fonts';
import translate from '../../main/translate';

const StyledEduItem = styled.div`
  .degree {
    margin-top: ${({theme}) => theme.spaces.base(0.5)};
    margin-bottom: 0;
  }
  .program {
    margin-top: 0;
    margin-bottom: ${({theme}) => theme.spaces.base(0.5)};
  }
  p {
    margin-top: ${({theme}) => theme.spaces.base(0.25)};
    margin-bottom: 0;
  }
`;

const EduItem = ({strings, data}) => {
  let translations = strings.education.educationList[data.key];
  return (
    <StyledEduItem>
      <H3>{translations.school}</H3>
      <H4 className="degree">{`${translations.title}${translations.program ? ',' : ''}`}</H4>
      {
        translations.program ?
          <H4 className="program">{translations.program}</H4> : null
      }
      {translations.major || translations.minor || translations.thesis ?
        <>
          {
            translations.major ?
              <Paragraph>{strings.education.major}: {translations.major}</Paragraph> : null
          }
          {
            translations.minor ?
              <Paragraph>{strings.education.minor}: {translations.minor}</Paragraph> : null
          }
          {
            translations.thesis ?
              <Paragraph>{strings.education.thesis}: {translations.thesis}</Paragraph> : null
          }
        </> : null
      }
    </StyledEduItem>
  )
};

export default translate(EduItem);
