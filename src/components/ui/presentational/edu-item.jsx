import React from 'react';
import styled from 'styled-components/macro';

import {H3, H4, Paragraph} from '../../../theme/fonts';
import translate from '../../main/translate';

const StyledEduItem = styled.div`
  .degree {
    margin-bottom: 0;
  }
  .program {
    margin-top: 0;
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
        <Paragraph>
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
        </Paragraph> : null
      }
    </StyledEduItem>
  )
};

export default translate(EduItem);
