import React from 'react';

import EduItem from './edu-item';

const Education = ({strings, data}) => {
  return (
    <div>
      {
        data.education.educationList.map((school, i) => {
          return (
            <EduItem
              key={i}
              strings={strings}
              data={school}
            />
          );
        })
      }
    </div>
  )
};

export default Education;
