import React from 'react';
import moment from 'moment';

import translate from '../../translate.jsx';


const EduItem = ({strings, data}) => {
  let translations = strings.education.educationList[data.key];

  return(
      <div className="edu-item">
        <div className="school">{translations.school}</div>
        <div className="edu-title">{`${translations.title}${translations.program ? ",": ""}`}</div>
        {
          translations.program ?
            <div className="program">{translations.program}</div> : null
        }
        { translations.major || translations.minor || translations.thesis ?
          <ul>
            {
              translations.major ?
                <li>{strings.education.major}: {translations.major}</li> : null
            }
            {
              translations.minor ?
                <li>{strings.education.minor}: {translations.minor}</li> : null
            }
            {
              translations.thesis ?
                <li>{strings.education.thesis}: {translations.thesis}</li> : null
            }
          </ul> : null
        }
      </div>
  )
};

export default translate(EduItem);
