import React from 'react';

import translate from '../../main/translate';


const EduItem = ({strings, data}) => {
  let translations = strings.education.educationList[data.key];
  return(
      <div className="edu-item">
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
      </div>
  )
};

export default translate(EduItem);
