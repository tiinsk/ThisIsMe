import React from 'react';
import EduItem from './edu_item';

import education from '../../../data/education';

const Education = ({strings}) => {
  return(
    <div className="console-education">
      {
        education.educationList.map((school, i) => {
          return(
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
