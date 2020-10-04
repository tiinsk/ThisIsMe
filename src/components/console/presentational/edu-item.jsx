import React from 'react';
import styled from 'styled-components/macro';

import DashedLine from './dashed-line';

const StyledConsoleEduItem = styled.div`
  margin: 0.5rem 0;
  
  .dates{
    margin: 0.5rem 0;
  }
  .edu-title{
    color: ${({theme}) => theme.console.colors.magenta};
  }
  .school{
    color: white;
  }
  .edu-description{
    margin: 1rem 0;
    color: ${({theme}) => theme.console.colors.grey};
  }
`;

const EduItem = ({strings, data}) => {
  let translations = strings.education.educationList[data.key];
  return(
    <StyledConsoleEduItem>
      <DashedLine/>
      <div className="dates">
        <span>{`${data.from.month}/${data.from.year}`} - </span>{data.to ? <span>{`${data.to.month}/${data.to.year}`}</span> : null }
      </div>
      <div>
        <span className="school">{translations.school}</span> - <span className="edu-title">{`${translations.title}${translations.program ? ' - ': ''}`}</span> { translations.program ?
          <span className="program">{translations.program}</span> : null
        }
      </div>

      { translations.major || translations.minor || translations.thesis ?
        <div className="edu-description">
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
    </StyledConsoleEduItem>
  )
};

export default EduItem;
