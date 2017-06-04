import React from 'react';
import DashedLine from './dashed_line';

const EduItem = ({strings, data}) => {
  let translations = strings.education.educationList[data.key];
  return(
    <div className="console-edu-item">
      <DashedLine/>
      <div className="dates">
        <span>{`${data.from.month}/${data.from.year}`} - </span>{data.to ? <span>{`${data.to.month}/${data.to.year}`}</span> : null }
      </div>
      <div>
        <span className="school">{translations.school}</span> - <span className="edu-title">{`${translations.title}${translations.program ? " - ": ""}`}</span> { translations.program ?
          <span className="program">{translations.program}</span> : null
        }
      </div>

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
    </div>
  )
};

export default EduItem;
