import React from 'react';

import education from '../../../data/education';
import EduItem from './edu-item';

const Education = ({strings}) => {
  return (
    <div>
      {
        education.educationList.map((school, i) => {
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
